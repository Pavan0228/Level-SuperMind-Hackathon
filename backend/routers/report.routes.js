import { Router } from "express";
import { reportData } from "../controller/report.controller.js";

const reportRouter = Router();

reportRouter.post("/", reportData)

export { reportRouter };