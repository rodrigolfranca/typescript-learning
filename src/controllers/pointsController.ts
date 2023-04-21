import { Request, Response, RequestHandler } from "express";
import pointsService from "../services/pointsService";

interface PointsController {
    list: RequestHandler,
    view: RequestHandler,
    update: RequestHandler,
    delete: RequestHandler,
}

const pointsController: PointsController = {
    list : (req: Request, res: Response): Response => {        
        return res.status(200).json({message: "Porraéessa?"})
    },
    view : (req: Request, res: Response): Response => {
        return res.status(500)
    },
    update : (req: Request, res: Response): Response => {
        return res.status(500)
    },
    delete : (req: Request, res: Response): Response => {
        return res.status(500)
    },

}

export default pointsController;