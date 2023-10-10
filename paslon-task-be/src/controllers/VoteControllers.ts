import { Request, Response } from "express";
import VoteService from "../service/VoteService";

export default new (class VoteControllers {
  findVotes(req: Request, res: Response) {
    VoteService.findVotes(req, res);
  }
  getVote(req: Request, res: Response) {
    VoteService.getVote(req, res);
  }
  createVote(req: Request, res: Response) {
    VoteService.createVote(req, res);
  }
  DeleteVote(req: Request, res: Response) {
    VoteService.DeleteVote(req, res);
  }
})();
