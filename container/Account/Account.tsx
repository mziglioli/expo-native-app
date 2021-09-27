import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Login,
  ResetPassword,
  CreateAccount,
  Loading,
} from '@mziglioli/react-native-components';
import {
  loginInApi,
  signUpInApi,
  resetPasswordInApi,
} from '../../utils/webClient/AcountWebClient';
import { User } from '../../type';

export interface AccountProps {
  onLoginSuccess: (user: User) => void;
}

export const Account = ({ onLoginSuccess }: AccountProps) => {
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<string>('login');
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleLogin = (email: string, password: string): void => {
    setLoading(true);
    loginInApi({ email, password })
      .then((user) => {
        //todo
        console.log('loginInApi:success', user);
        setLoading(false);
        setError('');
        onLoginSuccess(user);
      })
      .catch((error) => {
        console.log('loginInApi:error', error);
        setLoading(false);
        setError('login');
      });
  };
  const handleReset = (email: string): void => {
    console.log('handleReset', email);
    resetPasswordInApi({ email })
      .then((value) => {
        console.log('resetPasswordInApi:success', value);
        //todo
        setLoading(false);
        setError('');
      })
      .catch((error) => {
        console.log('resetPasswordInApi:error', error);
        setLoading(false);
        setError('reset');
      });
  };
  const handleSingUp = (
    name: string,
    email: string,
    password: string
  ): void => {
    console.log('handleSingUp', name, email, password);
    signUpInApi({ name, email, password })
      .then((value) => {
        console.log('signUpInApi:success', value);
        //todo
        setLoading(false);
        setError('');
      })
      .catch((error) => {
        console.log('signUpInApi:success', error);
        setLoading(false);
        setError('sign');
      });
  };
  return (
    <View testID={`Account`}>
      <Loading isLoading={isLoading} />
      {page === 'login' && (
        <Login
          testId={'te'}
          showError={error === 'login'}
          onLoginClick={handleLogin}
          onForgotPasswordClick={() => setPage('reset')}
          onSignUpClick={() => setPage('sign')}
        />
      )}
      {page === 'reset' && (
        <ResetPassword
          testId={'te'}
          showError={error === 'reset'}
          onLoginClick={() => setPage('login')}
          onResetClick={handleReset}
        />
      )}
      {page === 'sign' && (
        <CreateAccount
          testId={'te'}
          showError={error === 'sign'}
          onLoginClick={() => setPage('login')}
          onSignUpClick={handleSingUp}
        />
      )}
    </View>
  );
};
