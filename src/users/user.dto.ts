export interface UserCreationParams {
    username: string;
    email: string;
    role: String;
    password: string;
}

export interface UserLoginParams {
    username: string;
    password: string;
}