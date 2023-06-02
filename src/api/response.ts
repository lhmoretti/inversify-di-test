import { Request, Response } from 'express';
import { Config } from '../bin/config';

export const STATUS_OK = 'OK';
export const STATUS_FAILED = 'FAILED';

const conf: Config = new Config();
const isDevEnv: boolean = conf.nodeEnv === 'DEV' ? true : false;

export interface ICustomResponse {
    req?: Request;
    res: Response;
    ok?: boolean;
    data?: any;
    status?: string;
    count?: number;
    error?: any;
    code?: number;
    message?: string;
    internalMessage?: string;
    path?: string;
    method?: string;
}

/**
 * Custom response to normalize all Responses.
 * @param {ICustomResponse} arg
 * @returns {Response} a CustomResponse object.
 */
export const ApiResponse = ({
    res,
    ok = true,
    status = STATUS_OK,
    code = 200,
    data = [],
    error = null,
    count = 0,
}: ICustomResponse): Response => {
    if (error) {
        ok = false;
        status = STATUS_FAILED;
        return res.status(code).json({
            ok: false,
            error: error ? isDevEnv && error : error.message,
            status,
            code: parseInt(code || error?.status),
            message: error?.sqlMessage,
            internalMessage: error?.message,
        });
    }

    // chequeamos que sea un array, sino, lo convertimos en uno
    if (!Array.isArray(data)) data = [data];
    if (typeof count !== 'number') count = parseInt(count);

    return res.status(code).json({
        ok,
        data,
        status,
        count: count || 0,
    });
};

export const HandleDatabaseError = (status, message, code) => {
    return;
};
