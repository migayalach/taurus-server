import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Configuration the .env file
dotenv.config();

// Create Express APP
const app: Express = express();
const port: string | number = process.env.PORT || 3001;

// Define the first Route of APP
app.get("/", (request: Request, response: Response) => {
  response.send("Wellcome to my API my friend");
});

// Execute APP and Listen Requests to PORT
app.listen(port, () => {
  console.log(`Express server: Running at port ${port}`);
});
