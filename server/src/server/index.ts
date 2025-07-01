import express, { Express, Request, Response } from "express";
// Swagger
import swaggerUi from "swagger-ui-express";

// Security
import cors from "cors";
import helmet from "helmet";

//TODO HTTPS

// Root Router
import rootRouter from "../routes";
import mongoose from "mongoose";

// *Create Express APP
const server: Express = express();

// *Swagger Config and route
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
      exporer: true,
    },
  })
);

// *Define SERVER to use '/api' and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:3001/api/...
server.use("/api", rootRouter);

// Static server
server.use(express.static("public"));

// TODO Mongoose Connection
mongoose.connect("mongodb://localhost:27017/codeverification");

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
