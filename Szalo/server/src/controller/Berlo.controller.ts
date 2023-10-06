import { AppDataSource } from "../data-source";
import { Berlo } from "../entity/Berlo";
import { Controller } from "./base.controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config()

export class BerloController extends Controller{
    repository = AppDataSource.getRepository(Berlo);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);

            entity.password = await bcrypt.hash(entity.password, 12);

            const result = await this.repository.save(entity);
            delete result.password;
            
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { email: req.body.email },
                select: [ 'id', 'password' ]
            });
    
            if (!user) {
                return this.handleError(res, null, 401, 'Helytelen email.');
            }
    
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Helytelen jelszó.');
            }
    
           const token = jwt.sign({ id: user.id, szerep: "berlo"  }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME });
            res.json({ accessToken: token, role: "berlo"  });
        } catch (err) {
            this.handleError(res, err);
        }
    };
}