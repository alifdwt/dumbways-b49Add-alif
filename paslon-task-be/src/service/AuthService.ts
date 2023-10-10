import { Repository } from "typeorm";
import { Users } from "../entities/users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createUserSchema, loginUserSchema } from "../utils/validator/auth";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new (class AuthService {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = createUserSchema.validate(data);
      if (error) {
        return res.status(500).json({
          code: 500,
          Error: error,
        });
      }

      const checkEmail = await this.UserRepository.count({
        where: {
          email: value.email,
        },
      });
      if (checkEmail > 0) {
        return res.status(400).json({
          code: 400,
          Error: "Email has been registered",
        });
      }

      const password = await bcrypt.hash(value.password, 10);

      const userObj = this.UserRepository.create({
        full_name: value.full_name,
        email: value.email,
        password: password,
      });

      const createdUser = await this.UserRepository.save(userObj);

      return res.status(200).json({
        code: 200,
        data: {
          full_name: createdUser.full_name,
          email: createdUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while registering user.",
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = loginUserSchema.validate(data);
      if (error) {
        return res.status(500).json({
          code: 500,
          Error: error,
        });
      }

      const checkEmail = await this.UserRepository.findOne({
        where: {
          email: value.email,
        },
        select: ["id", "full_name", "email", "password"],
      });
      if (!checkEmail) {
        return res.status(400).json({
          code: 400,
          Error: "Wrong email. Please try again!",
        });
      }

      const checkPassword = await bcrypt.compare(
        value.password,
        checkEmail.password
      );
      if (!checkPassword) {
        return res.status(400).json({
          code: 400,
          Error: "Wrong password, please try again!",
        });
      }

      const userObj = this.UserRepository.create({
        id: checkEmail.id,
        full_name: checkEmail.full_name,
        email: checkEmail.email,
      });

      const token = jwt.sign({ userObj }, "misteri-ilahi", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        code: 200,
        data: userObj,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while login",
      });
    }
  }

  async checkSession(req: Request, res: Response) {
    try {
      const { loginSession } = res.locals;

      await this.UserRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      return res.status(200).json({
        code: 200,
        Message: "Token is valid!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while checking session!",
      });
    }
  }
})();
