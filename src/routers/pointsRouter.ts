import express from "express";
import pointsController from "../controllers/pointsController";

const pointsRouter = express.Router();

pointsRouter.get("/", pointsController.list);
pointsRouter.get("/:id", pointsController.view);
pointsRouter.post("/create", pointsController.create)
pointsRouter.put("/update", pointsController.update);
pointsRouter.delete("/:id", pointsController.delete);

export default pointsRouter
