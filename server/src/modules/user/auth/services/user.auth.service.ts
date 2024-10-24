import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserAuthModule } from '../user.auth.module';
import {
    IGenerateAccessTokenServiceInput,
    IGenerateTokenServiceOutput,
    ILoginUserServiceInput,
    ILoginUserServiceOutput,
    IRegisterUserBasicInfoServiceInput,
    IRegisterUserBasicInfoServiceOutput,
    ISignUpUserServiceInput,
    ISignUpUserServiceOutput,
} from '../interfaces/user.auth.service.interface';
import { UserInternalService } from '../../user/services/user.internal.service';
import { UserCredentials } from 'src/schemas/user.credentials.schema';
import { UserTokenTypeEnum } from 'src/enums/user.token.schema.enum';
import { RoleEnum, TokenAudienceEnum, TokenIssuerEnum } from 'src/core/enums';
import { DateTime } from 'luxon';

@Injectable()
export class UserAuthService {
    constructor(
        private configService: ConfigService,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(UserCredentials.name)
        private readonly userCredentialsModel: Model<UserCredentials>,
        private readonly userInternalService: UserInternalService
    ) {}

    // MOCK
    async signUpUser(
        input: ISignUpUserServiceInput
    ): Promise<ISignUpUserServiceOutput> {
        /* DEV NOTES:
        1. Check if user with same email exists. If yes, throw error.
        2. Create user.
        3. Create user credentials.
        4. Generate access token.
        5. Generate and save refresh token.
        6. Return response.
        */

        return {
            user: {
                id: new Types.ObjectId(),
                email: input.email,
                name: input.name,
            },
            token: {
                accessToken: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5b3V0dWJlciIsImF1ZCI6IndlYiIsImlhdCI6MTYyMzIwNzQwMCwiaXNzIjoiV0VCIiwicm9sZSI6IlVTRVIifQ.',
                    expiresAt: DateTime.now().plus({ days: 1 }).toJSDate(),
                },
                refreshToken: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5b3V0dWJlciIsImF1ZCI6IndlYiIsImlhdCI6MTYyMzIwNzQwMCwiaXNzIjoiV0VCIiwicm9sZSI6IlVTRVIifQ.',
                    expiresAt: DateTime.now().plus({ days: 30 }).toJSDate(),
                },
            },
        };
    }

    // MOCK
    async loginUser(
        input: ILoginUserServiceInput
    ): Promise<ILoginUserServiceOutput> {
        /* DEV NOTES:
        1. Check if user exists. If not, throw error.
        2. Check if password is correct. If not, throw error.
        3. Generate access token.
        4. Generate and save refresh token.
        5. Return response.
        */

        return {
            user: {
                id: new Types.ObjectId(),
                email: 'john.doe@gmail.com',
                phone: '+1234567890',
            },
            token: {
                accessToken: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5b3V0dWJlciIsImF1ZCI6IndlYiIsImlhdCI6MTYyMzIwNzQwMCwiaXNzIjoiV0VCIiwicm9sZSI6IlVTRVIifQ.',
                    expiresAt: DateTime.now().plus({ days: 1 }).toJSDate(),
                },
                refreshToken: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5b3V0dWJlciIsImF1ZCI6IndlYiIsImlhdCI6MTYyMzIwNzQwMCwiaXNzIjoiV0VCIiwicm9sZSI6IlVTRVIifQ.',
                    expiresAt: DateTime.now().plus({ days: 30 }).toJSDate(),
                },
            },
        };
    }

    async generateAccessToken(
        input: IGenerateAccessTokenServiceInput
    ): Promise<IGenerateTokenServiceOutput> {
        /* DEV NOTES:
        1. Generate access token.
        2. Return response.
        */
        return {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5b3V0dWJlciIsImF1ZCI6IndlYiIsImlhdCI6MTYyMzIwNzQwMCwiaXNzIjoiV0VCIiwicm9sZSI6IlVTRVIifQ.',
            expiresAt: DateTime.now().plus({ days: 1 }).toJSDate(),
        };
    }
}
