import { RequestHandler, Response, Request } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import userService from '../services/userService';
import { User } from "../modules/interfaces";

interface UserController {
    login: RequestHandler,
};

const userController: UserController = {    
    login: async (req: Request, res: Response): Promise<Response> => {
        console.log('User Controller: Login');
        const {email, password} = req.body;
        try {
            const user: User = await userService.getUserByEmail(email);
            if (user.password === password) {
                delete user.password;
                const token: String = jwt.sign(user, process.env.JWT_THE_SECRET as Secret);
                res.cookie('session', token, {
                    // TODO change to secure: true in production
                    secure: false,
                    sameSite: true,
                    httpOnly: false,
                });
                return res.status(200).json({'message': 'Logged in'});
            } else {
                return res.status(400).json({'message': 'Wrong Password'});
            }
        } catch (err) {
            return res.status(400).json({message: 'Wrong E-mail'});
        }
    },
};

export default userController;