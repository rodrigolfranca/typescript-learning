import pool from "../database/connection";
import { FeatureCollection, PointsGeometry } from "../modules/interfaces";

type listService = () => Promise<FeatureCollection>
type viewService = (id: Number) => Promise<FeatureCollection>
type createService = (name: String, geom: PointsGeometry) => Promise<Number>
type updateService = (id: Number, name: String, geom: PointsGeometry) => Promise<Number>
type deleteService = (id: Number) => void
type getDistanceService = (id1: Number, id2: Number) => Promise<Number>
type isInService = (idPoint: Number, idPolygon: Number) => Promise<Boolean>

interface PointsService {
    list: listService,
    view: viewService,
    create: createService,
    update: updateService,
    delete: deleteService,
    getDistance: getDistanceService,
    isIn: isInService,
}

const pointsService: PointsService = {
    list : async (): Promise<FeatureCollection> => {
        console.log('Points Service: Selecting All');
        const query = `
        SELECT
        json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(
                json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(geom)::json,
                    'properties', json_build_object(
                        'id', id,
                        'name', name                        
                    )
                )
            )
        ) AS geojson
        FROM points`;
        try {
            const data = await pool.query(query);            
            return data.rows[0].geojson as FeatureCollection;;
        } catch (err) {
            throw err;
        }
    },
    view : async (id: Number): Promise<FeatureCollection> => {
        console.log('Points Service: Selecting one');
        const query = `
        SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(
                json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(geom)::json,
                    'properties', json_build_object('name', name)
                )
            )
        ) as geojson FROM points WHERE id=$1;`;
        const values = [id];
        try {
            const data = await pool.query(query, values);            
            return data.rows[0].geojson as FeatureCollection;
        } catch (err) {
            throw err;
        }
    },
    create : async (name: String, geom: PointsGeometry): Promise<Number> => {
        console.log('Points Service: Posting One');
        const query = `
        INSERT INTO points (name, geom)
        VALUES ($1, ST_GeomFromGeoJSON($2))
        RETURNING id;`;
        const values = [name, geom];
        try {
            const data = await pool.query(query, values);
            return data.rows[0].id as Number;
        } catch (err) {
            throw err;
        }
    },
    update : async (id: Number, name: String, geom: PointsGeometry): Promise<Number> => {
        console.log('Points Service: Updating One');
        const query = `
        UPDATE points
        SET name = $1, geom = ST_GeomFromGeoJSON($2)
        WHERE id = $3
        RETURNING id;`;
        const values = [name, geom, id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0].id as Number;
        } catch (err) {
            throw err;
        }
    },
    delete : async (id: Number) => {
        console.log('Points Service: Deleting One');
        const query = `
        DELETE FROM points
        WHERE id = $1;`;        
        const values = [id];
        try {
            await pool.query(query, values);
        } catch (err) {
            throw err;
        }
    },
    getDistance : async (id1: Number, id2: Number): Promise<Number>  => {
        console.log('Points Service: Selecting Distance');
        const query = `
        SELECT ST_DISTANCE(
            ST_Transform(p1.geom, 2163),
            ST_Transform(p2.geom, 2163))
        AS distance_in_meters
        FROM points p1, points p2
        WHERE p1.id = $1 AND p2.id = $2;`;
        const values = [id1, id2];
        try {
            const data = await pool.query(query, values);
            return data.rows[0].distance_in_meters;
        } catch (err) {
            throw err;
        }
    },
    isIn: async (idPoint: Number, idPolygon: Number): Promise<Boolean> => {
        console.log('Service: point in polygon');
        const query = `
        SELECT ST_Contains(polygon.geom, point.geom)
        FROM points point, polygons polygon
        WHERE point.id=$1 AND polygon.id=$2;`;
        const values = [idPoint, idPolygon];
        try {
            const data = await pool.query(query, values);
            return data.rows[0].ST_Contains;
        } catch (err) {
            throw err;
        }
    },
}

export default pointsService;