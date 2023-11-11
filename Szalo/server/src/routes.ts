import express from 'express';
import { BerloController } from './controller/Berlo.controller';
import { FoberloController } from './controller/foberlo.controller';
import { HazController } from './controller/haz.controller';
import { checkUser, csakBerlo, csakTulaj } from './protect-routes';
import { JelentkezesController } from './controller/jelentkezes.controller';
import { SzerzodesController } from './controller/szerzodes.controller';
import { EsemenyController } from './controller/esemeny.controller';
import { HaviosszesitoController } from './controller/haviosszesito.controller';
import { SzamlaController } from './controller/szamla.controller';

export function getRoutes() {
    const router = express.Router();

    const hazController = new HazController();

    router.get('/home', checkUser, hazController.getAll);
    router.get('/home/search', checkUser, hazController.getAd);
    router.get('/home/:id', hazController.getOne);
    router.post('/home', checkUser, csakTulaj, hazController.create);
    router.put('/home', checkUser, csakTulaj, hazController.update);
    router.delete('/home/:id', checkUser, csakTulaj, hazController.delete);

    const foberloController = new FoberloController();

    router.get('/foberlo', foberloController.getAll);
    router.get('/foberlo/:id', foberloController.getOne);
    router.get('/foberlo/:email', foberloController.getOneOnEmil);
    router.post('/foberlo', foberloController.create);
    router.put('/foberlo', checkUser, csakTulaj, foberloController.update);
    router.delete('/foberlo/:id', checkUser, csakTulaj, foberloController.delete);
    router.post('/foberlo/login', foberloController.login);

    const berloController = new BerloController();

    router.get('/berlo', berloController.getAll);
    router.get('/berlo/:id', berloController.getOne);
    router.post('/berlo', berloController.create);
    router.put('/berlo', checkUser, csakBerlo, berloController.update);
    router.delete('/berlo/:id', checkUser, csakBerlo, berloController.delete);
    router.post('/berlo/login', berloController.login);

    const jelentkezesController = new JelentkezesController();

    router.post('/jelentkez/:hazId', checkUser, csakBerlo, jelentkezesController.create);
    router.get('/jelentkez/:hazId', checkUser, jelentkezesController.getAll);
    router.get('/jelentkez/:id', checkUser, jelentkezesController.getOne);

    const szerzodesController = new SzerzodesController();

    router.post('/szerzodes', checkUser, csakTulaj, szerzodesController.create);
    router.get('/szerzodes', checkUser, szerzodesController.getAll);
    router.get('/szerzodes/sajat', checkUser, szerzodesController.getTulaj);
    router.get('/szerzodes/:id', checkUser, szerzodesController.getOne);
    router.get('/lak', checkUser, szerzodesController.getBerlo);
    router.put('/szerzodes/:id/zaras', checkUser, csakTulaj, szerzodesController.zaras);
    
    const esemenyController = new EsemenyController();

    router.post('/esemeny', checkUser, esemenyController.create);
    router.get('/esemeny/osszes/:szerzodesId', checkUser, esemenyController.getAll);
    router.get('/esemeny/:id', checkUser, esemenyController.getOne);
    router.get('/lak', checkUser, csakBerlo, esemenyController.getBerlo);
    router.put('/esemeny', checkUser, csakTulaj, esemenyController.update);

    const haviosszController = new HaviosszesitoController();

    router.get('/osszesito/szerzodes/:szerzodesId', checkUser, haviosszController.getAll);
    router.get('/osszesito/szerzodes/:szerzodesId/lehetosegek', checkUser, haviosszController.getLehetosegek);
    router.get('/osszesito/:id', checkUser, haviosszController.getOne);
    router.put('/osszesito/:id/fizetve', checkUser, csakTulaj, haviosszController.fizetve);
    router.post('/osszesito/:szerzodesId/:evszam/:honapszam', checkUser, csakTulaj, haviosszController.create);

    const szamlaController = new SzamlaController();

    router.get('/szamla/:id', checkUser, szamlaController.getOne);
    router.get('/szamla/integracio/statusz', checkUser, szamlaController.integracioLetezik);
    router.post('/szamla/integracio', checkUser, csakTulaj, szamlaController.integracioLetrehozas);

    return router;
}