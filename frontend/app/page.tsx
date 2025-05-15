"use client";

import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { Product } from "@/lib/types";

const products: Product[] = [
{ "id": 0, "name": "Product #0", "price": 809.01},
{ "id": 1, "name": "Product #1", "price": 75.18},
{ "id": 2, "name": "Product #2", "price": 781.78},
{ "id": 3, "name": "Product #3", "price": 862.90},
{ "id": 4, "name": "Product #4", "price": 67.34},
{ "id": 5, "name": "Product #5", "price": 233.14},
{ "id": 6, "name": "Product #6", "price": 364.25},
{ "id": 7, "name": "Product #7", "price": 975.57},
{ "id": 8, "name": "Product #8", "price": 472.87},
{ "id": 9, "name": "Product #9", "price": 856.12},
{ "id": 10, "name": "Product #10", "price": 366.78},
{ "id": 11, "name": "Product #11", "price": 887.18},
{ "id": 12, "name": "Product #12", "price": 766.36},
{ "id": 13, "name": "Product #13", "price": 321.46},
{ "id": 14, "name": "Product #14", "price": 723.96},
{ "id": 15, "name": "Product #15", "price": 377.63},
{ "id": 16, "name": "Product #16", "price": 269.33},
{ "id": 17, "name": "Product #17", "price": 238.77},
{ "id": 18, "name": "Product #18", "price": 30.61},
{ "id": 19, "name": "Product #19", "price": 249.05},
{ "id": 20, "name": "Product #20", "price": 777.05},
{ "id": 21, "name": "Product #21", "price": 21.92},
{ "id": 22, "name": "Product #22", "price": 539.28},
{ "id": 23, "name": "Product #23", "price": 55.09},
{ "id": 24, "name": "Product #24", "price": 606.54},
{ "id": 25, "name": "Product #25", "price": 298.82},
{ "id": 26, "name": "Product #26", "price": 716.20},
{ "id": 27, "name": "Product #27", "price": 870.24},
{ "id": 28, "name": "Product #28", "price": 555.58},
{ "id": 29, "name": "Product #29", "price": 601.31},
{ "id": 30, "name": "Product #30", "price": 166.17},
{ "id": 31, "name": "Product #31", "price": 915.91},
{ "id": 32, "name": "Product #32", "price": 802.95},
{ "id": 33, "name": "Product #33", "price": 635.42},
{ "id": 34, "name": "Product #34", "price": 736.68},
{ "id": 35, "name": "Product #35", "price": 691.71},
{ "id": 36, "name": "Product #36", "price": 364.18},
{ "id": 37, "name": "Product #37", "price": 667.18},
{ "id": 38, "name": "Product #38", "price": 627.28},
{ "id": 39, "name": "Product #39", "price": 33.70},
{ "id": 40, "name": "Product #40", "price": 443.61},
{ "id": 41, "name": "Product #41", "price": 420.44},
{ "id": 42, "name": "Product #42", "price": 275.50},
{ "id": 43, "name": "Product #43", "price": 476.25},
{ "id": 44, "name": "Product #44", "price": 633.12},
{ "id": 45, "name": "Product #45", "price": 716.90},
{ "id": 46, "name": "Product #46", "price": 796.65},
{ "id": 47, "name": "Product #47", "price": 248.20},
{ "id": 48, "name": "Product #48", "price": 921.02},
{ "id": 49, "name": "Product #49", "price": 685.96},
{ "id": 50, "name": "Product #50", "price": 240.39},
{ "id": 51, "name": "Product #51", "price": 498.57},
{ "id": 52, "name": "Product #52", "price": 954.03},
{ "id": 53, "name": "Product #53", "price": 762.01},
{ "id": 54, "name": "Product #54", "price": 698.44},
{ "id": 55, "name": "Product #55", "price": 353.46},
{ "id": 56, "name": "Product #56", "price": 879.83},
{ "id": 57, "name": "Product #57", "price": 706.45},
{ "id": 58, "name": "Product #58", "price": 37.08},
{ "id": 59, "name": "Product #59", "price": 910.75},
{ "id": 60, "name": "Product #60", "price": 185.15},
{ "id": 61, "name": "Product #61", "price": 843.89},
{ "id": 62, "name": "Product #62", "price": 284.41},
{ "id": 63, "name": "Product #63", "price": 876.18},
{ "id": 64, "name": "Product #64", "price": 819.42},
{ "id": 65, "name": "Product #65", "price": 815.12},
{ "id": 66, "name": "Product #66", "price": 252.53},
{ "id": 67, "name": "Product #67", "price": 778.01},
{ "id": 68, "name": "Product #68", "price": 919.63},
{ "id": 69, "name": "Product #69", "price": 625.08},
{ "id": 70, "name": "Product #70", "price": 485.60},
{ "id": 71, "name": "Product #71", "price": 766.04},
{ "id": 72, "name": "Product #72", "price": 75.07},
{ "id": 73, "name": "Product #73", "price": 835.14},
{ "id": 74, "name": "Product #74", "price": 132.22},
{ "id": 75, "name": "Product #75", "price": 535.38},
{ "id": 76, "name": "Product #76", "price": 144.89},
{ "id": 77, "name": "Product #77", "price": 870.36},
{ "id": 78, "name": "Product #78", "price": 957.39},
{ "id": 79, "name": "Product #79", "price": 390.55},
{ "id": 80, "name": "Product #80", "price": 444.10},
{ "id": 81, "name": "Product #81", "price": 920.22},
{ "id": 82, "name": "Product #82", "price": 844.37},
{ "id": 83, "name": "Product #83", "price": 253.07},
{ "id": 84, "name": "Product #84", "price": 96.93},
{ "id": 85, "name": "Product #85", "price": 902.02},
{ "id": 86, "name": "Product #86", "price": 766.56},
{ "id": 87, "name": "Product #87", "price": 151.31},
{ "id": 88, "name": "Product #88", "price": 305.73},
{ "id": 89, "name": "Product #89", "price": 96.50},
{ "id": 90, "name": "Product #90", "price": 131.63},
{ "id": 91, "name": "Product #91", "price": 27.59},
{ "id": 92, "name": "Product #92", "price": 165.84},
{ "id": 93, "name": "Product #93", "price": 251.07},
{ "id": 94, "name": "Product #94", "price": 238.16},
{ "id": 95, "name": "Product #95", "price": 496.93},
{ "id": 96, "name": "Product #96", "price": 365.43},
{ "id": 97, "name": "Product #97", "price": 360.80},
{ "id": 98, "name": "Product #98", "price": 836.90},
{ "id": 99, "name": "Product #99", "price": 71.32},
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
