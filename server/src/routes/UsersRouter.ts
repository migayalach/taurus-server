import express, { Request, Response } from "express";
import { HelloController } from "../controllers/HelloController";
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
  .delete(async (request: Request, response: Response) => {});

// Export User Router
export default userRouter;


// 46:15