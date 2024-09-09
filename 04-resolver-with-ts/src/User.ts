import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {

  @Field(() => ID)
  id!: string;
  @Field()
  name!: string;
  @Field()
  email!: string;
  @Field()
  isActive!: boolean

  constructor(id: string, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }
}