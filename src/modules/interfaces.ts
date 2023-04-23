interface FeatureCollection {
    type: String,
    features: Array<Features>,
};

interface Features {
    type: String,
    properties: Properties,
    geometry: PointsGeometry | PolygonsGeometry,
};

interface Properties {
    name: String,
    id?: Number,
};

interface PointsGeometry {
    coordinates: Array<Number>,
    type: "Point",
};

interface PolygonsGeometry {    
    coordinates: Array<Array<Array<Number>>>,
    type: "Polygon",
};

interface User {
    email: String,
    name: String,
    password?: String,
    is_admin?: Boolean,
};

export { FeatureCollection, Features, PointsGeometry, PolygonsGeometry, User };