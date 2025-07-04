import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRETKEY || "MYSECRETKEY";
/**
 *
 * @param {Request} request Original request previous middleware of verification JWT
 * @param {Response} response Response to verification of JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification or next execution
 */

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Check HEADER from Request for 'x-access-token'
  const token: any = request.headers["x-access-token"];
  // Verify if jwt is present 
  if (!token) {
    response.status(403).send({
      authenticationError: "Missing JWT in request",
      message: "Not authenticacion to consume this endpoint",
    });
  }
  // Verify the token obtained. We pass the secret
  jwt.verify(token, secret, (error: any, decoded: any) => {
    if (error) {
      response.status(500).send({
        authenticationError: "JWT verification failed",
        message: "Failed to verify JWT token in request",
      });
    }
  });

  // Execute Next Function --> Protected Routes will be execute
  next();
};
