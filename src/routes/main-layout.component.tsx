import React, { useContext, useState } from 'react';
import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { UserContext } from '../context/user.context.tsx';
import { logOut } from '../api/auth.service.ts';

const { Header, Sider } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { navigationKey, setNavigationKey } = useContext(NavigationKeyContexts);
  const { user } = useContext(UserContext);

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Khách hàng',
      path: '/customers',
      isPrivate: true,
    },
    {
      key: '2',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-controller"
          viewBox="0 0 16 16"
        >
          <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z" />
          <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" />
        </svg>
      ),
      label: 'Video game',
      path: '/video-games',
      isPrivate: true,
    },
    {
      key: '3',
      icon: <BookOutlined />,
      label: 'Gói thuê',
      path: '/rental-packages',
      isPrivate: true,
    },
    {
      key: '4',
      icon: <ContainerOutlined />,
      label: 'Phiếu đặt trước',
      path: '/pre-orders',
      isPrivate: true,
    },
    {
      key: '5',
      icon: <ContainerOutlined />,
      label: 'Phiếu thuê',
      path: '/rentals',
      isPrivate: true,
    },
    {
      key: '6',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-return-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      ),
      label: 'Phiếu trả',
      path: '/returns',
      isPrivate: true,
    },
    {
      key: '7',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-receipt"
          viewBox="0 0 16 16"
        >
          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
        </svg>
      ),
      label: 'Hóa đơn',
      path: '/invoices',
      isPrivate: true,
    },
  ];

  const navigate = useNavigate();
  const logoOnClick = () => navigate('/');
  const changeNavigationKey = (e: any) => setNavigationKey(e.key);

  const handleLogOut = () => {
    navigate('/');
    logOut();
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="flex items-center p-4 cursor-pointer"
          onClick={logoOnClick}
        >
          <img
            src="https://vitejs.dev/logo.svg"
            alt=""
            className="w-[40px] h-[40px]"
          />
          <div
            className={`text-2xl text-white ml-3 font-cursive ${
              collapsed ? 'invisible' : ''
            }`}
          >
            F4 Store
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['0']}
          selectedKeys={[navigationKey]}
        >
          {items.map((item) => {
            if (item.isPrivate && user) {
              return (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={changeNavigationKey}
                >
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              );
            } else {
              return null;
            }
          })}
        </Menu>
        {user && (
          <div className="text-center relative bottom-[-35%]">
            <Button
              danger
              size="large"
              className="hover:!bg-red-600 hover:!border-red-600"
              onClick={handleLogOut}
            >
              <span className="text-white">Đăng xuất</span>
            </Button>
          </div>
        )}
      </Sider>
      <Layout>
        <Header className="flex bg-white p-0 items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Text className="font-semibold text-xl">
            Game Rental Management App
          </Text>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
