import express from "express";
import polygonsController from "../controllers/polygonsController";
import jwtChecker from '../middlewares/jwtChecker'

const polygonsRouter = express.Router();

polygonsRouter.get("/", jwtChecker, polygonsController.list);
polygonsRouter.get("/:id", jwtChecker, polygonsController.view);
polygonsRouter.post("/create", jwtChecker, polygonsController.create);
polygonsRouter.put("/update", jwtChecker, polygonsController.update);
polygonsRouter.delete("/:id", jwtChecker, polygonsController.delete);
polygonsRouter.get('/search/:id', jwtChecker, polygonsController.search);

export default polygonsRouter;
