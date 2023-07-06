import React, { useContext, useState } from 'react';
import Input from './input.component';
import axios from 'axios';
import { UserContext } from '../contexts/user.context';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  username: '',
  password: '',
};

const SignInForm = () => {
  const [fomrFields, setFormFields] = useState(defaultFormFields);
  const { user, setUser } = useContext(UserContext);
  const { username, password } = fomrFields;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormFields({ ...fomrFields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/auth/login',
        fomrFields,
      );
      setUser(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(username, password);

  console.log(user);

  return (
    <div className="mr-5">
      <h2 className="text-3xl font-cursive mb-2">I already have an account</h2>
      <p className="font-light text-sm mb-7">
        Sign in with your username and password
      </p>
      <form onSubmit={handleSubmit} className="text-center">
        <Input
          inputPlaceholder="Username"
          inputName="username"
          inputType="text"
          inputValue={username}
          onChangeHandler={handleChange}
        />
        <Input
          inputPlaceholder="Password"
          inputName="password"
          inputType="password"
          inputValue={password}
          onChangeHandler={handleChange}
        />
        <button className="rounded-md bg-blue-600 text-white hover:bg-indigo-600 w-[100%] text-center self-center p-2 mt-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
