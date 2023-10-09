import { Repository, FindOperator } from "typeorm";
import { Parties } from "../entities/parties";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { createPartySchema } from "../utils/validator/parties";

export default new (class PartyService {
  private readonly PartyRepository: Repository<Parties> =
    AppDataSource.getRepository(Parties);

  async findParties(req: Request, res: Response): Promise<Response> {
    try {
      const parties = await this.PartyRepository.find({
        relations: {
          paslon: true,
        },
      });
      if (parties.length <= 0) {
        return res.status(404).json({
          code: 404,
          Message: "Parties not found!",
        });
      }

      return res.status(200).json({
        code: 200,
        data: parties,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while fetching parties data!",
      });
    }
  }

  async GetParty(req: Request, res: Response): Promise<Response> {
    try {
      const partyId: number = parseInt(req.params.partyId);
      console.log(partyId);
      const party = await this.PartyRepository.findOne({
        relations: {
          paslon: true,
        },
        where: {
          id: partyId,
        },
      });
      if (!party) {
        return res.status(404).json({
          code: 404,
          Message: "party not found!",
        });
      }

      return res.status(200).json({
        code: 200,
        data: party,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while fetching party data",
      });
    }
  }

  async createParty(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      console.log(data);
      const { error } = createPartySchema.validate(data);
      if (error)
        return res.status(400).json({
          code: 400,
          Error: error,
        });

      const obj = this.PartyRepository.create({
        name: data.name,
        paslon: data.paslonId,
      });

      await this.PartyRepository.save(obj);
      return res.status(200).json({
        code: 200,
        data: obj,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while inserting data",
      });
    }
  }

  async UpdateParties(req: Request, res: Response): Promise<Response> {
    try {
      const partyId: number = parseInt(req.params.partyId);
      const updateParty = req.body;
      console.log(updateParty);

      if (!updateParty)
        return res
          .status(404)
          .json({ code: 404, Error: "Party data not found" });

      const party = await this.PartyRepository.findOne({
        relations: {
          paslon: true,
        },
        where: {
          id: partyId,
        },
      });

      if (updateParty.name == "") {
        updateParty.name = party[0].name;
      }
      if (updateParty.paslonId == "") {
        updateParty.paslonId = party[0].paslonId;
      }

      const partyObj = await this.PartyRepository.createQueryBuilder()
        .update(Parties)
        .set({
          name: updateParty.name,
          paslon: updateParty.paslonId,
        })
        .where("id = :id", { id: partyId })
        .execute();

      return res.status(200).json({
        code: 200,
        Data: updateParty,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while updating party data",
      });
    }
  }

  async DeleteParty(req: Request, res: Response): Promise<Response> {
    try {
      const partyId: number = parseInt(req.params.partyId);
      const partyToDelete = await this.PartyRepository.findOne({
        relations: {
          paslon: true,
        },
        where: {
          id: partyId,
        },
      });
      if (!partyToDelete)
        return res.status(404).json({
          code: 404,
          Error: "ID not found",
        });

      const deleteParty = await this.PartyRepository.createQueryBuilder(
        "parties"
      )
        .delete()
        .from(Parties)
        .where("id = :id", { id: partyToDelete.id })
        .execute();

      return res.status(200).json({
        code: 200,
        Data: partyToDelete,
        Message: `${partyToDelete.name} berhasil dihapus dari database`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while deleting party data",
      });
    }
  }
})();
