import { I18nService } from 'nestjs-i18n';
import {
    Body,
    Controller,
    Delete,
    Get,
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
import { AppConfig } from 'src/core/config';
import {
    LanguageListEnum,
    RoleEnum,
    TokenAudienceEnum,
    TokenIssuerEnum,
} from 'src/core/enums';
import { UserGuard } from 'src/guards/user.guard';
import { ILoggedInUserRequest } from 'src/core/interfaces';
import { genResp } from 'src/utils/response.utils';

@ApiTags('🛠 CMS > User')
@Controller('cms/user')
export class UserController {
    readonly defaultLanguage: LanguageListEnum =
        LanguageListEnum[AppConfig.getDefaultLanguage()];
    constructor(
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    @UseGuards(UserGuard)
    async getProfile(
        @Req() req: ILoggedInUserRequest,
        @Query('language') language = this.defaultLanguage
    ) {
        const user = req.user;

        return await genResp({
            data: { user },
            statusCode: HttpStatus.OK,
            i18n: this.i18nService,
            code: 'server.user.profile.success',
            language,
        });
    }
}
