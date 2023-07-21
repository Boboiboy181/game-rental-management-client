import { Button, Form, Space, Typography } from 'antd';
import Input from '../components/input.component';
import React, { useState } from 'react';
import { SignIn } from '../types/sign-in.type';
import { signIn } from '../api/auth.service';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const defaultValues = {
  username: '',
  password: '',
};

const defaultErrorMessages = {
  username: '',
  password: '',
};

const AuthPage = () => {
  const [formFields, setFormFields] = useState<SignIn>(defaultValues);
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessages, setErrorMessages] =
    useState<SignIn>(defaultErrorMessages);
  const navigate = useNavigate();
  const { username, password } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages(defaultErrorMessages);

    const signInDto: SignIn = {
      username,
      password,
    };
    try {
      const response = await signIn(signInDto);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('username', username);
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      if (error.response.data.message === 'Nhap sai thong tin') {
        setErrorMessages({ ...errorMessages, username: 'Username không đúng' });
        return;
      }
      if (error.response.data.message === 'Nhap sai mat khau') {
        setErrorMessages({ ...errorMessages, password: 'Mật khẩu không đúng' });
        return;
      }
    }
  };

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div
      className="w-[450px] h-[50%] bg-white rounded-md relative 
    top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl 
    flex justify-center items-center text-center"
    >
      <Space direction="vertical" className="w-[450px] h-full">
        <Text className="font-cursive text-4xl mb-8 block">Đăng nhập</Text>
        <Form onSubmitCapture={handleSubmit}>
          <Form.Item className="mb-[27px] text-left relative">
            <Input
              placeHolder="Username"
              inputName="username"
              inputValue={username}
              handleChange={handleChange}
              type="text"
              required={true}
            />
            <Text className="text-red-500 font-medium top-[48px] text-xs absolute">
              {errorMessages.username}
            </Text>
          </Form.Item>
          <Form.Item className="mb-[27px] text-left relative">
            <Input
              placeHolder="Password"
              inputName="password"
              inputValue={password}
              handleChange={handleChange}
              type={passwordShown ? 'text' : 'password'}
              required={true}
            />
            <button
              type="button"
              className="text-sm text-gray-500 absolute top-[30%] left-[92%] translate-x-[-50%]"
              onClick={(e) => togglePassword(e)}
            >
              hiện
            </button>
            <Text className="text-red-500 absolute top-[48px] font-medium text-xs">
              {errorMessages.password}
            </Text>
          </Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            className="bg-blue-500 w-full"
          >
            Đăng nhập
          </Button>
        </Form>
      </Space>
    </div>
  );
};

export default AuthPage;
