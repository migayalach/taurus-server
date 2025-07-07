import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { UserController } from "../controllers/UsersController";
// Body Parser to read BODY from requests
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
// Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
// Router from express
const userRouter = express.Router();

// http://localhost:3001/api/users?id=6862d0fd3babc5770a8f1652
userRouter
  .route("/")
  //GET:
  .get(verifyToken, async (request: Request, response: Response) => {
    // Obtain a Query Param (ID)
    const id: any = request?.query?.id;
    // Pagination
    const page: any = request?.query?.page || 1;
    const limit: any = request?.query.limit || 10;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: UserController = new UserController();
    // Obtain Response
    const results: any = await controller.getUsers(page, limit, id);
    // Send to the client the response
    response.send(results);
  })
  // DELETE:
  .delete(verifyToken, async (request: Request, response: Response) => {
    // Obtain a Query Param (ID)
    const id: any = request?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: UserController = new UserController();
    // Obtain Response
    const results: any = await controller.deleteUser(id);
    // Send to the client the response
    response.status(results.status).send(results);
  })
  .put(verifyToken, async (request: Request, response: Response) => {
    // Obtain a Query Param (ID)
    const id: any = request?.query?.id;
    const name: any = request?.query?.name;
    const email: any = request?.query?.email;
    const age: any = request?.query?.age;
    LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`);
    // Controller Instance to excute method
    const controller: UserController = new UserController();
    const user = {
      name: name || "default",
      email: email || "default email",
      age: age || 18,
    };
    // Obtain Response
    const results: any = await controller.updateUser(id, user);
    // Send to the client the response
    response.status(results.status).send(results);
  });

// Export Users Router
export default userRouter;

/**
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents => 200 (Entity) / 204 (No return)
 */
