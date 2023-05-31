import express from 'express';
import { ApiResponse } from '../api/response';

/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 */
export const catchErrors =
    (action: Function) =>
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await action(req, res);
        } catch (error) {
            console.log(`################################`);
            console.log(`# `, error);
            ApiResponse({ res, error, code: error.status || 500 });
        }
    };
/**
 * Show useful information to client in development.
 */
export const devErrorHandler = (err, req, res, next) => {
    console.log('devErrorHandler: ', err);
    err.stack = err.stack || '';
    const status = err.status || 500;
    const error = { message: err.message };
    ApiResponse({ res, error, code: status });
};
