import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function processSubmission(submission: string) {
  let submissionData;

  try {
    submissionData = JSON.parse(submission);
  } catch (error) {
    console.error("Error parsing submission", error);
    return;
  }

  const randomDelay = Math.random() * 4000 + 10000;

  await new Promise((resolve) => setTimeout(resolve, randomDelay));

  const status = Math.random() < 0.5 ? "GGO" : "TLE";

  try {
    console.log("Publishing to Redis", submissionData);
    await redisClient.publish(
      "problem_done",
      JSON.stringify({
        userId: submissionData.userId,
        productId: submissionData.id,
        status: status,
        productName: submissionData.name,
      })
    );
  } catch (error) {
    console.error("Error publishing to Redis", error);
  }
}

async function processFiveSubmissions(submission) {
  await Promise.all([processSubmission(submission[0].element), processSubmission(submission[1].element), processSubmission(submission[2].element), processSubmission(submission[3].element), processSubmission(submission[4].element)]);
}

async function startWorker() {
  console.log("worker started");
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis", error);
  }

  while (true) { //make it work in batches
    try {
      const submission = [null, null, null, null, null];
      for (let i = 0; i < 5; ++i) {
        submission[i] = await redisClient.brPop("submissions", 0);
      }
      console.log("Received submission", submission);
      //send it to pub sub channel
      if (submission) {
	await processFiveSubmissions(submission);
        //await processSubmission(submission.element);
      }
    } catch (error) {
      console.error("Error processing submission", error);
    }
  }
}

startWorker().catch(console.error);
