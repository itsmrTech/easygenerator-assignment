import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    IsString,
    IsOptional,
    IsEmail,
    MinLength,
    IsPhoneNumber,
    IsNotEmpty,
    MaxLength,
} from 'class-validator';


class SignUpUserResUserDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    name: string;
}

export class SignUpUserResTokenDto{
    @Expose()
    token: string;

    @Expose()
    expiresAt: Date;
}
export class SignUpUserResTokensDto {
    @Expose()
    @Type(() => SignUpUserResTokenDto)
    accessToken: SignUpUserResTokenDto;

    @Expose()
    @Type(() => SignUpUserResTokenDto)
    refreshToken: SignUpUserResTokenDto;
}

export class SignUpUserResDto {

    @Expose()
    @Type(() => SignUpUserResUserDto)
    user: SignUpUserResUserDto;

    @Expose()
    @Type(() => SignUpUserResTokensDto)
    tokens: SignUpUserResTokensDto;
}

export class SignUpUserReqDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'john.doe@gmail.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '12345678',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

}

export class LoginUserReqDto {
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
