import { RequestHandler, Response, Request, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtChecker: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware: Checando token');
    try {
        const jwtdata = jwt.verify(
            req.cookies.session,
            process.env.JWT_THE_SECRET as Secret,
        );
        req.body.user = jwtdata;
        next();
    } catch (err) {
        res.status(401).json({message: 'Acesso não autorizado.'});
    }
};

export default jwtChecker;