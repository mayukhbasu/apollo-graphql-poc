import { Arg, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { User } from "./User";

@Resolver(User)
export class UserResolver {

  private users: User[] = [];

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.users
  }
  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('isActive') isActive: boolean,
    @PubSub() pubsub: PubSubEngine
  ): Promise<User> {
    const user = new User(String(this.users.length + 1), name, email, isActive);
    this.users.push(user);
    await pubsub.publish('MESSAGE_ADDED', user);
    return user;
  }

  @Subscription(() => User, {
    topics: 'MESSAGE_ADDED'
  })
  newUser(@Root() newUser: User): User {
    return newUser
  }
}