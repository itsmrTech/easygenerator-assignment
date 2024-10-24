import { Types } from "mongoose";

export interface IUser {
    id: Types.ObjectId;
    email: string;
    phone: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    blocked: boolean;
}