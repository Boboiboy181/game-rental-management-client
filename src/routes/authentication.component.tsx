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
      <div className="absolute top-[50%] transform translate-y-[-50%] flex items-start justify-center w-full">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
