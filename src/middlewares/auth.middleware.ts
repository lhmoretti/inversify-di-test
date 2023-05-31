import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ApiResponse } from '../api/response';
import { User } from '../modules/user/user.entity';

const checkRole = (decoded: User, requiredRoles: string[], next: NextFunction) => {
    if (requiredRoles.some((rr) => decoded.role.role === rr)) next();
};

export function isAllowed(requiredRoles: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        return next();
        const authString = req.headers['authorization'] ?? '';

        if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
            const authArray = authString.split(' ');
            const token = authArray[1];
            jwt.verify(token, String(process.env.PKEY), async (err, decoded: any) => {
                if (err)
                    return ApiResponse({
                        res,
                        error: 'Token no válido: No tiene autorización para este recurso',
                    });

                checkRole(decoded, requiredRoles, next);
            });
        } else {
            return ApiResponse({ res, error: 'Token no válido.' });
        }
    };
}
