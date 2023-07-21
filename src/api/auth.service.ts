import { SignIn } from '../types/sign-in.type';
import api from './axios.config';

type AccessToken = {
  token: string;
};

export const signIn = async (signInDto: SignIn): Promise<AccessToken> => {
  const { data }: { data: AccessToken } = await api.post(
    '/auth/login',
    signInDto,
  );
  return data;
};

export const logOut = () => {
  sessionStorage.clear();
  window.location.reload();
};

export const getCurrentUser = (): string => {
  const username = sessionStorage.getItem('username');
  return username ? username : '';
};
