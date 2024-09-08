import { Resolver, Query, Mutation, Arg, ObjectType, Field, ID } from 'type-graphql';

// Define User ObjectType
@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  isActive: boolean;

  constructor(id: string, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }
}

// Resolver Class
@Resolver(User) // Specify the output type for the resolver
class UserResolver {
  private userList: User[] = [];

  @Query(() => [User]) // Decorate the output type of the query with @Query
  users(): User[] {
    return this.userList;
  }

  @Query(() => User, { nullable: true }) // Ensure output type is specified
  user(@Arg('id') id: string): User | undefined {
    return this.userList.find(user => user.id === id);
  }

  @Mutation(() => User) // Decorate the output type of the mutation with @Mutation
  createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('isActive') isActive: boolean,
  ): User {
    const newUser = new User(String(this.userList.length + 1), name, email, isActive);
    this.userList.push(newUser);
    return newUser;
  }
}

export { UserResolver };
