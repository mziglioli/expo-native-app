export interface LoginForm {
  email: string;
  password: string;
  secret?: string;
}
export interface SignUpForm {
  email: string;
  password: string;
  name: string;
}
export interface ResetForm {
  email: string;
}