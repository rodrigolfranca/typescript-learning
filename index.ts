import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import pointsRouter from "./src/routers/pointsRouter";
import polygonsRouter from "./src/routers/polygonsRouter";
import searchRouter from "./src/routers/searchRouter";
import userRouter from "./src/routers/userRouter";
import cors from 'cors'

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors(({origin: true, credentials: true})));

app.use('/points', pointsRouter);
app.use('/polygons', polygonsRouter);
app.use('/search', searchRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log("Server listening on 3000");
});
