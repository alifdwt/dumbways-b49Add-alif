import express from "express";
import router from "./src/routes";
import dotenv from "dotenv";

async function start(): Promise<void> {
  try {
    dotenv.config();
    const app = express();
    const PORT = process.env.APP_PORT;

    app.use(express.json());

    app.use("/api/v1/", router);
    app.listen(PORT, () => console.log(`Express server running at ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

void start();
