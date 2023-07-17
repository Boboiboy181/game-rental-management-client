import SignInForm from '../components/sign-in-form.component';
// import SignUpForm from '../components/sign-up-form.component';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();

  const handleBackToShop = () => navigate('/');

  return (
    <div className="relative bg-gradient-to-r from-blue-300 to-fuchsia-100 h-screen overflow-hidden">
      <p
        className="cursor-pointer text-base text-black font-medium underline-hover italic z-10 top-[50px] left-[50px]"
        onClick={handleBackToShop}
      >
        Back to shop
      </p>
      <div className="absolute flex items-start justify-center w-screen h-[350px] top-[50%] translate-y-[-50%]">
        <SignInForm />
        {/* <SignUpForm /> */}
      </div>
    </div>
  );
};

export default Authentication;
