import { Resolver, Query, Mutation, Arg, Subscription, PubSub, PubSubEngine, Root, ID } from 'type-graphql';
import { User} from './User';
import { Task} from './Task';

import { validateOrReject, ValidationError } from 'class-validator';

const users: User[] = [];
const tasks: Task[] = [];
const TASK_ASSIGNED = 'TASK_ASSIGNED';

@Resolver()
export class TaskManagementResolver {
  @Query(() => [Task])
  getAllTasks(): Task[] {
    return tasks;
  }

  @Query(() => [Task])
  getTasksByUser(@Arg('userId', () => ID) userId: string): Task[] {
    return tasks.filter(task => task.assignedTo?.id === userId);
  }

  @Mutation(() => Task)
  async createTask(
    @Arg('title') title: string,
    @Arg('description', { nullable: true }) description: string,
  ): Promise<Task> {
    const task = new Task();
    task.id = String(tasks.length + 1);
    task.title = title;
    task.description = description;

    try {
      await validateOrReject(task);
    } catch (errors) {
      throw new ValidationErrorWithMessage(errors as any);
    }

    tasks.push(task);
    return task;
  }

  @Mutation(() => Task)
  async assignTask(
    @Arg('taskId', () => ID) taskId: string,
    @Arg('userId', () => ID) userId: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Task> {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    task.assignedTo = user;
    await pubSub.publish(TASK_ASSIGNED, task);
    return task;
  }

  @Subscription(() => Task, {
    topics: TASK_ASSIGNED,
    filter: ({ payload, args }) => payload.assignedTo?.id === args.userId,
  })
  taskAssigned(@Root() task: Task, @Arg('userId', () => ID) userId: string): Task {
    return task;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('isActive') isActive: boolean,
  ): Promise<User> {
    const user = new User();
    user.id = String(users.length + 1);
    user.name = name;
    user.email = email;
    user.isActive = isActive;

    try {
      await validateOrReject(user);
    } catch (errors) {
      throw new ValidationErrorWithMessage(errors as any);
    }

    users.push(user);
    return user;
  }
}

class ValidationErrorWithMessage extends Error {
  constructor(errors: ValidationError[]) {
    super('Validation failed');
    this.name = 'ValidationErrorWithMessage';
    this.message = errors.map(error => Object.values(error.constraints || {}).join(', ')).join('; ');
  }
}
