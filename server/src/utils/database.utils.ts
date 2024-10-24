import { HttpException, HttpStatus } from "@nestjs/common";
import { Types } from "mongoose";

export const toMongoId = (id: string): Types.ObjectId => {
    try {
        return new Types.ObjectId(id);
    } catch (e) {
        throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
};