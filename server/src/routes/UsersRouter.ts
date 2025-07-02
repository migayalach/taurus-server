import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { UserController } from "../controllers/UsersController";

// Router from express
const userRouter = express.Router();

// http://localhost:3001/api/users?id=6862d0fd3babc5770a8f1652
userRouter
  .route("/")
  //GET:
  .get(async (request: Request, response: Response) => {
    // Obtain a Query Param (ID)
    const id: any = request?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: UserController = new UserController();
    // Obtain Response
    const results: any = await controller.getUsers(id);
    // Send to the client the response
    response.send(results);
  })
  // DELETE:
  .delete(async (request: Request, response: Response) => {
    // Obtain a Query Param (ID)
    const id: any = request?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: UserController = new UserController();
    // Obtain Response
    const results: any = await controller.deleteUser(id);
    // Send to the client the response
    response.send(results);
  })
  // POST
  .post(async (request: Request, response: Response) => {
    // Controller Instance to excute method
    const controller: UserController = new UserController();
    const name: any = request?.query?.name;
    const email: any = request?.query?.email;
    const age: any = request?.query?.age;

    const user = {
      name: name || "default",
      email: email || "default email",
      age: age || 18,
    };
    // Obtain Response
    const results: any = await controller.createUser(user);
    // Send to the client the response
    response.send(results);
  })
  .put(async (request: Request, response: Response) => {
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
    response.send(results);
  });

// Export User Router
export default userRouter;
