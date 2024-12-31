import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectToDatabase } from "./helper";
import { AuthenticationRouter } from "./routes/AuthenticationRouter";
import { config } from "./config/dotenv";
import { ExplorerRouter } from "./routes/ExplorerRouter";
import { HistoryRouter } from "./routes/HistoryRouter";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const localhostUri: string = "mongodb://localhost:27017/hawk-db";
//const dockerUri: string = 'mongodb://mongo:27017/hawk-db';

connectToDatabase(localhostUri);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.use("/api", AuthenticationRouter());
app.use("/api", ExplorerRouter());
app.use("/api", HistoryRouter());

app.listen(config.PORT, () => {
  console.log(`Server is running on PORT: ${config.PORT}`);
});
