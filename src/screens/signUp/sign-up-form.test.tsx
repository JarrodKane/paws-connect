import React from 'react';

import { cleanup, fireEvent, render, waitFor } from '@/core/test-utils';

import type { LoginFormProps } from './sign-up-form';
import { SignUpForm } from './sign-up-form';

afterEach(cleanup);

const onSubmitMock: jest.Mock<LoginFormProps['onSubmit']> = jest.fn();

describe('SignUpForm Form ', () => {
  it('renders correctly', async () => {
    const { findByText } = render(<SignUpForm />);
    expect(await findByText(/Sign in/i)).not.toBeNull();
  });

  it('should display required error when values are empty', async () => {
    const { getByText, findByText, queryByText, getByTestId } = render(
      <SignUpForm />
    );

    const button = getByTestId('login-button');
    expect(queryByText(/Email is required/i)).toBeNull();
    fireEvent.press(button);
    expect(await findByText(/Email is required/i)).not.toBeNull();
    expect(getByText(/Password is required/i)).not.toBeNull();
  });

  it('should display matching error when email is invalid', async () => {
    const { getByTestId, findByText, queryByText } = render(<SignUpForm />);

    const button = getByTestId('login-button');
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'yyyyy');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.press(button);

    expect(queryByText(/Email is required/i)).toBeNull();
    expect(await findByText(/Invalid Email Format/i)).not.toBeNull();
  });

  it('Should call SignUpForm with correct values when values are valid', async () => {
    const { getByTestId } = render(<SignUpForm onSubmit={onSubmitMock} />);

    const button = getByTestId('login-button');
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'youssef@gmail.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(button);
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    // undefined because we don't use second argument of the  SubmitHandler
    expect(onSubmitMock).toBeCalledWith(
      {
        email: 'youssef@gmail.com',
        password: 'password',
      },
      undefined
    );
  });
});
