import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type UserCredentialsDocument = HydratedDocument<UserCredentials>;

@Schema({ timestamps: true })
export class UserCredentials {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: User.name,
        unique: true,
    })
    user: Types.ObjectId;

    @Prop({
        required: true,
    })
    password: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const UserCredentialsSchema =
    SchemaFactory.createForClass(UserCredentials);
