import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserStatusEnum } from 'src/enums/user.schema.enum';
import { UserAuthInternalService } from 'src/modules/user/auth/services/user.auth.internal.service';
import { UserAuthService } from 'src/modules/user/auth/services/user.auth.service';

@Injectable()
export class UserRefreshGuard implements CanActivate {
    constructor(
        private readonly userAuthInternalService: UserAuthInternalService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            return false;
        }

        const token = authorizationHeader.replace('Bearer ', '');
        const verificationResult =
            await this.userAuthInternalService.verifyRefreshToken(token);
        if (!verificationResult.verified) return false;
        request.user = verificationResult.user;
    

        // check if the user is active:
        if (request.user.status !== UserStatusEnum.ACTIVE ) return false;
       return true;
    }
}
