import express from 'express';
import { HazController } from './controller/haz.controller';
import { ProductController } from './controller/product.controller';
import { UserController } from './controller/user.controller';

export function getRoutes() {
    const router = express.Router();

    const hazController = new HazController();

    router.get('/home', hazController.getAll);
    router.get('/home/:id', hazController.getOne);
    router.post('/home', hazController.create);
    router.put('/home', hazController.update);
    router.delete('/home/:id', hazController.delete);

    const productController = new ProductController();

    router.get('/products', productController.getAll);
    router.get('/products/:id', productController.getOne);
    router.post('/products', productController.create);
    router.put('/products', productController.update);
    router.delete('/products/:id', productController.delete);

    const userController = new UserController();

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.delete);

    return router;
}