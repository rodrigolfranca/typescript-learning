import express from "express";
import polygonsController from "../controllers/polygonsController";

const polygonsRouter = express.Router();

polygonsRouter.get("/", polygonsController.list);
polygonsRouter.get("/:id", polygonsController.view);
polygonsRouter.post("/create", polygonsController.create)
polygonsRouter.put("/update", polygonsController.update);
polygonsRouter.delete("/:id", polygonsController.delete);

export default polygonsRouter
