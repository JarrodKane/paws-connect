import React from 'react';

import { createUser } from '@/api';
// import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

export const Login = () => {
  // const signIn = useAuth.use.signIn();
  // const signUp = useAuth.use.signUp();
  useSoftKeyboardEffect();
  const { mutate: addUser, isLoading } = createUser();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    // signIn({ access: 'access-token', refresh: 'refresh-token' });
    // Call the mutate function with the user data
    addUser(data, {
      onSuccess: (response) => {
        console.log('success -------------------');
        console.log(response);
        console.log('success -------------------');
        // signIn(response.token);
      },

      // On error, log the error
      onError: (error) => {
        console.log('error -------------------');
        console.log('error -------------------');
        console.error(error);
      },
    });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};
