import { Injectable } from "@nestjs/common";
import { AppConfig } from "src/core/config";
import { IGenerateAccessTokenServiceInput, IGenerateTokenServiceOutput, IGenerateRefreshTokenServiceInput } from "../interfaces/user.auth.service.interface";
import { UserToken } from "src/schemas/user.token.schema";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { UserTokenTypeEnum } from "src/enums/user.token.schema.enum";
import { calculateExpirationDate } from "src/utils/user.utils";

@Injectable()
export class UserAuthInternalService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(UserToken.name)
        private readonly userTokenModel: Model<UserToken>
    ) {}

    generateAccessToken(
        payload: IGenerateAccessTokenServiceInput
    ): IGenerateTokenServiceOutput {
        const config = AppConfig.getTokenConfig();
        const token = this.jwtService.sign(
            {
                ...payload,
                exp:
                    payload.exp ??
                    new Date(
                        calculateExpirationDate(config.accessTokenExpiresIn)
                    ).getTime() / 1000,
            },
            {
                secret: config.accessTokenSecret,
            }
        );
        return {
            token: token,
            expiresAt: new Date(
                calculateExpirationDate(config.accessTokenExpiresIn)
            ),
        };
    }

    async generateRefreshToken(
        payload: IGenerateRefreshTokenServiceInput
    ): Promise<IGenerateTokenServiceOutput> {
        const config = AppConfig.getTokenConfig();
        const token = this.jwtService.sign(payload, {
            expiresIn: config.refreshTokenExpiresIn,
            secret: config.refreshTokenSecret,
        });

        const expiredAt = calculateExpirationDate(config.refreshTokenExpiresIn);
        //save the refresh token in db
        const newToken = new this.userTokenModel({
            user: payload.sub,
            token,
            type: UserTokenTypeEnum.REFRESH,
            expiredAt,
        });
        await newToken.save();
        return { token, expiresAt: new Date(expiredAt) };
    }
}