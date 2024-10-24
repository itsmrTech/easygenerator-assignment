import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PreHookEnum } from 'src/core/enums';
import { UserStatusEnum } from 'src/enums/user.schema.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    _id: Types.ObjectId;

    @Prop({ required: false })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

