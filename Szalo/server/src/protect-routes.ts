import { expressjwt } from "express-jwt";
require('dotenv').config()

export const checkUser = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"]
});

export const handleAuthorizationError = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};