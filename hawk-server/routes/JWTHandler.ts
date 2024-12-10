import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET='09b67125dfd98da9e49858eeb803e16ea7a7cc4ec038c49a0d181a28235d616b90c353393e8e509533afb819e677f0df1aa6b3455d88f165fcbb9775237a9e20';

export const signJwt = (user_id: string): string | false => {
  const expirationTime = "1h";
  try {
    const token = jwt.sign({ sub: user_id }, SECRET || "", {
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
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.SECRET || "", (err, payload) => {
    if (err || !payload || typeof payload !== "object" || !("sub" in payload)) {
      return res.status(401).send("Unauthorized");
    }
    (req as any).user = payload;
    next();
  });
};