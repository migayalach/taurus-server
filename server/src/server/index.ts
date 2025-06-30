import express, { Express, Request, Response } from "express";

// Security
import cors from "cors";
import helmet from "helmet";
//TODO HTTPS

// Root Router
import rootRouter from "../routes";

// *Create Express APP
const server: Express = express();

// *Define SERVER to use '/api' and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:3001/api/...
server.use("/api", rootRouter);

// TODO Mongoose Connection

// *Security Config
server.use(helmet());
server.use(cors());

// *Content Type
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));

// *Redirection Config
// http://localhost:3001/ ---> http://localhost:3001/api/
server.get("/", (request: Request, response: Response) => {
  response.redirect("/api");
});

export default server;
