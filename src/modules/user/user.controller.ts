import { Request, Response } from 'express';
import { UserService } from './user.service';
import { inject, injectable } from 'inversify';
import { User } from './user.entity';
import { ApiResponse, ICustomResponse } from '../../api/response';

@injectable()
export class UserController {
    private _userService: UserService;

    constructor(@inject(UserService) private readonly userService: UserService) {
        this._userService = this.userService;
    }

    public async getAll(req: Request, res: Response) {
        ApiResponse(<ICustomResponse<User[]>>{
            res,
            data: await this._userService.getAll(),
        });
    }

    public async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        ApiResponse(<ICustomResponse<User>>{
            res,
            data: await this._userService.getById(id),
        });
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
