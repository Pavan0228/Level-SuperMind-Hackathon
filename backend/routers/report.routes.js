import { Router } from "express";
import { demoReport, reportData } from "../controller/report.controller.js";

const reportRouter = Router();

reportRouter.post("/", reportData)
reportRouter.post("/demo", demoReport)

export { reportRouter };