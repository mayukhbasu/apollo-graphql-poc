import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../entities/User';
import { Task } from '../entities/Task';
import { Project } from '../entities/Project';
import { PaginationInput } from '../inputs/PaginationInput';

// Mock data for demonstration purposes
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', isActive: true },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', isActive: false },
];

const tasks: Task[] = [
  { id: '1', title: 'Complete Documentation', description: 'Write API docs', completed: false, assignedTo: users[0], project: null as any },
  { id: '2', title: 'Fix Bugs', description: 'Fix issues reported by QA', completed: true, assignedTo: users[1], project: null as any },
];

const projects: Project[] = [
  { id: '1', name: 'Project Alpha', tasks: [tasks[0]] },
  { id: '2', name: 'Project Beta', tasks: [tasks[1]] },
];

// Assign project references to tasks (for demonstration purposes)
tasks[0].project = projects[0];
tasks[1].project = projects[1];

@Resolver()
export class QueryResolver {
  
  @Query(() => [User])
  async users(
    @Arg('pagination', () => PaginationInput, { nullable: true }) pagination?: PaginationInput
  ): Promise<User[]> {
    // Implement your pagination logic here
    const { page = 1, pageSize = 10 } = pagination || {};
    // Assume you have some users array
    const startIndex = (page - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }
  @Query(() => [Task])
  async tasks(
    @Arg('completed', { nullable: true }) completed?: boolean,
    @Arg('pagination', { nullable: true }) pagination?: PaginationInput
  ): Promise<Task[]> {
    // Filter tasks based on completion status
    let filteredTasks = tasks;
    if (completed !== undefined) {
      filteredTasks = tasks.filter(task => task.completed === completed);
    }

    // Handle pagination
    const { page = 1, pageSize = 10 } = pagination || {};
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // Return paginated and filtered tasks
    return filteredTasks.slice(start, end);
  }

  @Query(() => [Project])
  async projects(
    @Arg('pagination', { nullable: true }) pagination?: PaginationInput
  ): Promise<Project[]> {
    // Handle pagination
    const { page = 1, pageSize = 10 } = pagination || {};
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // Return paginated projects
    return projects.slice(start, end);
  }
}
