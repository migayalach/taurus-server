import { BasicResponse } from "../types";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Real all users from database || Get User By ID
  getUsers(id?: string): Promise<any>;
}
