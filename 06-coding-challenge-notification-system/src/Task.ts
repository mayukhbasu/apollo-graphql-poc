import { Length, MaxLength } from 'class-validator'; // Import validation decorators
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' }) // Enforce max length validation
  description!: string;

  @Field()
  completed: boolean = false;

  @Field(() => User, { nullable: true })
  assignedTo?: User;
}
