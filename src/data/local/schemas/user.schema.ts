export interface UserSchema {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string | null;
  token: string;
  role: string;
  status: string;
}
