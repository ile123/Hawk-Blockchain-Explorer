import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectToDatabase } from "./helper";
import { AuthenticationRouter } from "./routes/AuthenticationRouter";
import { config } from "./config/dotenv";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string = "mongodb://localhost:27017/hawk-db";

connectToDatabase(uri);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.use("/api", AuthenticationRouter());

app.listen(config.PORT, () => {
  console.log(`Server is running on PORT: ${config.PORT}`);
});
