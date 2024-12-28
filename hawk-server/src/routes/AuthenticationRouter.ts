import express, { Request, Response, Router } from "express";
import { signJwt } from "./JWTHandler";
import User from "../models/UserModel";
import bcrypt from "bcrypt";

export const AuthenticationRouter = (): any => {
  const authenticationRouter: Router = express.Router();

  authenticationRouter.route("/login").post(async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send("Email and password are required.");
      }

      const user: any | null = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(400).send("ERROR: User with given email does not exist!");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).send("Wrong password");
      }

      const token = signJwt(user.email);
      return res.status(200).json({ token: token, email: user.email });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  });

  authenticationRouter.route("/register").post(async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send("All fields are required.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: any = new User({
        name,
        password: hashedPassword,
        email
      });

      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  });

  authenticationRouter.route("/does-user-exist").get(async (req: Request, res: Response): Promise<any> => {
    const existingUser = await User.findOne();
    
    return res.status(200).json({ doesExist: existingUser == null ? false : true });
  });

  return authenticationRouter;
};