import express, { Request, Response, Router } from "express";
import { extractEmail, verifyJwt } from "./JWTHandler";
import User from "../models/UserModel";


export const HistoryRouter = (): Router => {
  const historyRouter: Router = express.Router();

  historyRouter.get(
    "/get-transaction-history",
    verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
      try {
        const email = extractEmail(req.headers.authorization);

        if (!email) {
          return res
            .status(401)
            .json({ error: "Authorization header missing or invalid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const result = user.get("viewedTransactions");
        return res.status(200).json(result);
      } catch (error: any) {
        console.error(
          "Error fetching transaction info:",
          error.response?.data?.error || error.message
        );
        return res
          .status(500)
          .json({ error: "Error fetching transaction info" });
      }
    }
  );

  historyRouter.get(
    "/get-address-history",
    verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
      try {
        const email = extractEmail(req.headers.authorization);

        if (!email) {
          return res
            .status(401)
            .json({ error: "Authorization header missing or invalid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const result = user.get("viewedAddresses");
        return res.status(200).json(result);
      } catch (error: any) {
        console.error(
          "Error fetching transaction info:",
          error.response?.data?.error || error.message
        );
        return res
          .status(500)
          .json({ error: "Error fetching transaction info" });
      }
    }
  );

  historyRouter.get(
    "/get-block-history",
    verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
      try {
        const email = extractEmail(req.headers.authorization);

        if (!email) {
          return res
            .status(401)
            .json({ error: "Authorization header missing or invalid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const result = user.get("viewedBlocks");
        return res.status(200).json(result);
      } catch (error: any) {
        console.error(
          "Error fetching transaction info:",
          error.response?.data?.error || error.message
        );
        return res
          .status(500)
          .json({ error: "Error fetching transaction info" });
      }
    }
  );

  return historyRouter;
}

