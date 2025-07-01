import { Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "../interfaces";
import { LogSuccess, LogError } from "../utils/logger";

// ORM - User Collection
import { getAllUsers, getUserByID } from "../domain/orm/user.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
  /**
   * Endpoint to retreive User in the collection 'Users' of DB
   */
  @Get("/")
  public async getUsers(@Query() id?: string): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/users] Get User By ID: ${id}`);
      return await getUserByID(id);
    } else {
      LogSuccess("[/api/users] Get All Users Request");
      response = await getAllUsers();
    }

    return response;
  }
}
