import express from 'express';
import { BerloController } from './controller/Berlo.controller';
import { FoberloController } from './controller/foberlo.controller';
import { HazController } from './controller/haz.controller';
import { checkUser } from './protect-routes';

export function getRoutes() {
    const router = express.Router();

    const hazController = new HazController();

    router.get('/home', checkUser, hazController.getAll);
    router.get('/home/:id', hazController.getOne);
    router.post('/home', checkUser, hazController.create);
    router.put('/home', checkUser, hazController.update);
    router.delete('/home/:id', checkUser, hazController.delete);

    const foberloController = new FoberloController();

    router.get('/foberlo', foberloController.getAll);
    router.get('/foberlo/:id', foberloController.getOne);
    router.get('/foberlo/:email', foberloController.getOneOnEmil);
    router.post('/foberlo', foberloController.create);
    router.put('/foberlo', checkUser, foberloController.update);
    router.delete('/foberlo/:id', checkUser, foberloController.delete);
    router.post('/foberlo/login', foberloController.login);

    const berloController = new BerloController();

    router.get('/berlo', berloController.getAll);
    router.get('/berlo/:id', berloController.getOne);
    router.post('/berlo', berloController.create);
    router.put('/berlo', checkUser, berloController.update);
    router.delete('/berlo/:id', checkUser, berloController.delete);
    router.post('/berlo/login', berloController.login);

    return router;
}