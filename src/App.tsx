import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd';
import { useContext, useEffect } from 'react';
import RouteWrapper from './routes/routes-wrapper.tsx';
import { UserContext } from './context/user.context.tsx';
import { getCurrentUser } from './api/auth.service.ts';

const App = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
    document.body.style.fontFamily = 'Be Vietnam Pro, sans-serif';
  }, []);

  return (
    <ConfigProvider>
      <RouteWrapper />
    </ConfigProvider>
  );
};

export default App;
