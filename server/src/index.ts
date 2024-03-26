import express, { Application, Request, Response } from "express";

import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "./config/library-management-syste-fb3e9-firebase-adminsdk-jc43t-ffae87ba8d.json";
import bodyParser from "body-parser";
import router from "./route";
import cors from "cors";

dotenv.config();

const server: Application = express();

server.use(
  cors({
    origin: "*",
  })
);

initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://library-management-syste-fb3e9.asia-southeast1.firebasedatabase.app",
});

server.use(express.json({ limit: "100mb" }));
server.use(bodyParser.json({ limit: "100mb" }));
server.use(express.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies

/** ROUTES */

server.use("/api/v1", router);

const PORT = process.env.PORT || 8800;

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
