import express, { Request, Response } from "express";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import { AuthController } from "../controllers/AuthController";
// BCRYPT for password
import bcript from "bcrypt";
// Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
// Body Parse (Read JSON from Body in Request)
import bodyParser from "body-parser";
// Middleware to read JSON in Body
const jsonParser = bodyParser.json();
// Router from express
const authRouter = express.Router();

authRouter
  .route("/register")
  .post(jsonParser, async (request: Request, response: Response) => {
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
      response.status(200).send(results);
    } else {
      // Send to the client the response
      response.status(400).send({
        message: `[ERROR User Data missing]: No user can be registered`,
      });
    }
  });

authRouter
  .route("/login")
  .post(jsonParser, async (request: Request, response: Response) => {
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
    } else {
      // Send to the client the response
      response.status(400).send({
        message: `[ERROR User Data missing]: No user can be registered`,
      });
    }
  });

// Route Protected by VERIFY TOKEN Middleware
authRouter
  .route("/me")
  .get(verifyToken, async (request: Request, response: Response) => {
    // Obtain the ID of user to check it's data
    const id: any = request.query.id;
    if (id) {
      // Controller: Auth Controller
      const controler: AuthController = new AuthController();
      // Obtain response from controller
      const result: any = await controler.userData(id);
      // If user is athorised
      response.status(200).send(result);
    } else {
      response.status(401).send({
        message: "You are not authorised.",
      });
    }
  });

// Export Hello Router
export default authRouter;
