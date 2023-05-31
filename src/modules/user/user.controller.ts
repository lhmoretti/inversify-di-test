import { Request, Response } from 'express';
import { UserService } from './user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';

@injectable()
export class UserController {
    constructor(private readonly _userService: UserService) {}

    public async getAll(req: Request, res: Response) {
        this._userService.getAll();
    }

    public async getById(req: Request, res: Response) {
        this._userService.getById(req.body.id);
    }

    public async create(req: Request, res: Response) {
        throw new Error('Method not implemented.');
    }

    public async update(req: Request, res: Response) {
        throw new Error('Method not implemented.');
    }

    public async updatePassword(req: Request, res: Response) {
        throw new Error('Method not implemented.');
    }

    public async delete(req: Request, res: Response) {
        throw new Error('Method not implemented.');
    }
}
