import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
const server = http.createServer();
const wss = new WebSocketServer({ server });
const clients = new Map();

wss.on("connection", (ws) => {
  ws.once("message", (data) => {
    let msg;
    try {
      msg = JSON.parse(data.toString());
    } catch {
      return ws.close(1003, "invalid JSON");
    }
    if (msg.type === "register" && typeof msg.userId === "number") {
      clients.set(msg.userId, ws);
      ws.send(JSON.stringify({ type: "registered", userId: msg.userId }));
    } else {
      return ws.close(1003, "first message must be register");
    }
  });

  ws.on("close", () => {
    // Clean up any entries pointing to this socket
    for (const [uid, sock] of clients.entries()) {
      if (sock === ws) {
        clients.delete(uid);
        break;
      }
    }
  });
});

async function startServer() {
  const pubClient = createClient({
    url: "redis://localhost:6379",
  });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();

  await subClient.subscribe("problem_done", (message) => {
    console.log("Received message from pubsub", message);
    let result;
    try {
      result = JSON.parse(message);
    } catch {
      return console.error("Invalid JSON in pubsub payload:", message);
    }

    if (!result.userId) {
      console.error("Missing userId in message:", result);
      return;
    }

    const ws = clients.get(result.userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Sending message to client", result);
      ws.send(
        JSON.stringify({
          type: "problem_done",
          productId: result.productId,
          status: result.status,
          productName: result.productName,
        })
      );
    } else {
      console.log("Client not found or not open for userId:", result.userId);
    }
  });

  server.listen(8080, () => {
    console.log("WS server listening on ws://localhost:8080");
  });
}

startServer().catch(console.error);
