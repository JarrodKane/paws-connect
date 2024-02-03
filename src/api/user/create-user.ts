import type { AxiosError } from 'axios';
import axios from 'axios';
import qs from 'qs';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { TokenResponse, User } from './types';

type Variables = User;
type Response = TokenResponse;

export const createUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    try {
      const response = await client({
        url: 'users/register',
        method: 'POST',
        data: variables,
      });

      const user = response.data;

      let userData = {
        username: user.email,
        password: variables.password,
      };

      const tokenResponse = await client({
        url: 'auth/access-token',
        method: 'POST',
        data: qs.stringify(userData),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      return tokenResponse.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data.detail;
        return Promise.reject(serverMessage || error);
      }
    }
  },
});
