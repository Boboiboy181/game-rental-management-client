import { Button, Divider, Input, Space, Spin, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/format-date.function.ts';
import Table, { ColumnsType } from 'antd/es/table';
import { formatPrice } from '../../utils/format-price.function.ts';
import { calculatePrice } from '../../utils/caculate-price.function.ts';
import { Rental } from '../../types/rental/rental.type.ts';
import { getRentalById, updateRental } from '../../api/rental.service.ts';
import { NavigationKeyContexts } from '../../context/navigation-key.context.ts.tsx';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  productName: string;
  price: number;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
};

const UpdateRental = () => {
  const { rentalID } = useParams();
  const navigate = useNavigate();
  const handleCloseDetailBtn = () => navigate(`/rentals/${rentalID}`);
  const [rental, setRental] = useState<Rental>({} as Rental);
  const [loading, setLoading] = useState(true);
  const [deposit, setDeposit] = useState<number>(0);

  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('5');

    const fetchRental = async () => {
      const data = await getRentalById(rentalID);
      setRental(data);
      setDeposit(data.deposit);
      setLoading(false);
    };

    fetchRental();
  }, [setRental]);

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
      title: 'Số ngày thuê',
      dataIndex: 'numberOfRentalDays',
      align: 'center',
    },
    {
      title: 'Đơn giá',
      align: 'center',
      render: (_, record) => (
        <p className="font-semibold">
          {formatPrice.format(
            record.preOrderQuantity *
              calculatePrice(record.price, record.numberOfRentalDays),
          )}
        </p>
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

  const data = rental.rentedGames.map((rentedGame, index) => ({
    key: index,
    productName: rentedGame.game.productName,
    price: rentedGame.game.price,
    preOrderQuantity: rentedGame.preOrderQuantity,
    numberOfRentalDays: rentedGame.numberOfRentalDays,
    returnDate: formatDate(rentedGame.returnDate.toString()),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeposit(Number(value));
  };

  const handleSaveReturnBtn = async () => {
    try {
      await updateRental(rentalID, { deposit: deposit });
    } catch (error) {
      console.log(error);
    }
    navigate(`/rentals/${rentalID}`);
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <Space className="flex flex-col items-start">
        <Text className="text-3xl font-semibold">Phiếu thuê</Text>
        <p className="text-xs text-black/40">
          Ngày lập phiếu {formatDate(rental.createdAt.toString())}
        </p>
      </Space>
      <div className="flex items-end justify-between">
        <Space className="mt-6">
          <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Số điện thoại</p>
            <p className="mt-2">{rental.customer.phoneNumber}</p>
          </div>
          <div className="flex flex-col border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Tên khách hàng</p>
            <p className="mt-2">{rental.customer.customerName}</p>
          </div>
        </Space>
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
            onClick={handleSaveReturnBtn}
          >
            Lưu
          </Button>
        </Space>
        <p className="text-xl">
          Tổng tiền:{' '}
          <span className="font-semibold text-red-600">
            {formatPrice.format(rental.estimatedPrice)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UpdateRental;
