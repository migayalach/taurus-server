import express, { Request, Response } from "express";
import { IUser } from "../interfaces/IUser.interface";
import { AuthController } from "../controllers/AuthController";
import { LogInfo } from "../utils/logger";
// BCRYPT for password
import bcript from "bcrypt";
import { IAuth } from "../interfaces/IAuth.interface";
// Router from express
const authRouter = express.Router();

authRouter
  .route("/auth/register")
  .post(async (request: Request, response: Response) => {
    const { name, email, password, age } = request.body;
    let hashedPassword = "";
    if (password && name && email && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcript.hashSync(password, 8);
      const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age,
      };
      // Controller Instance to excute method
      const controller: AuthController = new AuthController();
      // Obtain Response
      const results: any = await controller.registerUser(newUser);
      // Send to the client the response
      response.send(results);
    }
  });

authRouter
  .route("/auth/login")
  .post(async (request: Request, response: Response) => {
    const { email, password } = request.body;
    if (password && email) {
      // Controller Instance to excute method
      const controller: AuthController = new AuthController();
      const auth: IAuth = {
        email,
        password,
      };
      // Obtain Response
      const results: any = await controller.loginUser(auth);
      // Send to the client the response which includes th JWT to authorize request
      response.status(200).send(results);
    }
  });

// Export Hello Router
export default authRouter;
