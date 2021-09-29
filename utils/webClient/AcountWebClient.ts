import { makePostRequest } from './WebClientUtils';
import { LoginForm, ResetForm, SignUpForm, User } from '../../type';

export const loginInApi = async (loginForm: LoginForm): Promise<User> => {
  console.log('loginInApi', loginForm);
  // return { email: 'test@test.com', name: 'Marcelo Ziglioli', initials: 'MZ' };
  return makePostRequest('http://localhost:8082/user/authenticate', loginForm);
};
export const signUpInApi = async (signUpForm: SignUpForm): Promise<any> => {
  return makePostRequest('www.mywebsite/api/signup', signUpForm);
};
export const resetPasswordInApi = async (
  resetForm: ResetForm
): Promise<any> => {
  return makePostRequest('www.mywebsite/api/login-reset', resetForm);
};
