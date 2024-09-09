import { Arg, Mutation, PubSub, PubSubEngine, Query, Resolver } from "type-graphql";
import { User } from "./User";
import { validateOrReject } from "class-validator";
import { ValidationError } from "apollo-server-express";
const MESSAGE_ADDED = 'MESSAGE_ADDED'; // Event topic for new user added


@Resolver(User)
export class UserResolver {

  private users: User[] = [];

  @Query(() => [User])
  getAllUsers(): User[] {
    return this.users;
  }

  @Mutation(() => User)
  async createNewUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('isActive') isActive: boolean,
    @PubSub() pubsub: PubSubEngine
  ): Promise<User> {
    const user = new User(String(this.users.length + 1), name, email, isActive);

    //perform validation
    try {
      await validateOrReject(user);
    } catch(errors) {
      throw new ValidationErrorWithMessage(errors as any);

    }
    this.users.push(user);
    await pubsub.publish(MESSAGE_ADDED, user);
    return user;
  }
}

class ValidationErrorWithMessage extends Error {
  constructor(errors: ValidationError[]) {
    super('Validation failed');
    this.name = 'ValidationErrorWithMessage';
    console.log(errors)
    this.message = errors
      .map(error => Object.values(error.constraints || {}).join(', '))
      .join('; ');
  }
}