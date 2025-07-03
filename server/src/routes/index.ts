/**
 * Root Router
 * Redirections to Routers
 */

import express, { Response, Request } from "express";
import UserRouter from "./UsersRouter";
import HelloRouter from "./HelloRouter";
import AuthRouter from "./AuthRoute";
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
server.use("/hello", HelloRouter); //http://localhost:3001/api/hello --> Hello Router
server.use("/users", UserRouter); //http://localhost:3001/api/users --> User Router
server.use("/auth", AuthRouter); //http://localhost:3001/api/auth --> Auth Router
// Add more routes to the app
export default server;
