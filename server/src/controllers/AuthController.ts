import { Post, Route, Tags } from "tsoa";
import { IAuthController } from "../interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// ORM - User Collection
import { registerUser, loginUser, logoutUser } from "../domain/orm/user.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    let response: any = "";
    if (user) {
      LogSuccess(`[/api/auth/register] Register New User: ${user}`);
      await registerUser(user)
        .then((info) => {
          LogSuccess(`[/api/auth/register] Created User: ${user}`);
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
        message: `Please, provide an User Entity to create one`,
      };
    }
    return response;
  }

  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: any = "";
    if (auth) {
      LogSuccess(`[/api/auth/login] Wellcome: ${auth.email}`);
      await loginUser(auth)
        .then((info) => {
          LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`);
          response = {
            message: `User Logged In successfully; ${auth.email}`,
            token: info.token, // JWT Generated for logged in user
          };
        })
        .catch((error) => {
          LogError(`[/api/auth/login] Logged to have an): ${error}`);
        });
    } else {
      LogWarning(
        `[/api/auth/login] Register needs Auth Entity (email && password)`
      );
      response = {
        status: 400,
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
}
