import { Route, Routes } from 'react-router-dom';
import privateRoutes from './routes';
import MainLayout from './main-layout.component';
import { useContext } from 'react';
import { UserContext } from '../context/user.context';

const RouteWrapper = () => {
  const {user} = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {privateRoutes.map(
          (route, index) => {
            if (route.isPrivate && user) {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            } else if (!route.isPrivate) {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            } else return true;
          },
        )}
      </Route>
    </Routes>
  );
};

export default RouteWrapper;
