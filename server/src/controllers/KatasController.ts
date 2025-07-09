import { IKataController } from "../interfaces/index";
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
// ORM - Kata Collection
import {
  createKata,
  deleteKataByID,
  getAllKatas,
  getKataByID,
  updateKataByID,
} from "../domain/orm/Kata.orm";
import { IKata } from "@/interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController {
  /**
   * Endpoint to retreive Kata in the collection 'Kata' of DB
   * @param page
   * @param limit
   * @param id
   * @return All katas o kata found by ID
   */
  @Get("/")
  public async getKatas(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/katas] Get Katas By ID: ${id}`);
      return await getKataByID(id);
    } else {
      LogSuccess("[/api/katas] Get All Katas Request");
      response = await getAllKatas(page, limit);
    }
    return response;
  }

  /**
   * @param {string} id Id of Kata to delete (optional)
   * @return message informing if detention was correct
   */
  @Delete("/")
  public async deleteKata(id?: string): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/kata] Delete kata By ID: ${id}`);
      await deleteKataByID(id)
        .then((info) => {
          response = {
            status: 204,
            message: `kata with id ${id} deleted successfully`,
          };
        })
        .catch((error) => {
          LogError(`[api/kata] Delete kata had an error: ${error}`);
        });
    } else {
      LogWarning("[/api/kata] Delete kata Request WITHOUT ID");
      response = {
        status: 400,
        message: `Please, provide an ID to remove from database`,
      };
    }
    return response;
  }

  /**
   *
   * @param id
   * @param kata
   */
  @Put("/")
  public async updateKata(id: string, kata: IKata): Promise<any> {
    let response: any = "";
    if (id) {
      LogSuccess(`[/api/katas] Update kata By ID: ${id}`);
      await updateKataByID(id, kata)
        .then((info) => {
          response = {
            status: 200,
            message: `User with id ${id} updated successfully`,
          };
        })
        .catch((error) => {
          LogError(`[api/kata] Update kata had an error: ${error}`);
        });
    } else {
      LogWarning("[/api/kata] Update kata Request WITHOUT ID");
      response = {
        status: 400,
        message: `Please, provide an ID to update an existing user`,
      };
    }
    return response;
  }

  /**
   *
   * @param kata
   */
  @Post("/")
  public async createKata(kata: IKata): Promise<any> {
    let response: any = "";
    if (kata) {
      LogSuccess(`[/api/katas] Create New kata: ${kata.name}`);
      await createKata(kata)
        .then((info) => {
          LogSuccess(`[/api/katas] Created kata: ${kata.name}`);
          response = {
            message: `Kata created successfully; ${kata.name}`,
          };
        })
        .catch((error) => {
          LogError(`[/api/katas] Created kata had an error: ${error}`);
        });
    } else {
      LogWarning("[/api/kata] Register needs kata Entity");
      response = {
        status: 400,
        message: `User not Registered: Please, provide an kata Entity to create one`,
      };
    }
    return response;
  }
}
