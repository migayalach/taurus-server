import { BasicResponse } from "../types";
import { IUser } from "./IUser.interface";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Real all Users from database || Get User By ID
  getUsers(page: number, limit: number, id?: string): Promise<any>;
  // Delete User By ID
  deleteUser(id?: string): Promise<any>;
  // Update User
  updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
  // Register users
  registerUser(user: IUser): Promise<any>;
  // Login users
  loginUser(auth: any): Promise<any>;
  // Login user out
  logoutUser(): Promise<any>;
}
