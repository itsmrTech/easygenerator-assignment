import { Schema, Types } from 'mongoose';
import { LanguageListEnum, PreHookEnum, RoleEnum, TokenAudienceEnum, TokenIssuerEnum } from './enums';
import { HttpStatus } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { UserDocument } from 'src/schemas/user.schema';

export interface ISetPreHooks {
    preHook: PreHookEnum;
    schema: Schema<any, any>;
}

export interface IGenRespUtilInput {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message?: string;
    code?: string;
    responseName?: string;
    statusCode: HttpStatus;
    i18n?: I18nService;
    language?: LanguageListEnum;
    additionalData?: object;
    mock?: true;
    dto?: any;
}

export interface IGeneralResponse {
    message: string;
    code: string;
    statusCode: HttpStatus;
    _mock?: boolean;
}

export interface IGenRespUtilOutput extends IGeneralResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

export interface IJWTToken {
    sub: Types.ObjectId;
    role: RoleEnum;
    exp?: number;
    iat: number;
    iss: TokenIssuerEnum;
    aud: TokenAudienceEnum;
}

export interface ILoggedInUserRequest extends Request {
    user: UserDocument;
}

export interface IReportMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}