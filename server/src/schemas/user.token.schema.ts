import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { UserTokenTypeEnum } from 'src/enums/user.token.schema.enum';

export type UserTokenDocument = HydratedDocument<UserToken>;

@Schema({ timestamps: true })
export class UserToken {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: User.name,
    })
    user: Types.ObjectId;

    @Prop({
        required: true,
    })
    token: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({
        type: String,
        enum: UserTokenTypeEnum,
        required: true,
    })
    type: UserTokenTypeEnum;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
