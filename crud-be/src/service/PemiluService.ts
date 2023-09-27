import { Repository } from "typeorm";
import { Pemilu } from "../entities/Pemilu";
import { AppDataSource } from "../data-source";
import { createPemiluSchema } from "../utils/validator/Pemilus";
import { Request, Response } from "express";

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

      const { error } = createPemiluSchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      const obj = this.PemiluRepository.create({
        name: data.name,
        vision: data.vision,
        image: data.image,
      });

      const pemilus = this.PemiluRepository.save(obj);
      return res.status(200).json(pemilus);
    } catch (error) {
      return res.status(500).json({ Error: "Error while inserting data" });
    }
  }
})();
