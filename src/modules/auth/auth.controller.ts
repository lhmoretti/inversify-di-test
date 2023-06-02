import { Request, Response } from 'express';
import { Config } from '../../bin/config';
const config: Config = new Config();
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiResponse } from '../../api/response';
import { USUARIO } from '../../helpers/roles';
import { User } from '../user/user.entity';

export class AuthController {
    constructor() {}

    public async login(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const phone = req.body.phone;
        let user: User = <User>{};

        if (email) user = (await User.findByEmail(email)) as User;
        if (phone) user = (await User.findByTelefono(phone)) as User;
        if (username) user = (await User.findByUsername(username)) as User;

        if (!user)
            return ApiResponse({
                res,
                error: {
                    isLogged: false,
                    token: null,
                    error: 'No existe.',
                },
            });

        if (user.role.role === USUARIO)
            return ApiResponse({
                res,
                error: {
                    isLogged: false,
                    token: null,
                    error: 'Permiso denegado.',
                },
            });

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return ApiResponse({
                res,
                error: {
                    isLogged: false,
                    token: null,
                    error: 'Datos incorrectos.',
                },
            });
        }

        const userForToken: User = <User>{
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            active: user.active,
            role: user.role,
        };

        const token: string = jwt.sign(userForToken, String(config.pkey), {
            expiresIn: config.jwtExp,
        });

        ApiResponse({
            res,
            data: {
                isLogged: true,
                token,
                expiresIn: config.jwtExp,
            },
        });
    }

    public async register(req: Request, res: Response) {
        await this.registerUser(req);

        ApiResponse({
            res,
            data: {
                isLogged: true,
                // token,
                expiresIn: config.jwtExp,
            },
        });
    }

    public async registerUser(req: Request) {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const phone = req.body.phone;
        let user: User = <User>{};

        if (email) user = (await User.findByEmail(email)) as User;
        if (phone) user = (await User.findByTelefono(phone)) as User;
        if (username) user = (await User.findByUsername(username)) as User;
    }
}
