import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function startServer() {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");

    app.post("/api/v1/submit", async (req, res) => {
      const { problemId, userId, code, language } = req.body;

      console.log("Received submission:", req.body);

      try {
        await redisClient.lPush(
          "submissions",
          JSON.stringify({ problemId, userId, code, language })
        );
        res.json({ message: "Submission received" });
      } catch (error) {
        console.error("Error pushing to Redis:", error);
        res.status(500).json({ message: "Error pushing to Redis" });
      }
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1); // Exit the process if Redis connection fails
  }
}

startServer();
