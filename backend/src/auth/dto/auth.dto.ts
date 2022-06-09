import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
@InputType()
export class RegisterDto {
  @Trim()
  @IsEmail()
  @Field(() => String, { description: ' email of the user' })
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @Field(() => String, { description: ' password of the user' })
  public readonly password: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { description: ' name of the user' })
  public readonly name?: string;
}

@InputType()
export class LoginDto {
  @Trim()
  @IsEmail()
  @Field(() => String, { description: ' emailof the user' })
  public readonly email: string;

  @IsString()
  @Field(() => String, { description: ' password of the user' })
  public readonly password: string;
}

@ObjectType()
export class UserToken {
  @Field(() => String, { description: ' emailof the user' })
  public readonly token: string;
}
