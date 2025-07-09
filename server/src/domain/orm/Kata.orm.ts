import { KataEntity } from "../entities/Kata.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IKata } from "../../interfaces/IKata.interface";
import dotenv from "dotenv";

// Configuration of enviromment variables
dotenv.config();

// CRUD
/**
 * Method to obtain all Katas from Collection 'Katas' in Mongo Server
 */

export const getAllKatas = async (
  page: number,
  limit: number
): Promise<any[] | undefined> => {
  try {
    const kataModel = KataEntity();
    const response: any = {};
    // Search all katas (using pagination)
    await kataModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });
    // Count total documents in collection Katas
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
  }
};

// - Get Kata by ID
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = KataEntity();
    // Search User By ID
    return await kataModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata By ID: ${error}`);
  }
};

// - Delete Kata by ID
export const deleteKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = KataEntity();
    // Delete Kata By ID
    return await kataModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata By ID: ${error}`);
  }
};

// - Create new Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    const kataModel = KataEntity();
    // Create / Insert new Kata
    return await kataModel.create(kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata: ${error}`);
  }
};

// - Update Kata by ID
export const updateKataByID = async (
  id: string,
  kata: IKata
): Promise<any | undefined> => {
  try {
    const kataModel = KataEntity();
    return await kataModel.findByIdAndUpdate(id, kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata: ${id}: ${error}`);
  }
};
