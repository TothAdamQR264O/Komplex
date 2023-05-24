import { AppDataSource } from "../data-source";
import { Foberlo } from "../entity/Foberlo";
import { Controller } from "./base.controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
                select: [ 'szemszamfb', 'password' ]
            });
    
            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const token = jwt.sign({ id: user.szamlaszamfb }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token });
        } catch (err) {
            this.handleError(res, err);
        }
    };
}