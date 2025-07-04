/**
 * Root Router
 * Redirections to Routers
 */

import express, { Response, Request } from "express";
import UserRouter from "./UsersRouter";
import HelloRouter from "./HelloRouter";
import AuthRouter from "./AuthRouter";
import { LogInfo } from "../utils/logger";

// Server instance
const server = express();

// Router instance
const rootRouter = express.Router();

// Acticate for requests to http:localhost:3001/api
rootRouter.get("/", (request: Request, response: Response) => {
  LogInfo("GET: http://localhost:3001/api");
  response.send("Welcome to my API");
});

// Redirections to Routers & Controllers
server.use("/", rootRouter); //http://localhost:3001/api/
server.use("/hello", HelloRouter); //http://localhost:3001/api/hello --> HelloRouter
server.use("/users", UserRouter); //http://localhost:3001/api/users --> UserRouter
server.use("/auth", AuthRouter); //http://localhost:3001/api/auth --> AuthRouter
// Add more routes to the app
export default server;
