import Input from './input.component';

const SignInForm = () => {
  return (
    <div className="mr-5">
      <h2 className="text-3xl font-cursive mb-2">I already have an account</h2>
      <p className="font-light text-sm mb-7">
        Sign in with your username and password
      </p>
      <form action="" className="text-center">
        <Input
          inputPlaceholder="Username"
          inputName="username"
          inputType="text"
        />
        <Input
          inputPlaceholder="Password"
          inputName="password"
          inputType="password"
        />
        <button className="rounded-md bg-blue-600 text-white hover:bg-indigo-600 w-[100%] text-center self-center p-2 mt-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
