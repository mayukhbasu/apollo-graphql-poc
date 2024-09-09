import { Length, IsEmail, IsBoolean } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {

  @Field(() => ID)
  id!: string;

  @Field()
  @Length(3, 30)
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsBoolean()
  isActive!: boolean;
}