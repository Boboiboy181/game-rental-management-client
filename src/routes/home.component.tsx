import { Content } from 'antd/es/layout/layout';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { useContext, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { setNavigationKey } = useContext(NavigationKeyContexts);
  const navigate = useNavigate();

  useEffect(() => {
    setNavigationKey('0');
  }, []);

  const handleLoginBtn = () => {
    navigate('/auth/login');
  };

  return (
    <Content className="flex flex-col justify-center items-center text-5xl p-6 mx-6 my-4 bg-white rounded-md font-cursive">
      Welcome to the game store management app !
      <Button size="large" onClick={handleLoginBtn} className="mt-9">
        Đăng nhập
      </Button>
    </Content>
  );
};

export default Home;
