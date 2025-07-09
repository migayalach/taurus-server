import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { KatasController } from "../controllers/KatasController";
// Body Parser to read BODY from requests
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
// Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IKata, KataLevel } from "../interfaces/IKata.interface";
// Router from express
const katasRouter = express.Router();

// http://localhost:3001/api/users?id=6862d0fd3babc5770a8f1652
katasRouter
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
    const controller: KatasController = new KatasController();
    // Obtain Response
    const results: any = await controller.getKatas(page, limit, id);
    // Send to the client the response
    response.send(results);
  })
  // DELETE:
  .delete(verifyToken, async (request: Request, response: Response) => {
    // Obtain a Query Param (ID)
    const id: any = request?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: KatasController = new KatasController();
    // Obtain Response
    const results: any = await controller.deleteKata(id);
    // Send to the client the response
    response.status(results.status).send(results);
  })
  .put(
    jsonParser,
    verifyToken,
    async (request: Request, response: Response) => {
      // Obtain a Query Param (ID)
      const id: any = request?.query?.id;

      // Read from body
      const name: string = request?.body?.name;
      const description: string = request?.body?.description;
      const level: KataLevel = request?.body?.level || KataLevel.BASIC;
      const intents: number = request?.body?.intents || 0;
      const stars: number = request?.body?.stars || 0;
      const creator: string = request?.body?.creator;
      const solution: string = request?.body?.solution || "";
      const participants: string[] = request?.body?.participants || [];

      if (
        name &&
        description &&
        level &&
        intents >= 0 &&
        stars >= 0 &&
        creator &&
        solution &&
        participants.length >= 0
      ) {
        // Controller Instance to excute method
        const controller: KatasController = new KatasController();
        const kata: IKata = {
          name,
          description,
          level,
          intents,
          stars,
          creator,
          solution,
          participants,
        };
        // Obtain Response
        const results: any = await controller.updateKata(id, kata);
        response.status(200).send(results);
      } else {
        response.status(400).send({
          message: `[ERROR] Updating Kata. You need to send all attrs of kata to update if.`,
        });
      }
    }
  )
  .post(
    jsonParser,
    verifyToken,
    async (request: Request, response: Response) => {
      // Read from body
      const name: string = request?.body?.name;
      const description: string =
        request?.body?.description || "Default description";
      const level: KataLevel = request?.body?.level || KataLevel.BASIC;
      const intents: number = request?.body?.intents || 0;
      const stars: number = request?.body?.stars || 0;
      const creator: string = request?.body?.creator;
      const solution: string = request?.body?.solution || "";
      const participants: string[] = request?.body?.participants || [];
      if (
        name &&
        description &&
        level &&
        intents >= 0 &&
        stars >= 0 &&
        creator &&
        solution &&
        participants.length >= 0
      ) {
        // Controller Instance to excute method
        const controller: KatasController = new KatasController();
        const kata: IKata = {
          name,
          description,
          level,
          intents,
          stars,
          creator,
          solution,
          participants,
        };
        // Obtain Response
        const results: any = await controller.createKata(kata);
        response.status(200).send(results);
      } else {
        response.status(400).send({
          message: `[ERROR] Creating Kata. You need to send all attrs of kata to update if.`,
        });
      }
    }
  );

// Export Users Router
export default katasRouter;

/**
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents => 200 (Entity) / 204 (No return)
 */
