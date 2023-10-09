import { Request, Response } from "express";
import PartyService from "../service/PartyService";

export default new (class PartyController {
  findParties(req: Request, res: Response) {
    PartyService.findParties(req, res);
  }
  getParty(req: Request, res: Response) {
    PartyService.GetParty(req, res);
  }
  createParty(req: Request, res: Response) {
    PartyService.createParty(req, res);
  }
  updateParty(req: Request, res: Response) {
    PartyService.UpdateParties(req, res);
  }
  DeleteParty(req: Request, res: Response) {
    PartyService.DeleteParty(req, res);
  }
})();
