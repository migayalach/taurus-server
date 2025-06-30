import { Delete } from "tsoa";
import { userEntity } from "../entities/user.entity";
import { LogError, LogSuccess } from "@/utils/logger";

// CRUD PETICIONS
/**
 * Nethod to obtain all Users from Collection 'Users' in Mongo Server
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity();
    //Search all users
    return await userModel.find({ isDelete: false });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
  }
};

// TODO
// - Get User by ID
// - Get User by Email
// - Delete User by ID
// - Create new User
// - Update User by ID
