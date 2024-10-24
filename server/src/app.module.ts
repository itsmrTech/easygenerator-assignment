import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';
import { cwd } from 'process';
import { AppConfig } from './core/config';
import { UserModule } from './modules/user/user/user.module';
import { UserAuthModule } from './modules/user/auth/user.auth.module';


@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(cwd(), '/src/i18n/'),
                watch: true,
            },
            resolvers: [
                new QueryResolver(['lang', 'l']),
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
            ],
        }),
        //mongoose
        MongooseModule.forRoot(AppConfig.getMongoUri(), {}),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        UserAuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
