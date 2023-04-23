import express from "express";
import searchController from '../controllers/searchController';
import jwtChecker from '../middlewares/jwtChecker';

const searchRouter = express.Router();

searchRouter.post("/circle", jwtChecker, searchController.findEntities);

export default searchRouter;