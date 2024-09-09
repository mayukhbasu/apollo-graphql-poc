import { IsBoolean, IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  @Length(1, 30, {message: 'Name must be 1 to 30 arguments'})
  name: string;
  @Field()
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;
  @Field()
  @IsBoolean({message: 'IsActive must be boolean'})
  isActive: boolean;

  constructor(id: string, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }
}