import { Button, Divider, Input, Space, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils/format-date.function';
import Table, { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  productName: string;
  price: number;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
};

const defaultFormFields = {
  phoneNumber: '',
  customerName: '',
  deposit: 0,
};

const AddRentalComponent = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { phoneNumber, customerName, deposit } = formFields;
  const { preOrderID } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'preOrderQuantity',
      align: 'center',
    },
    {
      title: 'Số ngày thuê',
      dataIndex: 'numberOfRentalDays',
      align: 'center',
    },
    {
      title: 'Đơn giá',
      align: 'center',
    },
    {
      title: 'Tổng tiền',
      align: 'center',
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Button type="primary" danger className="bg-blue-600">
          Xóa
        </Button>
      ),
    },
  ];

  const handleCloseBtn = () => {
    navigate('/rentals');
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <form action="">
        <Space className="flex flex-col items-start">
          <Text className="text-3xl font-semibold">Phiếu thuê</Text>
          <p className="text-xs text-black/40">
            Ngày lập phiếu {formatDate(new Date().toString())}
          </p>
        </Space>
        <div className="flex items-end justify-between">
          <Space className="mt-8">
            <div className="flex flex-col border-b-black/20 border-b w-[180px] mr-5">
              <p className="text-xs text-black/40">Số điện thoại</p>
              <Input
                className="p-0 py-1"
                allowClear
                required
                bordered={false}
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col border-b-black/20 border-b w-[180px] mr-5">
              <p className="text-xs text-black/40">Tên khách hàng</p>
              <Input
                className="p-0 py-1"
                allowClear
                required
                bordered={false}
                type="text"
                name="customerName"
                value={customerName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col border-b-black/20 border-b w-[180px]">
              <p className="text-xs text-black/40">Tiền đặt cọc</p>
              <Input
                className="p-0 py-1"
                allowClear
                required
                bordered={false}
                type="number"
                name="deposit"
                value={deposit}
                onChange={handleChange}
              />
            </div>
          </Space>
          <Button>+ Thêm sản phẩm</Button>
        </div>
        <div className="text-right my-5">
          <Table
            columns={columns}
            // dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <Space direction="horizontal" className="relative top-[-9%]">
            <Button
              className="bg-blue-500"
              type="primary"
              onClick={handleCloseBtn}
            >
              Đóng
            </Button>
            <Button
              className="bg-green-600"
              type="primary"
              htmlType="submit"
              // onClick={handleCreateBtn}
            >
              Tạo phiếu trả
            </Button>
          </Space>
          <p className="text-xl">
            Tổng tiền: <span className="font-semibold text-red-600">0</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddRentalComponent;
