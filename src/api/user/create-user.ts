import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { User, UserResponse } from './types';

type Variables = User;
type Response = UserResponse;

export const createUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'users/register',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
