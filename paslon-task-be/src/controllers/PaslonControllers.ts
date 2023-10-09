import { Request, Response } from "express";
import PaslonService from "../service/PaslonService";

export default new (class PaslonController {
  findPaslons(req: Request, res: Response) {
    PaslonService.findPaslons(req, res);
  }
  getPaslon(req: Request, res: Response) {
    PaslonService.getPaslon(req, res);
  }
  createPaslon(req: Request, res: Response) {
    PaslonService.createPaslon(req, res);
  }
  updatePaslon(req: Request, res: Response) {
    PaslonService.updatePaslon(req, res);
  }
  deletePaslon(req: Request, res: Response) {
    PaslonService.deletePaslon(req, res);
  }
})();
