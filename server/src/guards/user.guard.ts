import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserStatusEnum } from 'src/enums/user.schema.enum';
import { UserAuthInternalService } from 'src/modules/user/auth/services/user.auth.internal.service';

@Injectable()
export class UserGuard implements CanActivate {
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
            await this.userAuthInternalService.verifyAccessToken(token);
        if (!verificationResult.verified) return false;
        request.user = verificationResult.user;
        return true;
    }
}
