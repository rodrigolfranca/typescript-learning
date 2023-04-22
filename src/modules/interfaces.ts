interface FeatureCollection {
    type: String,
    features: Array<Features>,
}

interface Features {
    type: String,
    properties: Object,
    geometry: PointsGeometry | PolygonGeometry,
}

interface PointsGeometry {
    coordinates: Array<Number>,
    type: "Point"
}

interface PolygonGeometry {
    coordinates: Array<Array<Array<Number>>>
    type: "Polygon"
}

export { FeatureCollection, Features, PointsGeometry, PolygonGeometry }