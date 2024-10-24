import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserStatusEnum } from 'src/enums/user.schema.enum';

@Injectable()
export class UserRegisterGuard implements CanActivate {
    constructor() {}
    // MOCK
    async canActivate(context: ExecutionContext): Promise<boolean> {
        /*
         * DEV NOTES:
         * - Extracts the request object from the execution context.
         * - Retrieves the `Authorization` header from the request.
         * - If the `Authorization` header is missing, access is denied.
         * - Extracts the token from the `Authorization` header by removing the 'Bearer ' prefix.
         * - Verifies the token using `userAuthService.verifyAccessToken`.
         * - Logs the verification result for debugging purposes.
         * - If the token is not verified, access is denied.
         * - Attaches the verified user to the request object.
         * - Checks if the user status is either `ACTIVE` or `INACTIVE` and ensures the user is not blocked.
         * - If the user status is not valid or the user is blocked, access is denied.
         * - If all checks pass, access is granted.
         */

        return true;
    }
}
