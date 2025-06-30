import { BasicResponse } from "../types";
import { IHelloController } from "../interfaces";
import { LogSuccess } from "../utils/logger";

export class HelloController implements IHelloController {
  public async getMessage(name?: string): Promise<BasicResponse> {
    LogSuccess("[/api] Get Request");
    return {
      message: `Hello, ${name || "world"}.`,
    };
  }
}
