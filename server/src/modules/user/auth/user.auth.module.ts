import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserAuthController } from './controllers/user.auth.controller';
import { UserAuthService } from './services/user.auth.service';
import { UserModule } from '../user/user.module';
import {
    UserCredentials,
    UserCredentialsSchema,
} from 'src/schemas/user.credentials.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserToken, UserTokenSchema } from 'src/schemas/user.token.schema';
import { UserAuthInternalService } from './services/user.auth.internal.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserAuthCronService } from './services/user.auth.cron.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            {
                name: UserCredentials.name,
                schema: UserCredentialsSchema,
            },
            {
                name: UserToken.name,
                schema: UserTokenSchema,
            },
        ]),
        ScheduleModule.forRoot(),
        UserModule,
        JwtModule.register({}),
    ],
    controllers: [UserAuthController],
    providers: [UserAuthService, UserAuthInternalService, UserAuthCronService],
})
export class UserAuthModule {}
