// import { MulterFile } from "multer";
import { Repository } from "typeorm";
import { Pemilu } from "../entities/Pemilu";
import { AppDataSource } from "../data-source";
import { createPemiluSchema } from "../utils/validator/Pemilus";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default new (class PemiluService {
  private readonly PemiluRepository: Repository<Pemilu> =
    AppDataSource.getRepository(Pemilu);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await this.PemiluRepository.find();
      if (paslons.length <= 0)
        return res.status(404).json({ Error: "Paslon not found" });

      return res.status(200).json(paslons);
    } catch (error) {
      return res
        .status(500)
        .json({ Error: "Error while fetching paslon data" });
    }
  }

  async findPaslon(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId: number = parseInt(req.params.paslonId);
      const paslon = await this.PemiluRepository.find({
        where: { id: paslonId },
      });
      if (paslon.length <= 0)
        return res.status(404).json({ Error: "Paslon not found" });

      return res.status(200).json({ paslon });
    } catch (error) {
      return res
        .status(500)
        .json({ Error: "Error while fetching paslon data" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const image = req.file.filename;
      const imageResult = await cloudinary.uploader.upload(
        `src/uploads/${image}`,
        { folder: "Pemilu" }
      );

      const { error } = createPemiluSchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      const obj = this.PemiluRepository.create({
        name: data.name,
        vision: data.vision,
        image: imageResult.secure_url,
        updated_at: new Date(),
      });

      const pemilus = this.PemiluRepository.save(obj);
      return res.status(200).json(pemilus);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Error: "Error while inserting data" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId: number = parseInt(req.params.paslonId);
      const updatePaslon = req.body;
      const image = req.file.filename;
      const imageResult = await cloudinary.uploader.upload(
        `src/uploads/${image}`,
        { folder: "Pemilu" }
      );
      // console.log(imageResult);

      if (!updatePaslon)
        return res.status(404).json({ Error: "Paslon data not found" });

      if (!updatePaslon.name || !updatePaslon.vision || !imageResult) {
        return res.status(400).json({ Error: "Nothing to update" });
      }

      const paslon = await this.PemiluRepository.createQueryBuilder()
        .update(Pemilu)
        .set({
          name: updatePaslon.name,
          vision: updatePaslon.vision,
          image: imageResult.secure_url,
          updated_at: new Date(),
        })
        .where("id = :id", { id: paslonId })
        .execute();

      return res.status(200).json(paslon);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Error while running 'update'" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId: number = parseInt(req.params.paslonId);
      const paslonImage = await this.PemiluRepository.find({
        select: ["image"],
        where: { id: paslonId },
      });
      const imageUrl = paslonImage[0].image;
      const imageId = imageUrl.split("/").slice(-2).join("/");
      console.log(imageId);
      await cloudinary.uploader
        .destroy(imageId)
        .then((result) => console.log(result));

      const paslon = await this.PemiluRepository.createQueryBuilder("pemilu")
        .delete()
        .from(Pemilu)
        .where("id = :id", { id: paslonId })
        .execute();

      return res.status(200).json(paslon);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Error while running 'delete'" });
    }
  }
})();
