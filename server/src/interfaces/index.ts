import { BasicResponse } from "../types";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Real all Users from database || Get User By ID
  getUsers(id?: string): Promise<any>;
  // Delete User By ID
  deleteUser(id?: string): Promise<any>;
  // Create new User
  createUser(id?: string): Promise<any>;
  // Update User
  updateUser(id: string, user: any): Promise<any>;
}
