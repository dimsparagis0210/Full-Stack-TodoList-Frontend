/**
 * Types
 *
 * This file contains the types for the application.
 */

export type SignInDTO = {
  username: string;
  password: string;
};

export type SignUpDTO = {
  email: string;
  password: string;
  name: string;
};

export type User = {
  credentialsNonExpired: boolean;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: string[];
  email: string;
  id: number;
  name: string;
  username: string;
  password: string;
  board: Board;
  assignedTasks: Task[];
  createdTasks: Task[];
};

export type UserDTO = {
  name: string;
  email: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  startDate: string;
  dueDate: string;
  category: string;
  createdBy: number;
  assignedTo: number;
  createdAt: string;
  boardId: number;
};

export type TaskDTO = {
  title: string;
  description: string;
  category: string;
  priority: string;
  assignedTo: string;
  startDate: string;
  dueDate: string;
  status: string;
};

export type Board = {
  id: number;
  tasks: Task[];
};
