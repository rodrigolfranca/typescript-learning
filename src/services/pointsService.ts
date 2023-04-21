import pool from "../database/connection";
import { PointsFeatureCollection, PointsFeatures, PointsGeometry } from "../modules/interfaces";

interface PointsService {
    list: Function,
    view: Function,
    update: Function,
    delete: Function,
}

const pointsService: PointsService = {
    list : (): Object => {
        return {message: "TODO"}
    },
    view : (id: Number): Object => {
        return {message: "TODO"}
    },
    update : (id: Number, geojson: Object): Object => {
        return {message: "TODO"}
    },
    delete : (id: Number): Object => {
        return {message: "TODO"}
    },
}

export default pointsService;