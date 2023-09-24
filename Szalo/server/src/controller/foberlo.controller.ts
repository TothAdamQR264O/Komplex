import { AppDataSource } from "../data-source";
import { Foberlo } from "../entity/Foberlo";
import { Controller } from "./base.controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export class FoberloController extends Controller{
    repository = AppDataSource.getRepository(Foberlo);

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
    
            //const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME });
            res.json({ accessToken: token });
        } catch (err) {
            this.handleError(res, err);
        }
    };
}