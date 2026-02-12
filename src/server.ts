/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nzamanraz_db_user:UN2pLOJfkGv1VRSq@cluster0.ett1nmy.mongodb.net/?appName=Cluster0",
    );

    console.log("Connected to DB!!!");

    server = app.listen(5000, () => {
      console.log("Server is running!!!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Server is shutting down!");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received. Server is shutting down!");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled rejecttion detected. Server is shutting down!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught exception detected. Server is shutting down!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
