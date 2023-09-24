import { Request, Response } from "express";
import TodoServices from "../service/TodoServices";

export default new (class TodoController {
  find(req: Request, res: Response) {
    TodoServices.find(req, res);
  }
  findOne(req: Request, res: Response) {
    TodoServices.findOne(req, res);
  }
  create(req: Request, res: Response) {
    TodoServices.create(req, res);
  }
  update(req: Request, res: Response) {
    TodoServices.update(req, res);
  }
  delete(req: Request, res: Response) {
    TodoServices.delete(req, res);
  }
})();
