import { Delete, Get, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "../interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - User Collection
import {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID,
} from "../domain/orm/user.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
  /**
   * Endpoint to retreive User in the collection 'Users' of DB
   * @params {string} id Id for user to retreive (optional)
   * @return All user o user found by ID
   */
  @Get("/")
  public async getUsers(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/users] Get User By ID: ${id}`);
      return await getUserByID(id);
    } else {
      LogSuccess("[/api/users] Get All Users Request");
      response = await getAllUsers(page, limit);
    }

    return response;
  }

  /**
   * Endpoint to delete User in the collection 'Users' of DB
   * @params {string} id Id for user to delete (optional)
   * @return message informing if detention was correct
   */
  @Delete("/")
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/users] Delete User By ID: ${id}`);
      await deleteUserByID(id)
        .then((info) => {
          response = {
            status: 204,
            message: `User with id ${id} deleted successfully`,
          };
        })
        .catch((error) => {
          LogError(`[api/users] Delete User had an error: ${error}`);
        });
    } else {
      LogWarning("[/api/users] Delete User Request WITHOUT ID");
      response = {
        status: 400,
        message: `Please, provide an ID to remove from database`,
      };
    }
    return response;
  }

  /**
   * Endpoint to update User in the collection 'Users' of DB
   * @params {string} id Id for user to retreive
   * @return All user o user found by ID
   */
  @Put("/")
  public async updateUser(id: string, user: any): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/users] Update User By ID: ${id}`);
      await updateUserByID(id, user)
        .then((info) => {
          response = {
            status: 200,
            message: `User with id ${id} updated successfully`,
          };
        })
        .catch((error) => {
          LogError(`[api/users] Update User had an error: ${error}`);
        });
    } else {
      LogWarning("[/api/users] Update User Request WITHOUT ID");
      response = {
        status: 400,
        message: `Please, provide an ID to update an existing user`,
      };
    }
    return response;
  }
}
