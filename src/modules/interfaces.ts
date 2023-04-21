interface PointsFeatureCollection {
    type: String,
    features: Array<PointsFeatures>,
}

interface PointsFeatures {
    type: String,
    properties: Object,
    geometry: PointsGeometry,
}

interface PointsGeometry {
    coordinates: Array<Number>,
    type: "Point"
}

export { PointsFeatureCollection, PointsFeatures, PointsGeometry }