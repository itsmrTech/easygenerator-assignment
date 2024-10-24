import { I18nService } from 'nestjs-i18n';
import {
    Body,
    Controller,
    HttpStatus,
    Inject,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { UserAuthService } from '../services/user.auth.service';
import { AppConfig } from 'src/core/config';
import {
    LanguageListEnum,
    RoleEnum,
    TokenAudienceEnum,
    TokenIssuerEnum,
} from 'src/core/enums';
import {
    LoginUserReqDto,
    SignUpUserReqDto,
    SignUpUserResDto,
} from '../dtos/user.auth.dto';
import { apiLanguageQuery } from 'src/core/swagger';
import { genResp } from 'src/utils/response.utils';
import { ILoggedInUserRequest } from 'src/core/interfaces';
import { UserRefreshGuard } from 'src/guards/user.refresh.guard';
import { UserRegisterGuard } from 'src/guards/user.register.guard';

@ApiTags('🛠 CMS > User > Authorization')
@Controller('cms/user/auth')
export class UserAuthController {
    readonly defaultLanguage: LanguageListEnum =
        LanguageListEnum[AppConfig.getDefaultLanguage()];
    constructor(
        private readonly userAuthService: UserAuthService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}

    @Post('register')
    @ApiQuery(apiLanguageQuery)
    @ApiOperation({ summary: 'Registration Step 1: Register a user' })
    async signUpUser(
        @Body() body: SignUpUserReqDto,
        @Query('language') language = this.defaultLanguage
    ) {
        const result = await this.userAuthService.signUpUser({
            email: body.email,
            name: body.name,
            password: body.password,
        });

        return genResp({
            data: result,
            responseName: 'server.user.auth.register.success',
            statusCode: HttpStatus.OK,
            language,
            i18n: this.i18nService,
            dto: SignUpUserResDto,
        });
    }

    @ApiOperation({ summary: '🧪 Refresh an expired Access Token' })
    @ApiQuery({ name: 'language', enum: LanguageListEnum })
    @ApiBearerAuth()
    @Post('access-token/refresh')
    @UseGuards(UserRefreshGuard)
    async refreshAccessToken(
        @Req() req: ILoggedInUserRequest,
        @Query('language')
        language: LanguageListEnum = this.defaultLanguage
    ) {
        const { token, expiresAt } =
            await this.userAuthService.generateAccessToken({
                sub: req.user._id,
                aud: TokenAudienceEnum.WEB,
                iss: TokenIssuerEnum.WEB,
                iat: Date.now(),
                role: RoleEnum.USER,
            });
        return await genResp({
            i18n: this.i18nService,
            data: { accessToken: token, accessExpiresAt: expiresAt },
            statusCode: HttpStatus.OK,
            responseName: 'server.user.auth.refresh.success',
            mock: true,
        });
    }

    @Post('login')
    @ApiQuery(apiLanguageQuery)
    @ApiOperation({ summary: '🧪 Login a user' })
    async loginUser(
        @Body() body: LoginUserReqDto,
        @Query('language') language = this.defaultLanguage
    ) {
        const result = await this.userAuthService.loginUser({
            email: body.email,
            password: body.password,
        });

        return genResp({
            data: result,
            responseName: 'server.user.auth.login.success',
            statusCode: HttpStatus.OK,
            language,
            i18n: this.i18nService,
            mock:true,
        });
    }
}
