import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors({
    origin: '',
    credentials: true
}))


app.get("/", async (req: Request, res: Response) => {
    res.send("Hello world");
})

export default app;