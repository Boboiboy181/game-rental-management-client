import SignInForm from '../components/sign-in-form.component';
import SignUpForm from '../components/sign-up-form.component';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();

  const handleBackToShop = () => navigate('/');

  return (
    <div className="">
      <p
        className="cursor-pointer text-sm text-black/[.6] hover:text-blue-600 underline-hover italic z-10 top-[50px] left-[50px]"
        onClick={handleBackToShop}
      >
        Back to shop
      </p>
      <div className="absolute top-[40%] transform translate-y-[-40%] flex items-center justify-center w-full h-screen">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
