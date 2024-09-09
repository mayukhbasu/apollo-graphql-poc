import { IsBoolean, IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {

  @Field(() => ID)
  id!: string;
  @Field()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
  name!: string;
  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;
  @Field()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive!: boolean;
}