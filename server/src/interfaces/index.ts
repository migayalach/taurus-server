import { BasicResponse } from "../types";
import { IUser } from "./IUser.interface";
import { IKata } from "./IKata.interface";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Real all Users from database || Get User By ID
  getUsers(page: number, limit: number, id?: string): Promise<any>;
  // Get all Katas of a User
  getKatas(page: number, limit: number, id: string): Promise<any>;
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

export interface IKataController {
  // Real all Katas from database || Get Kata By ID
  getKatas(page: number, limit: number, id?: string): Promise<any>;
  // Create New Kata
  createKata(kata: IKata): Promise<any>;
  // Delete Kata By ID
  deleteKata(id?: string): Promise<any>;
  // Update Kata
  updateKata(id: string, kata: IKata): Promise<any>;
}
