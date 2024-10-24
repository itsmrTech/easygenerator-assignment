import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserInternalService } from '../../user/services/user.internal.service';
import { UserAuthInternalService } from './user.auth.internal.service';

@Injectable()
export class UserAuthCronService {
    constructor(
        private readonly userAuthInternalService: UserAuthInternalService
    ) {
        this.deleteExpiredRefreshTokens();
    }

    @Cron('0 0 */6 * * *') // Every 6 hours
    async deleteExpiredRefreshTokens() {
        try {
            await this.userAuthInternalService.deleteExpiredRefreshTokens();
        } catch (e) {
            console.error(e);
        }
    }
}
