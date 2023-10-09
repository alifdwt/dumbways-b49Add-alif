import { Repository } from "typeorm";
import { Paslons } from "../entities/paslons";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createPaslonSchema } from "../utils/validator/Paslons";
import {
  uploadToCloudinary,
  DeleteFromCloudinary,
} from "../utils/cloudinary/cloudinary";

export default new (class PaslonService {
  private readonly PaslonRepository: Repository<Paslons> =
    AppDataSource.getRepository(Paslons);

  async findPaslons(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await this.PaslonRepository.find();
      if (paslons.length <= 0) {
        return res.status(404).json({
          code: 404,
          message: "Paslons not found!",
        });
      }

      return res.status(200).json({
        code: 200,
        data: paslons,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while fetching paslons data!",
      });
    }
  }

  async getPaslon(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId: number = parseInt(req.params.paslonId);
      const paslon = await this.PaslonRepository.find({
        where: { id: paslonId },
      });

      if (paslon.length <= 0)
        return res.status(404).json({ code: 404, Error: "Paslon not found!" });

      return res.status(200).json({
        code: 200,
        data: paslon,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        Error: "Error while fetching paslon data!",
      });
    }
  }

  async createPaslon(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const image = req.file.filename;
      const imageResult = await uploadToCloudinary(image, "Pemilu", data.name);

      const { error } = createPaslonSchema.validate(data);
      if (error)
        return res.status(400).json({
          code: 400,
          Error: error,
        });

      const obj = this.PaslonRepository.create({
        name: data.name,
        vision: data.vision,
        image: imageResult,
      });

      const paslon = this.PaslonRepository.save(obj);
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

  async updatePaslon(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId: number = parseInt(req.params.paslonId);
      const updatePaslon = req.body;

      if (!updatePaslon)
        return res
          .status(404)
          .json({ code: 404, Error: "Paslon data not found" });

      const paslon = await this.PaslonRepository.find({
        where: { id: paslonId },
      });

      const image = req.file.filename;
      console.log(image);
      if (!image) {
        updatePaslon.image == paslon[0].image;
      }
      const imageResult = await uploadToCloudinary(
        image,
        "Pemilu",
        updatePaslon.name
      );
      updatePaslon.image == imageResult;

      if (updatePaslon.name == "") {
        updatePaslon.name = paslon[0].name;
      }
      if (updatePaslon.vision == "") {
        updatePaslon.vision = paslon[0].vision;
      }

      const paslonObj = await this.PaslonRepository.createQueryBuilder()
        .update(Paslons)
        .set({
          name: updatePaslon.name,
          vision: updatePaslon.vision,
          image: updatePaslon.image,
        })
        .where("id = :id", { id: paslonId })
        .execute();

      return res.status(200).json({
        code: 200,
        Data: updatePaslon,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while updating data",
      });
    }
  }

  async deletePaslon(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId: number = parseInt(req.params.paslonId);
      const paslonToDelete = await this.PaslonRepository.findOne({
        where: { id: paslonId },
      });
      if (!paslonToDelete)
        return res.status(404).json({
          code: 404,
          Error: "ID not found",
        });

      const imageToDelete = await DeleteFromCloudinary(
        "Pemilu",
        paslonToDelete.name
      );

      const deletePaslon = await this.PaslonRepository.createQueryBuilder(
        "paslons"
      )
        .delete()
        .from(Paslons)
        .where("id = :id", { id: paslonToDelete.id })
        .execute();
      return res.status(200).json({
        code: 200,
        Data: paslonToDelete,
        Message: `${paslonToDelete.name} berhasil dihapus dari database`,
        Cloudinary: imageToDelete,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while deleting data",
      });
    }
  }
})();
