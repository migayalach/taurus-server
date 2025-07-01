import express, { Request, Response } from "express";
import { HelloController } from "../controllers/HelloController";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "@/types";

// Router from express
const helloRouter = express.Router();

// http://localhost:3001/api/hello?name=Martin
helloRouter
  .route("/")
  //GET => http://localhost:3001/api/hello?name=Martin
  .get(async (request: Request, response: Response) => {
    // Obtain a Query Param
    const name: any = request?.query?.name;
    LogInfo(`Query param: ${name}`);
    // Controller Instance to excute method
    const controller: HelloController = new HelloController();
    // Obtain Response
    const results: BasicResponse = await controller.getMessage(name);
    // Send to the client the response
    response.send(results);
  });

// Export Hello Router
export default helloRouter;
