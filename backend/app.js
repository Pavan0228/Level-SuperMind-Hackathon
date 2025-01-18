import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express({
    origin: process.env.CORS_ORIGIN,
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import { userRouter } from "./routers/user.routes.js";
import { ytRouter } from "./routers/yt.routes.js";

//add test route
app.get("/", (req, res) => {
    res.send("This is a test route!");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/yt", ytRouter);

export { app };
