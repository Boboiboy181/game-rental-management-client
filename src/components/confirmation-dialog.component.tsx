import { Button, Space, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';

const { Text } = Typography;

const DeleteConfirmationDialog = ({
  setOpenConfirmation,
  onConfirm,
}: {
  setOpenConfirmation: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}) => {

  const onCancel = () => {
    setOpenConfirmation(false);
  };

  return (
    <div className="fixed w-full h-full">
      <div
        className="absolute flex flex-col justify-between rounded-lg bg-white
        mt-6 p-6 left-[28%] top-[30%] shadow-[0px_50px_60px_5px_rgba(0,0,0,0.3)]"
      >
        <h1 className="text-2xl  text-center font-semibold mb-6">
          Xác nhận xóa
        </h1>
        <Text className=" text-center mb-6 text-xl">
          Bạn có chắc chắn muốn xóa 🧐
        </Text>
        <Space className={'flex justify-between items-center'}>
          <Button
            type="primary"
            className="bg-red-500 hover:!bg-red-400 w-[70px]"
            onClick={onCancel}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500"
            onClick={onConfirm}
          >
            Xác nhận
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
