import { Content } from 'antd/es/layout/layout';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { useContext, useEffect } from 'react';

const Home = () => {
  const { setNavigationKey } = useContext(NavigationKeyContexts);
  
  useEffect(() => {
    setNavigationKey('0');
  }, []);

  return (
    <Content className="flex justify-center items-center text-5xl p-6 mx-6 my-4 bg-white rounded-md font-cursive">
      Welcome to the game store management app !
    </Content>
  );
};

export default Home;
