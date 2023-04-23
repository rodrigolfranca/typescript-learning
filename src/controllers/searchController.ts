import { RequestHandler, Response, Request } from "express";
import searchService from '../services/searchService';

interface SearchController {
    findEntities: RequestHandler,
};

const searchController: SearchController = {
    // encontra lugares e areas dentro de um circulo, dado a latitude e longuitude de seu centro e raio
    findEntities: async (req: Request, res: Response): Promise<Response> => {
        console.log('Search Controller: List');        
        const {lat, lon, radius} = req.body;
        try {
            const data = await searchService.checkCircle(lat as Number, lon as Number, radius as Number);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
};

export default searchController;