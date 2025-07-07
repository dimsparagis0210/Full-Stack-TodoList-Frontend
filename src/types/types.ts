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

