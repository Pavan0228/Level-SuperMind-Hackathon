import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express({
    origin: process.env.CORS_ORIGIN,
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

import { userRouter } from "./routers/user.routes.js";
import { ytRouter } from "./routers/yt.routes.js";
import { playstoreRouter } from "./routers/playstore.routes.js";
import { reportRouter } from "./routers/report.routes.js";
import { verifyJWT } from "./middlewares/auth.middlewares.js";

//add test route
app.get("/", (req, res) => {
    res.send("This is a test route!");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/yt", ytRouter);
app.use("/api/v1/playstore", playstoreRouter);
app.use("/api/v1/report", reportRouter);


app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

export { app };
