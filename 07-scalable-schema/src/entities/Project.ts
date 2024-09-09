import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Task } from './Task';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  @Length(3, 50)
  name!: string;

  @Field(() => [Task])
  tasks!: Task[];
}
