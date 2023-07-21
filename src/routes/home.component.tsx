import { Content } from 'antd/es/layout/layout';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { useContext, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context.tsx';

const { Text } = Typography;

const Home = () => {
  const { setNavigationKey } = useContext(NavigationKeyContexts);
  const { user } = useContext(UserContext);
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
      {!user ? (
        <Button size="large" onClick={handleLoginBtn} className="mt-9">
          Đăng nhập
        </Button>
      ) : (
        <Text className="mt-9 text-2xl font-cursive text-blue-600">Chào mừng {user}</Text>
      )}
    </Content>
  );
};

export default Home;
