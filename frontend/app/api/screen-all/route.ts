import { redisClient } from "@/lib/redis";
import { NextResponse } from "next/server";
import { Product } from "@/lib/types";

export async function POST(request: Request) {
  const { products } = await request.json();
  console.log(products);
  await redisClient.connect();

  try {
    products.forEach(async (product: Product) => {
      const productWithUserId = {
        ...product,
        userId: 42,
      };
      await redisClient.lPush("submissions", JSON.stringify(productWithUserId));
    });
  } catch (error) {
    console.error("Error pushing to Redis:", error);
    return NextResponse.json({ message: "Error pushing to Redis" });
  }

  return NextResponse.json({
    message: "Products successfully pushed on to the backend",
  });
}
