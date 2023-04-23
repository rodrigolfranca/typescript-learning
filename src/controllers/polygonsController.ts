import { Request, Response, RequestHandler } from "express";
import { FeatureCollection, PolygonsGeometry } from "../modules/interfaces";
import polygonsService from "../services/polygonsService";

interface PolygonsController {
    list: RequestHandler,
    view: RequestHandler,
    create: RequestHandler,
    update: RequestHandler,
    delete: RequestHandler,
}

const polygonsController: PolygonsController = {
    list : async (req: Request, res: Response): Promise<Response> => {
        console.log("Polygons Controller: List")
        try {
            const data: FeatureCollection = await polygonsService.list();
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    view : async (req: Request, res: Response): Promise<Response> => {
        console.log("Polygons Controller: View");
        const id: Number = Number(req.params.id);
        try {
            const data: FeatureCollection = await polygonsService.view(id)
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500)
        }        
    },
    create: async (req, res) => {
        console.log('Polygons Controller: Create');
        const name: String = req.body.geojson.features[0].properties.name;
        const geom: PolygonsGeometry = req.body.geojson.features[0].geometry;
        try {
            const id: Number = await polygonsService.create(name, geom);
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
        const geom: PolygonsGeometry = req.body.geojson.features[0].geometry;
        try {
            const data: FeatureCollection = await polygonsService.view(id);            
            if (JSON.stringify(data.features[0]) !== JSON.stringify(req.body.geojson.features[0])) {
                try {
                    const novo: Number = await polygonsService.update(id, name, geom);
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
            polygonsService.delete(id);
            return res.status(204).json({});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
}

export default polygonsController;