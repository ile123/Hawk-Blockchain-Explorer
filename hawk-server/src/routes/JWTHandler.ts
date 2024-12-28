import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/dotenv";

export const signJwt = (user_email: string): string | false => {
  const expirationTime = "1h";
  try {
    const token = jwt.sign({ sub: user_email }, config.JWT_SECRET || "", {
      expiresIn: expirationTime,
    });
    return token || false;
  } catch (error) {
    console.error("Error signing JWT:", error);
    return false;
  }
};

export const verifyJwt = (req: Request, res: Response, next: NextFunction): any | void => {
  const authorization = req.header("authorization");
  const token = authorization ? authorization.split("Bearer ")[1] : undefined;
  if (!token) {
    return res.status(401).send("Missing or invalid bearer token");
  }

  jwt.verify(token, config.JWT_SECRET || "", (err, payload) => {
    if (err || !payload || typeof payload !== "object" || !("sub" in payload)) {
      return res.status(401).send("Unauthorized");
    }
    (req as any).user = payload;
    next();
  });
};

export const extractEmail = (authHeader: string | undefined): string | undefined => {
  if(!authHeader)
    return "";
  
  const token = authHeader.split(' ')[1];
  const secret: any = config.JWT_SECRET;
  
  if(!token)
    return "";

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const email = decoded.sub as string | undefined;
    return email;
  } catch (error: any) {
    console.error("Invalid token:", error.message);
    return "";
  }
}