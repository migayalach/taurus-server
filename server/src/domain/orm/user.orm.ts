import { userEntity } from "../entities/user.entity";
import { LogError } from "../../utils/logger";
import { IUser } from "../../interfaces/IUser.interface";
import { IAuth } from "../../interfaces/IAuth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserResponse } from "../../types/UsersResponse.type";
// Configuration of enviromment variables
dotenv.config();
// Obtain Secrect key to generate JWT
const secret = process.env.SECRETKEY || "MYSECRETKEY";

// CRUD PETICIONS
/**
 * Nethod to obtain all Users from Collection 'Users' in Mongo Server
 */
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity();
    const response: any = {};

    // Search all users (using pagination)
    await userModel
      .find()
      .select("name email age")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        response.users = users;
      });
    // Count total documents in collection Users
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
  }
};

// - Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Search User By ID
    return await userModel.findById(id).select("name email age");
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
  }
};

// - Delete User by ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Delete User By ID
    return await userModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User By ID: ${error}`);
  }
};

// - Create new User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Create / Insert new User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
};

// - Update User by ID
export const updateUserByID = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User: ${id}: ${error}`);
  }
};

// - Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Create / Insert new User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Registered User: ${error}`);
  }
};

// - Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    let userFound: IUser | undefined = undefined;
    let token = undefined;

    // Check if user exist by Unique Email
    await userModel
      .findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user;
      })
      .catch((error) => {
        console.error(`[ERROR Authentication in ORM]: User Not Found`);
        throw new Error(
          `[ERROR Authentication in ORM]: User Not Found: ${error}`
        );
      });
    // Check if Password is Valid (Compare wuth bcrypt)
    const validPassword = bcrypt.compareSync(
      auth.password,
      userFound!.password
    );

    if (!validPassword) {
      // TODO ---> NOT AUTHORISED (401)
      console.error(`[ERROR Authentication in ORM]: Password Not Valid`);
      throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`);
    }

    // Generate our JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: "2h",
    });
    return { user: userFound, token };
  } catch (error) {
    LogError(`[ORM ERROR]: Login User: ${error}`);
  }
};

// - Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO NOT IMPLEMENTD
};

// \"npm run swagger\"

// // Find User by ID
// userModel.findOne({ email: auth.email }, (error: any, user: IUser) => {
//   if (error) {
//     // TODO return ERROR --> ERROR while searching (500)
//   }
//   if (!user) {
//     // TODO return ERROR --> ERROR USER NOT FOUND (404)
//   }

//   // Use Bcrypt to Compare Passwords
//   const validPassword = bcrypt.compareSync(auth.password, user.password);
//   if (!validPassword) {
//     // TODO ---> NOT AUTHORISED (401)
//   }
//   // Create JWT
//   const token = jwt.sign({ email: user.email }, "MySecret", {
//     expiresIn: "2h",
//   });
//   return token;
// });
