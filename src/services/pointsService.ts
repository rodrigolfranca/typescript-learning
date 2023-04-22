import pool from "../database/connection";
import { FeatureCollection, PointsGeometry } from "../modules/interfaces";

type listService = () => Promise<FeatureCollection>
type viewService = (id: Number) => Promise<FeatureCollection>
type createService = (name: String, geom: PointsGeometry) => Promise<Number>
type updateService = (id: Number, name: String, geom: PointsGeometry) => Promise<FeatureCollection>
type deleteService = (id: Number) => void

interface PointsService {
    list: listService,
    view: viewService,
    create: createService,
    update: updateService,
    delete: deleteService,
}

const pointsService: PointsService = {
    list : async (): Promise<FeatureCollection> => {
        console.log('Service: Selecting All');
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
            return data.rows[0] as FeatureCollection;;
        } catch (err) {
            throw err;
        }
    },
    view : async (id: Number): Promise<FeatureCollection> => {
        console.log('Service: Selecting one');
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
            return data.rows[0] as FeatureCollection;
        } catch (err) {
            throw err;
        }
    },
    create : async (name: String, geom: PointsGeometry): Promise<Number> => {
        console.log('Service: Posting One');
        const query = `
        INSERT INTO points (name, geom)
        VALUES ($1, ST_GeomFromGeoJSON($2))
        RETURNING id;`;
        const values = [name, geom];
        try {
            const data = await pool.query(query, values);
            return data.rows[0] as Number;
        } catch (err) {
            throw err;
        }
    },
    update : async (id: Number, name: String, geom: PointsGeometry): Promise<FeatureCollection> => {
        console.log('Service: Updating One');
        const query = `
        UPDATE points
        SET name = $1, geom = ST_GeomFromGeoJSON($2)
        WHERE id = $3
        RETURNING id;`;
        const values = [name, geom, id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0] as FeatureCollection;
        } catch (err) {
            throw err;
        }
    },
    delete : async (id: Number) => {
        console.log('Service: Deleting One');
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
}

export default pointsService;