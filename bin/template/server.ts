import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import dbConnection from "./config/dbConfig";
import setupRoutes from "./routes";
configDotenv();
dbConnection(process.env.DATABASE_URI!);

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})