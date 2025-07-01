import { Delete } from "tsoa";
import { userEntity } from "../entities/user.entity";
import { LogError, LogSuccess } from "../../utils/logger";

// CRUD PETICIONS
/**
 * Nethod to obtain all Users from Collection 'Users' in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity();
    return await userModel.find();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
  }
};

// - Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Search User By ID
    return await userModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
  }
};

// TODO
// - Get User by Email
// - Delete User by ID
// - Create new User
// - Update User by ID
