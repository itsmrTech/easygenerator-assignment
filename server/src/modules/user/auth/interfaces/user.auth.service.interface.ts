import { ObjectId, Types } from 'mongoose';
import { IJWTToken } from 'src/core/interfaces';

export interface ISignUpUserServiceInput {
    name: string;
    email: string;
    password: string;
}

export interface ISignUpUserServiceOutput {
    user: {
        id: Types.ObjectId;
        email: string;
        name: string;
    };
    token: {
        accessToken: {
            token: string;
            expiresAt: Date;
        };
        refreshToken: {
            token: string;
            expiresAt: Date;
        };
    };
}

export type IGenerateAccessTokenServiceInput = IJWTToken;
export type IGenerateRefreshTokenServiceInput = IJWTToken;

export interface IGenerateTokenServiceOutput {
    token: string;
    expiresAt: Date;
}

export interface IRegisterUserBasicInfoServiceInput {
    userId: Types.ObjectId;
    user:{
        firstName: string;
        lastName: string;
    },

}

export interface IRegisterUserBasicInfoServiceOutput {
    done: boolean;
}

export interface ILoginUserServiceInput {
    email: string;
    password: string;
}

export interface ILoginUserServiceOutput {
    user: {
        id: Types.ObjectId;
        email: string;
        phone: string;
    };
    token: {
        accessToken: {
            token: string;
            expiresAt: Date;
        };
        refreshToken: {
            token: string;
            expiresAt: Date;
        };
    };
}