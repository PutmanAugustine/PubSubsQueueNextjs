"use client";

import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { Product } from "@/lib/types";

const products: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1499.99 },
  { id: 2, name: "Wireless Mouse", price: 29.5 },
  { id: 3, name: "Mechanical Keyboard", price: 115.0 },
  { id: 4, name: "4K Monitor", price: 349.95 },
  { id: 5, name: "Webcam HD", price: 55.0 },
];

const Page = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isPending, startTransition] = useTransition();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Connected to the server");
      newSocket.send(JSON.stringify({ type: "register", userId: 42 }));
    };

    newSocket.onmessage = (event) => {
      const result = JSON.parse(event.data);
      console.log("Result", result);

      if (result.type === "registered") {
        alert("Registered to the server");
      }

      if (result.type === "problem_done") {
        console.log("Problem done", result);
        setNotifications(
          (prevNotifications) =>
            [
              ...prevNotifications,
              {
                id: result.productId,
                message: `${result.productName} is ${result.status}`,
              },
            ] as any
        ); // Cast to any to bypass the type error for now
      }
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleScreenAllClick = async (productsToScreen: Product[]) => {
    startTransition(async () => {
      console.log("Screening all products:", productsToScreen);
      const response = await axios.post("/api/screen-all", {
        products: productsToScreen,
      });
      console.log(response.data);
    });
  };

  if (!socket) {
    return (
      <div>
        <h1>Connecting to server...</h1>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Product List</h1>
      {notifications.map((notification) => (
        <div key={notification.id}>{notification.message}</div>
      ))}
      <button
        onClick={() => handleScreenAllClick(products)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
        disabled={isPending || !socket}
      >
        {isPending ? "Screening..." : "Screen All"}
      </button>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              border: "1px solid #eee",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
          >
            <div>
              <strong>ID:</strong> {product.id}
            </div>
            <div>
              <strong>Name:</strong> {product.name}
            </div>
            <div>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
