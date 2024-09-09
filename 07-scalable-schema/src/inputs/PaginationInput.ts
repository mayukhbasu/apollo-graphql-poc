import { InputType, Field, Int } from 'type-graphql';
import { Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1, { message: 'Page number must be at least 1' }) // Validate that page must be at least 1
  page!: number;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1, { message: 'Page size must be at least 1' }) // Validate that page size must be at least 1
  pageSize!: number;
}
