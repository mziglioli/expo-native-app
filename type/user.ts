export interface User {
  id?: string;
  active: boolean;
  name: string;
  email?: string;
  token?: string;
  initials: string;
  loginAttempt: number;
}
export const UserInitial = {
  active: false,
  loginAttempt: 0,
  name: 'Guest',
  email: '',
  initials: 'GT',
};
