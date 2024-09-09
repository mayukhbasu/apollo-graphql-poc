import { IsBoolean, Length, MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Project } from "./Project";

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  @Length(5, 100)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(500)
  description?: string;

  @Field()
  @IsBoolean()
  completed!: boolean;

  @Field(() => User)
  assignedTo!: User;

  @Field(() => Project)
  project!: Project;
}