// type read<T> = {
//   readonly [P in keyof T]: T[P]
// }

// //example
// type User = {name: string, age: number};
// type derivedUser = read<User>;

// const newUser: derivedUser = {
//   name: "Mayukh",
//   age: 36
// }

// //newUser.age = 20

// type myRecord = Record<string, number>;

// let newUser1: myRecord = {
//   "test": "@2"
// }

interface UserProfile {
  name: string;
  age: number;
  email: string;
}

// type PartialUserProfile = Partial<UserProfile>;

// const user1: PartialUserProfile = {
//   name: "Max"
// }

// type PickUser = Pick<UserProfile, 'name'>

// const user2: PickUser = {
//   name: "Max"
// }

type UserRole = 'Admin' | 'Seller' | 'Customer';
type ProductType = 'Electronics' | 'Clothing' | 'Groceries';