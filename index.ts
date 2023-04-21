import express from "express";
import pointsRouter from "./src/routers/pointsRouter";
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/points', pointsRouter);

app.listen(3000, () => {
    console.log("Server listening on 3000");
});
