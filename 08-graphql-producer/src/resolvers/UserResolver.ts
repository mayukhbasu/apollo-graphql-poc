import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/User';
import { CreateUserInput } from '../inputs/CreateUserInput';
import { validateOrReject } from 'class-validator';

@Resolver()
export class UserResolver {
  private users: User[] = [];

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.users;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data') data: CreateUserInput
  ): Promise<User> {
    const user = new User();
    user.id = String(this.users.length + 1);
    user.name = data.name;
    user.email = data.email;
    user.isActive = data.isActive;

    try {
      await validateOrReject(user);
    } catch (errors) {
      throw new Error('Validation failed: ' + errors);
    }

    this.users.push(user);
    return user;
  }
}
