import { expressjwt } from "express-jwt";

export const checkUser = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"]
});

export const csakBerlo = (req, res, next) => {
    const szerepkor = req.auth.szerep;

    if (szerepkor != 'berlo') {
        const err = new Error('A megadott funkció nem érhető el tulajdonosként.');
        err.name = 'RoleMismatchError';
        next(err);
        return;
    }

    next(null, req, res, next);
}

export const csakTulaj = (req, res, next) => {
    const szerepkor = req.auth.szerep;

    if (szerepkor != 'tulaj') {
        const err = new Error('A megadott funkció nem érhető el bérlőként.');
        err.name = 'RoleMismatchError';
        next(err);
        return;
    }

    next(null, req, res, next);
}

export const handleAuthorizationError = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};

export const handleRoleMismatchError = (err, req, res, next) => {
    if (err.name === "RoleMismatchError") {
        res.status(403).send({ error: err.message });
    } else {
        next(err);
    }
};