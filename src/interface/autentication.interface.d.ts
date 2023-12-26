interface LoginResponse {
    status: string;
    message: string;
    data: UserLoginDetail;
    token: string;
}

interface UserLoginDetail {
    id: string;
    status: string;
    avatar: string;
    username: string;
    name: string;
    email: string;
    role: string;
}

interface LoginFormValues {
    email: string;
    password: string;
}
