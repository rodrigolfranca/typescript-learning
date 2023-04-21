import express from "express";
import pointsController from "../controllers/pointsController";

const pointsRouter = express.Router();

pointsRouter.get("/", pointsController.list);

export default pointsRouter
