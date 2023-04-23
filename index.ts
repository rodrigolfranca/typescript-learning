import express from "express";
import bodyParser from 'body-parser';
import pointsRouter from "./src/routers/pointsRouter";
import polygonsRouter from "./src/routers/polygonsRouter";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/points', pointsRouter);
app.use('/polygons', polygonsRouter);

app.listen(3000, () => {
    console.log("Server listening on 3000");
});
