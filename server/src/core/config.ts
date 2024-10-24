import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv-safe';
import { join } from 'path';
config({
    path: join(__dirname, '../../.env'),
    example: join(__dirname, '../../.env.example'),
    allowEmptyValues: true,
});
export class AppConfig {
    private static configService: ConfigService;

    static setConfigService(configService: ConfigService) {
        this.configService = configService;
    }

    static get<T>(key: string): T {
        if (this.configService) return this.configService.get<T>(key);

        return process.env[key] as T;
    }

    static getAPIPort(): number {
        return this.get<number>('API_PORT');
    }

    static getDefaultLanguage(): string {
        return this.get<string>('DEFAULT_LANGUAGE');
    }

    static getMongoUri(): string {
        return this.get<string>('MONGO_URI');
    }

    static getServerConfig():{
        apiPrefix: string;
        serverPort: number;
        version: string;
        swagger:{
            title: string;
            description: string;
            path: string;
            site: string;
            email: string;
            enabled: boolean;
            username: string;
            password: string;
        }
    }{
        const apiPrefix = this.get<string>('API_PREFIX');
        const serverPort = this.get<number>('API_PORT');
        const version = this.get<string>('API_VERSION');
        const swaggerTitle = this.get<string>('SWAGGER_TITLE');
        const swaggerDescription = this.get<string>('SWAGGER_DESCRIPTION');
        const swaggerPath = this.get<string>('SWAGGER_PATH');
        const swaggerSite = this.get<string>('SWAGGER_SITE');
        const swaggerEmail = this.get<string>('SWAGGER_EMAIL');
        const swaggerEnabled:boolean = this.get<boolean>('SWAGGER_ENABLED');
        const swaggerUsername = this.get<string>('SWAGGER_USERNAME');
        const swaggerPassword = this.get<string>('SWAGGER_PASSWORD');

        return {
            apiPrefix,
            serverPort,
            version,
            swagger: {
                title: swaggerTitle,
                description: swaggerDescription,
                path: swaggerPath,
                site: swaggerSite,
                email: swaggerEmail,
                enabled: Boolean(swaggerEnabled),
                username: swaggerUsername,
                password: swaggerPassword,
            },
        };
    }

    static getTokenConfig(): {
        accessTokenExpiresIn: string;
        accessTokenSecret: string;
        refreshTokenExpiresIn: string;
        refreshTokenSecret: string;
        resetPasswordExpiresIn: string;
        resetPasswordSecret: string;
    } {
        const accessTokenExpiresIn = AppConfig.get<string>('ACCESS_TOKEN_EXPIRES_IN');
        const refreshTokenExpiresIn = AppConfig.get<string>('REFRESH_TOKEN_EXPIRES_IN');
        const accessTokenSecret = AppConfig.get<string>('ACCESS_TOKEN_SECRET');
        const refreshTokenSecret = AppConfig.get<string>('REFRESH_TOKEN_SECRET');
        const resetPasswordExpiresIn = AppConfig.get<string>('RESET_PASSWORD_EXPIRES_IN');
        const resetPasswordSecret = AppConfig.get<string>('RESET_PASSWORD_SECRET');

        return {
            accessTokenExpiresIn,
            refreshTokenExpiresIn,
            accessTokenSecret,
            refreshTokenSecret,
            resetPasswordExpiresIn,
            resetPasswordSecret,
        };
    }
}
