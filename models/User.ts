export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  role?: 'ADMIN' | 'DEV';
}

export interface UserInput {
  first_name: string;
  last_name: string;
  email?: string;
  role?: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
