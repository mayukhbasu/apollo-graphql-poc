import { IsBoolean, IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {

  @Field()
  @Length(3,30, {message: "Name must be between 3 and 30 characters"})
  name!: string;
  @Field()
  @IsEmail({}, { message: "Email must be a valid email address" })
  email!: string;
  @Field()
  @IsBoolean({ message: "isActive must be a boolean value" })
  isActive!: boolean;
}