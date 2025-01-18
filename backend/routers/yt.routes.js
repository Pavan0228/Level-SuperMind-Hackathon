import { Router } from "express";
import { demoYt, fetchYouTubeResults } from "../controller/yt.controller.js";

const ytRouter = Router();

ytRouter.post("/ads", fetchYouTubeResults);
ytRouter.post("/demo/ads", demoYt);

export { ytRouter };
