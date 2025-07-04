import { Get, Post, Query, Route, Tags } from "tsoa";
import { IAuthController } from "../interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import { AuthResponse, ErrorResponse } from "../types";

// ORM - User Collection
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserByID,
} from "../domain/orm/user.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    let response: any = "";
    if (user) {
      LogSuccess(`[/api/auth/register] Register New User: ${user.email}`);
      await registerUser(user)
        .then((info) => {
          LogSuccess(`[/api/auth/register] Created User: ${user.email}`);
          response = {
            message: `User created successfully; ${user.name}`,
          };
        })
        .catch((error) => {
          LogError(`[/api/auth/register] Created User had an error: ${error}`);
        });
    } else {
      LogWarning("[/api/auth/register] Register needs User Entity");
      response = {
        status: 400,
        message: `User not Registered: Please, provide an User Entity to create one`,
      };
    }
    return response;
  }

  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined;
    if (auth) {
      LogSuccess(`[/api/auth/login] Wellcome: ${auth.email}`);
      const data = await loginUser(auth);
      response = {
        token: data.token,
        message: `Wellcome, ${data.user.name}`,
      };
    } else {
      LogWarning(
        `[/api/auth/login] Register needs Auth Entity (email && password)`
      );
      response = {
        // status: 400,
        error: "[AUTH ERROR]: Email & Password are needed",
        message: `Please, provide an Email && Password to Login`,
      };
    }
    return response;
  }

  @Post("/logout")
  public async logoutUser(): Promise<any> {
    let response: any = "";
    // TODO Close Session of user
  }

  /**
   * Endpoint to retreive User in the collection 'Users' of DB
   * Meddleware: Validate JWT
   * In headers you must add the x-access-tocken with a valid JWT
   * @params {string} id Id for user to retreive (optional)
   * @return All user o user found by ID
   */
  @Get("/me")
  public async userData(@Query() id: string): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/users] Get User Data by ID: ${id}`);
      response = await getUserByID(id);
      // Remove the password
      response.password = "fuck you!";
    }

    return response;
  }
}
