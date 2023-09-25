import { Request, Response } from "express";
import province from "../databases/models/provinces";
import cities_regencies from "../databases/models/cities_regencies";
import district from "../databases/models/districts";
import village from "../databases/models/villages";

export default new (class GeoDatumService {
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const provinces = await province.findAll();
      return res.status(200).json(provinces);
    } catch (error) {
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async findProvince(req: Request, res: Response): Promise<Response> {
    try {
      const provinceId: number = parseInt(req.params.provinceId);
      if (isNaN(provinceId) || provinceId <= 0)
        return res.status(400).json({ Error: "Invalid province id" });

      const provinceData = await province.findByPk(provinceId);
      if (!provinceData)
        return res.status(404).json({ Error: "Province data not found" });

      return res.status(200).json(provinceData);
    } catch (error) {
      return res
        .status(500)
        .json({ Error: "Internal Error while running 'findProvince" });
    }
  }

  async findCityByProvince(req: Request, res: Response): Promise<Response> {
    try {
      const provinceId: number = parseInt(req.params.provinceId);
      const cityId: number = parseInt(req.params.cityId);

      if (
        isNaN(provinceId) ||
        isNaN(cityId) ||
        provinceId <= 0 ||
        cityId <= 0
      ) {
        return res.status(400).json({ Error: "Invalid ids" });
      }

      const cityData = await cities_regencies.findByPk(cityId);
      if (!cityData)
        return res.status(404).json({ Error: "City/Regency data not found" });

      return res.status(200).json(cityData);
    } catch (error) {
      return res
        .status(500)
        .json({ Error: "Internal Error while running 'findCityByProvince'" });
    }
  }

  async findDistrictByCity(req: Request, res: Response): Promise<Response> {
    try {
      const provinceId: number = parseInt(req.params.provinceId);
      const cityId: number = parseInt(req.params.cityId);
      const districtId: number = parseInt(req.params.districtId);

      if (isNaN(provinceId) || provinceId <= 0) {
        return res.status(400).json({ Error: "Invalid province id" });
      }
      if (isNaN(cityId) || cityId <= 0) {
        return res.status(400).json({ Error: "Invalid city id" });
      }
      if (isNaN(districtId) || districtId <= 0) {
        return res.status(400).json({ Error: "Invalid district id" });
      }

      const districtData = await district.findByPk(districtId);
      if (!districtData)
        return res.status(404).json({ Error: "District data not found" });

      return res.status(200).json(districtData);
    } catch (error) {
      return res
        .status(500)
        .json({ Error: "Internal Error while running 'findDistrictByCity'" });
    }
  }

  async findVillageByDistrict(req: Request, res: Response): Promise<Response> {
    try {
      const provinceId: number = parseInt(req.params.provinceId);
      const cityId: number = parseInt(req.params.cityId);
      const districtId: number = parseInt(req.params.districtId);
      const villageId: number = parseInt(req.params.villageId);

      if (isNaN(provinceId) || provinceId <= 0) {
        return res.status(400).json({ Error: "Invalid province id" });
      }
      if (isNaN(cityId) || cityId <= 0) {
        return res.status(400).json({ Error: "Invalid city id" });
      }
      if (isNaN(districtId) || districtId <= 0) {
        return res.status(400).json({ Error: "Invalid district id" });
      }
      if (isNaN(villageId) || villageId <= 0) {
        return res.status(400).json({ Error: "Invalid village id" });
      }

      const villageData = await village.findByPk(villageId);
      if (!villageData)
        return res.status(404).json({ Error: "Village data not found" });

      return res.status(200).json(villageData);
    } catch (error) {
      return res.status(500).json({
        Error: "Internal Error while running 'findVillageByDistrict'",
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, alt_name, latitude, longitude } = req.body;
      const provinceData = await province.create({
        id,
        name,
        alt_name,
        latitude,
        longitude,
      });

      return res.status(200).json(provinceData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'create'" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const provinceId: number = parseInt(req.params.provinceId);
      const provinceToUpdate = await province.findByPk(provinceId);
      if (!provinceToUpdate)
        return res.status(404).json({ Error: "Province not found" });

      const updateProvince = req.body;
      console.log(updateProvince);
      const provinceData = await provinceToUpdate.update(updateProvince);

      return res.status(200).json(provinceData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'update'" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const provinceId: number = parseInt(req.params.provinceId);
      const provinceToDelete = await province.findByPk(provinceId);
      if (!provinceToDelete)
        return res.status(404).json({ Error: "Province not found" });

      const provinceData = await provinceToDelete.destroy();
      return res.status(200).json(provinceData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'delete'" });
    }
  }
})();
