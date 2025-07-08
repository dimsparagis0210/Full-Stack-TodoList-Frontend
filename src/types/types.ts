export type SignInDTO = {
    username: string;
    password: string;
}

export type SignUpDTO = {
    email: string;
    password: string;
    name: string;
}

export type User = {
    credentialsNonExpired: boolean;
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: string[];
    email: string;
    id: string;
    name: string;
    username: string;
    password: string;
}

export type Task = {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    startDate: string;
    dueDate: string;
    category: string;
    createdBy: string;
    assignedTo: string;
    createdAt: string;
}