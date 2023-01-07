import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../data/user';
import { public_key } from "./key";

dotenv.config();

export const verifyToken = async (req, res, next) => {
    const authToken = req.get('Authorization');
    if (!authToken) {
        req.isAuth = false;
        return next();
    }
    const token = authToken.split(' ')[1];
    let verify;
    try {
        verify = jwt.verify(token, public_key);
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if (!verify._id) {
        req.isAuth = false;
        return next();
    }
    const user = await UserModel.findById(verify._id);
    if (!user) {
        req.isAuth = false;
        return next();
    }
    req.userId = user._id;
    req.login = user.login;
    req.userType = user.type;
    req.isAuth = true;
    next();
}