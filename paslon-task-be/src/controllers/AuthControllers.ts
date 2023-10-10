import { Request, Response } from "express";
import AuthService from "../service/AuthService";

export default new (class AuthController {
  registerUser(req: Request, res: Response) {
    AuthService.registerUser(req, res);
  }
  loginUser(req: Request, res: Response) {
    AuthService.loginUser(req, res);
  }
  checkSession(req: Request, res: Response) {
    AuthService.checkSession(req, res);
  }
})();
