import express from "express";
import pointsController from "../controllers/pointsController";
import jwtChecker from '../middlewares/jwtChecker';

const pointsRouter = express.Router();

pointsRouter.get("/", jwtChecker, pointsController.list);
pointsRouter.get("/:id", jwtChecker, pointsController.view);
pointsRouter.post("/create", jwtChecker, pointsController.create);
pointsRouter.put("/update", jwtChecker, pointsController.update);
pointsRouter.delete("/:id", jwtChecker, pointsController.delete);
pointsRouter.post('/distance', jwtChecker, pointsController.getDistance);
pointsRouter.post('/isin', jwtChecker, pointsController.isIn);

export default pointsRouter;
