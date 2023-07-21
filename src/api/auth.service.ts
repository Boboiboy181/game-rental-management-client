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

  // if (data.token) {
  //   localStorage.setItem('token', data.token);
  // }

  return data;
};
