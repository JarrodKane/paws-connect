import React from 'react';

import { createUser } from '@/api';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

import type { LoginFormProps } from './sign-up-form';
import { SignUpForm } from './sign-up-form';

export const SignUp = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const { mutate: addUser } = createUser();
  // Add in isLoading state from createUser

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    // signIn({ access: 'access-token', refresh: 'refresh-token' });
    addUser(data, {
      onSuccess: (token) => {
        signIn(token);
      },

      onError: (error) => {
        showErrorMessage(error.message);
      },
    });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
};
