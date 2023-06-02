import { Request, Response } from 'express';
import { UserService } from './user.service';
import { inject, injectable } from 'inversify';

@injectable()
export class UserController {
    private _userService: UserService;
    
    constructor(@inject(UserService) private readonly userService: UserService) {
        this._userService = this.userService;
    }

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
