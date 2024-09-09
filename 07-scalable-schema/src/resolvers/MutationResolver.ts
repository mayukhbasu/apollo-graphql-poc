import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/User';
import { Task } from '../entities/Task';
import { validateOrReject } from 'class-validator';
import { ValidationErrorWithMessage } from '../utils/customErrors';

@Resolver()
export class MutationResolver {
  private users: User[] = [];
  private tasks: Task[] = [];

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('isActive') isActive: boolean
  ): Promise<User> {
    const user = new User();
    user.id = String(this.users.length + 1);
    user.name = name;
    user.email = email;
    user.isActive = isActive;

    try {
      await validateOrReject(user);
    } catch (errors) {
      throw new ValidationErrorWithMessage(errors);
    }

    this.users.push(user);
    return user;
  }

  @Mutation(() => Task)
  async createTask(
    @Arg('title') title: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('userId') userId: string,
    @Arg('projectId') projectId: string
  ): Promise<Task> {
    const task = new Task();
    task.id = String(this.tasks.length + 1);
    task.title = title;
    task.description = description;

    // Additional logic to fetch the user and project and assign them to the task
    // Example:
    // task.assignedTo = this.users.find(user => user.id === userId);
    // task.project = this.projects.find(project => project.id === projectId);

    try {
      await validateOrReject(task);
    } catch (errors) {
      throw new ValidationErrorWithMessage(errors);
    }

    this.tasks.push(task);
    return task;
  }
}
