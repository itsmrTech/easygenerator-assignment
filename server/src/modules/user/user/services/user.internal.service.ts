import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import {
    IDoesUserExistServiceInput,
    IDoesUserExistServiceOutput,
    IGetUserByEmailServiceInput,
    IGetUserByEmailServiceOutput,
    IGetUserByIdServiceInput,
    IGetUserByIdServiceOutput,
} from '../interfaces/user.service.interface';

@Injectable()
export class UserInternalService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}


   
}
