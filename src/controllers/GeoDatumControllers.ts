import { Request, Response } from "express";
import GeoDatumServices from "../service/GeoDatumServices";

export default new (class GeoDatumController {
  find(req: Request, res: Response) {
    GeoDatumServices.find(req, res);
  }
  findProvince(req: Request, res: Response) {
    GeoDatumServices.findProvince(req, res);
  }
  findCityByProvince(req: Request, res: Response) {
    GeoDatumServices.findCityByProvince(req, res);
  }
  findDistrictByCity(req: Request, res: Response) {
    GeoDatumServices.findDistrictByCity(req, res);
  }
  findVillageByDistrict(req: Request, res: Response) {
    GeoDatumServices.findVillageByDistrict(req, res);
  }
  create(req: Request, res: Response) {
    GeoDatumServices.create(req, res);
  }
  update(req: Request, res: Response) {
    GeoDatumServices.update(req, res);
  }
  delete(req: Request, res: Response) {
    GeoDatumServices.delete(req, res);
  }
})();
