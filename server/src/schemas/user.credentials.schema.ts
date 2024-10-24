import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { generatePasswordHash } from 'src/utils/user.utils';

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

// Pre hooks for generating password hash instead of saving it directly
async function generateHashPreHook(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await generatePasswordHash(this.password);
        return next();
    } catch (error) {
        return next(error);
    }
}

async function generateHashPreHookForUpdate(next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const hashedPassword = await generatePasswordHash(update.password);
            this.password = hashedPassword;
            this.getUpdate().password = hashedPassword;
            return next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
}


export const UserCredentialsSchema =
    SchemaFactory.createForClass(UserCredentials);

    UserCredentialsSchema.pre('save', generateHashPreHook);
    UserCredentialsSchema.pre('updateOne', generateHashPreHookForUpdate);
    UserCredentialsSchema.pre('findOneAndUpdate', generateHashPreHookForUpdate);
    UserCredentialsSchema.pre('updateMany', generateHashPreHookForUpdate);
    
