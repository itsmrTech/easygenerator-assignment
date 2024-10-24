import { Types } from "mongoose";
import { IUser } from "./user.object.interface";

export interface IGetUserByEmailServiceInput {
    email: string;
}

export interface IGetUserByEmailServiceOutput {
    user: IUser;
}

export interface IDoesUserExistServiceInput {
    email?: string;
    phone?: string;
}
export interface IDoesUserExistServiceOutput {
    exists: boolean;
}

export interface IGetUserByIdServiceInput {
    id: Types.ObjectId;
}

export interface IGetUserByIdServiceOutput {
    user: IUser;
}

