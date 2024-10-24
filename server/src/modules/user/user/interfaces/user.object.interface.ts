import { Types } from "mongoose";

export interface IUser {
    id: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}