import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';

export type TokenType = {
  access_token: string;
  expires_at: number;
  issued_at: number;
  refresh_token: string;
  refresh_token_expires_at: number;
  refresh_token_issued_at: number;
  token_type: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
