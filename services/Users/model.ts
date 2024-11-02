export type User = {
  id: number;
  name: string;
  age: number;
};

export interface UserService {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | undefined>;
  createUser(name: string, age: number): Promise<User>;
}
