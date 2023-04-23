import pool from '../database/connection'

type CheckCircle = (lat: Number, lng: Number, radius: Number) => Promise<Array<Object>>

interface SearchService{
    checkCircle: CheckCircle;
}

const searchService: SearchService = {
    checkCircle:  async (lat: Number, lng: Number, radius: Number): Promise<Array<Object>> => {
        console.log('Service: Checando Círculo');
        const query = `
        SELECT id, name, ST_AsGeoJSON(geom)::json as geom
        FROM points
        WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3)

        UNION ALL

        SELECT id, name, ST_AsGeoJSON(geom)::json as geom
        FROM polygons
        WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3);`;
        const values = [lat, lng, radius];
        try {
            const data = await pool.query(query, values);
            return data.rows as Array<Object>;
        } catch (err) {
            throw err;
        }
    },
}

export default searchService