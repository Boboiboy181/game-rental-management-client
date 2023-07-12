import { Button, Divider, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../utils/format-date.function';
import Table, { ColumnsType } from 'antd/es/table';
import { formatPrice } from '../utils/format-price.function';
import { calculatePrice } from '../utils/caculate-price.function';
import { Return } from '../types/return.type.ts';
import { getReturnByID } from '../api/return.service.ts';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  productName: string;
  price: number;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
  fine: number;
};

const ReturnDetail = () => {
  const { returnID } = useParams();
  const navigate = useNavigate();
  const handleCloseDetailBtn = () => navigate('/returns');
  const [returnTicket, setReturnTicket] = useState<Return>({} as Return);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRental = async () => {
      const data = await getReturnByID(returnID || '');
      setReturnTicket(data);
      setLoading(false);
    };

    fetchRental();
  }, [setReturnTicket]);

  if (loading) {
    return (
      <Spin className="text-lg mt-[30%]" size="large" tip="Loading">
        <div className="content"></div>
      </Spin>
    ); // Render a loading state while fetching the data
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: 'Ngày trả',
      dataIndex: 'returnDate',
    },
    {
      title: 'Số lượng',
      dataIndex: 'preOrderQuantity',
      align: 'center',
    },
    {
      title: 'Số ngày trễ hạn',
      dataIndex: 'dayPastDue',
      align: 'center',
    },
    {
      title: 'Tiền phạt',
      align: 'center',
      render: (_, record) => (
        <p className="font-semibold">{formatPrice.format(record.fine)}</p>
      ),
    },
    {
      title: 'Giá thuê',
      align: 'center',
      render: (_, record) => (
        <p className="font-semibold text-red-600">
          {formatPrice.format(
            record.preOrderQuantity *
              calculatePrice(record.price, record.numberOfRentalDays),
          )}
        </p>
      ),
    },
  ];

  const data = returnTicket.rentedGames.map((rentedGame, index) => ({
    key: index,
    productName: rentedGame.game.productName,
    price: rentedGame.game.price,
    preOrderQuantity: rentedGame.preOrderQuantity,
    numberOfRentalDays: rentedGame.numberOfRentalDays,
    dayPastDue: rentedGame.daysPastDue,
    fine: rentedGame.fine,
    returnDate: formatDate(rentedGame.returnDate.toString()),
  }));

  const handleCreateReturnBtn = () => {
    navigate(`/returns/create/${returnID}`);
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <Space className="flex flex-col items-start">
        <Text className="text-3xl font-semibold">
          Phiếu trả{' '}
          <span className={'text-gray-400 font-light ml-1'}>#RSE100</span>
        </Text>
        <p className="text-xs text-black/40">
          Ngày lập phiếu {formatDate(returnTicket.createdAt.toString())}
        </p>
      </Space>
      <div className="flex items-end justify-between">
        <Space className="mt-6">
          <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Mã phiếu thuê</p>
            <p className="mt-2">SE100</p>
          </div>
          <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Số điện thoại</p>
            <p className="mt-2">{returnTicket.customer.phoneNumber}</p>
          </div>
          <div className="flex flex-col border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Tên khách hàng</p>
            <p className="mt-2">{returnTicket.customer.customerName}</p>
          </div>
        </Space>
        <p className="text-lg">
          Tiền đặt cọc{' '}
          <span className="font-semibold text-red-600">
            {formatPrice.format(returnTicket.deposit)}
          </span>
        </p>
      </div>
      <div>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <div className="flex justify-between items-center">
        <Space direction="horizontal" className="relative top-[-9%]">
          <Button
            className="bg-blue-500 shadow-xl"
            type="primary"
            onClick={handleCloseDetailBtn}
          >
            Đóng
          </Button>
          <Button
            className="bg-green-600 hover:!bg-green-500 shadow-xl"
            type="primary"
            onClick={handleCreateReturnBtn}
            disabled={returnTicket.paymentState === 'RETURNED'}
          >
            Tạo hóa đơn
          </Button>
        </Space>
        <Space className="flex flex-col items-end">
          <p className="text-lg">
            Tổng tiền phạt:{' '}
            <span className="font-semibold text-red-600">
              {formatPrice.format(
                returnTicket.rentedGames.reduce((acc, currentValue) => {
                  return acc + currentValue.fine;
                }, 0),
              )}
            </span>
          </p>
          <p className="text-2xl">
            Tổng tiền:{' '}
            <span className="font-semibold text-red-600">
              {formatPrice.format(returnTicket.estimatedPrice)}
            </span>
          </p>
        </Space>
      </div>
    </div>
  );
};

export default ReturnDetail;
