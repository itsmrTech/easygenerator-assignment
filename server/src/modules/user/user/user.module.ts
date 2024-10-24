import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserInternalService } from './services/user.internal.service';
import { UserController } from './controllers/user.controller';
import { UserAuthModule } from '../auth/user.auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        forwardRef(()=>UserAuthModule),
    ],
    controllers:[UserController],
    providers: [UserInternalService],
    exports: [UserInternalService],
})
export class UserModule {}
