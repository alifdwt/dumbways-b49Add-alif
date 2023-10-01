import { Request, Response } from "express";
import PemiluService from "../service/PemiluService";

export default new (class PemiluController {
  find(req: Request, res: Response) {
    PemiluService.find(req, res);
  }
  findPaslon(req: Request, res: Response) {
    PemiluService.findPaslon(req, res);
  }
  create(req: Request, res: Response) {
    PemiluService.create(req, res);
  }
  update(req: Request, res: Response) {
    PemiluService.update(req, res);
  }
  delete(req: Request, res: Response) {
    PemiluService.delete(req, res);
  }
})();
