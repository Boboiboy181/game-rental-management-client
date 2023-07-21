import { Spin } from 'antd';

const IsCreating = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 flex items-center justify-center">
      <Spin size="large" tip="Loading...">
        <div className="mr-20 text-black"></div>
      </Spin>
    </div>
  );
};

export default IsCreating;
