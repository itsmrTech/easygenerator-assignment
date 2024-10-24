import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthService } from '../user.auth.service';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { UserInternalService } from '../../../user/services/user.internal.service';
import { Types } from 'mongoose';
import { DateTime } from 'luxon';
import { RoleEnum, TokenAudienceEnum, TokenIssuerEnum } from 'src/core/enums';
import { UserCredentials } from '../../../../../schemas/user.credentials.schema';
import { User } from '../../../../../schemas/user.schema';

describe('UserAuthService', () => {
    let service: UserAuthService;
    let userModel: any;
    let userCredentialsModel: any;
    let userInternalService: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserAuthService,
                ConfigService,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: getModelToken(UserCredentials.name),
                    useValue: {
                        create: jest.fn(),
                    },
                },
                {
                    provide: UserInternalService,
                    useValue: {
                        someMethod: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserAuthService>(UserAuthService);
        userModel = module.get(getModelToken(User.name));
        userCredentialsModel = module.get(getModelToken(UserCredentials.name));
        userInternalService = module.get<UserInternalService>(UserInternalService);
    });

    describe('signUpUser', () => {
        it('should return user and tokens', async () => {
            const input = {
                email: 'test@example.com',
                name: 'Test User',
                password: 'password123',
            };

            const result = await service.signUpUser(input);

            expect(result.user.email).toBe(input.email);
            expect(result.user.name).toBe(input.name);
            expect(result.token.accessToken.token).toBeDefined();
            expect(result.token.refreshToken.token).toBeDefined();
        });
    });

    describe('loginUser', () => {
        it('should return user and tokens', async () => {
            const input = {
                email: 'john.doe@gmail.com',
                password: 'password123',
            };

            const result = await service.loginUser(input);

            expect(result.user.email).toBe(input.email);
            expect(result.token.accessToken.token).toBeDefined();
            expect(result.token.refreshToken.token).toBeDefined();
        });
    });

    describe('generateAccessToken', () => {
        it('should return a token and expiration date', async () => {
            const input = {
                sub: new Types.ObjectId(),
                iat: Date.now(),
                iss: TokenIssuerEnum.WEB,
                aud: TokenAudienceEnum.WEB,
                role: RoleEnum.USER,
            };

            const result = await service.generateAccessToken(input);

            expect(result.token).toBeDefined();
            expect(result.expiresAt).toBeInstanceOf(Date);
        });
    });
});