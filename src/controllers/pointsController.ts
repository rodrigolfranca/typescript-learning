import { Request, Response, RequestHandler } from "express";
import pointsService from "../services/pointsService";
import { FeatureCollection, PointsGeometry } from "../modules/interfaces";

interface PointsController {
    list: RequestHandler,
    view: RequestHandler,
    create: RequestHandler,
    update: RequestHandler,
    delete: RequestHandler,
    getDistance: RequestHandler,
    isIn: RequestHandler,    
}

const pointsController: PointsController = {
    list : async (req: Request, res: Response): Promise<Response> => {
        console.log("Points Controller: List")
        try {
            const data: FeatureCollection = await pointsService.list();
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    view : async (req: Request, res: Response): Promise<Response> => {
        console.log("Points Controller: View");
        const id: Number = Number(req.params.id);
        try {
            const data: FeatureCollection = await pointsService.view(id)            
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500)
        }        
    },
    create: async (req, res) => {
        console.log('Points Controller: Create');
        const name: String = req.body.geojson.features[0].properties.name;
        const geom: PointsGeometry = req.body.geojson.features[0].geometry;
        try {
            const id: Number = await pointsService.create(name, geom);
            return res.status(201).json({created_id: id});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    update : async (req: Request, res: Response): Promise<Response> => {
        console.log('Points Controller: Updating one');
        const id: Number = Number(req.body.id);
        const name: String = req.body.geojson.features[0].properties.name;
        const geom: PointsGeometry = req.body.geojson.features[0].geometry;
        try {
            const data: FeatureCollection = await pointsService.view(id);            
            if (JSON.stringify(data.features[0]) !== JSON.stringify(req.body.geojson.features[0])) {
                try {
                    const novo: Number = await pointsService.update(id, name, geom);
                    return res.status(200).json({updated_id: novo});
                } catch (err) { 
                    return res.status(500).json({
                        message: 'Controller Error: failed access to database',
                        err: err,
                    });
                }
            } else {
                return res.status(400).json({
                    err: 'Update failed: Os dois geojsons são iguais.',
                });
            }
        } catch (err) {            
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err});
        }
    },
    delete : async (req: Request, res: Response): Promise<Response> => {
        console.log('Points Controller: Delete');
        const {id} = req.body;
        try {
            pointsService.delete(id);
            return res.status(204).json({});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    // determinar a distancia entre dois lugares (pontos)
    getDistance: async (req: Request, res: Response): Promise<Response> => {
        console.log('Points Controller: Distance Between');
        const id1: Number = Number(req.body.id1);
        const id2: Number = Number(req.body.id2);
        try {
            const data = await pointsService.getDistance(id1, id2);            
            if (!data) return res.status(400).json({'message': 'non-existent id'});
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    // verificar se um lugar(ponto) esta em uma área(poligono)
    isIn: async (req: Request, res: Response): Promise<Response> => {
        console.log('Points Controller: Point in Polygon?');
        const {idPoint, idPolygon} = req.body;
        try {
            const data = await pointsService.isIn(idPoint as Number, idPolygon as Number);
            if (!data) return res.status(400).json({'message': 'O lugar não esta na área ou não existe'});
            return res.status(200).json({'message': 'O lugar esta na área'});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
}

export default pointsController;