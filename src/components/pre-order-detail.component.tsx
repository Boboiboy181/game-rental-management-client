import { Button, Divider, Space, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../utils/format-date.function';
import { PreOrder } from '../types/pre-order.type';
import Table, { ColumnsType } from 'antd/es/table';
import { formatPrice } from '../utils/format-price.function';
import { calculatePrice } from '../utils/caculate-price.function';
import { createRental } from '../api/rental.service';
import { deletePreOrder, getPreOrder } from '../api/pre-order.service';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  productName: string;
  price: number;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
};

const PreOrderDetail = () => {
  const { preOrderID } = useParams();
  const navigate = useNavigate();
  const handleCloseDetailBtn = () => navigate('/pre-orders');
  const [preOrder, setPreOrder] = useState<PreOrder>({} as PreOrder);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreOrder = async () => {
      const preOrderData = await getPreOrder(preOrderID);
      setPreOrder(preOrderData);
      setLoading(false);
    };

    fetchPreOrder();
  }, [setPreOrder]);

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

  const data = preOrder.rentedGames.map((rentedGame, index) => ({
    key: index,
    productName: rentedGame.game.productName,
    price: rentedGame.game.price,
    preOrderQuantity: rentedGame.preOrderQuantity,
    numberOfRentalDays: rentedGame.numberOfRentalDays,
    returnDate: formatDate(rentedGame.returnDate.toString()),
  }));

  const handleCreateBtn = async (preOrderID: string | undefined) => {
    if (!preOrderID) return;

    try {
      const rentalTicket = await createRental({ preOrderID });
      const { _id } = rentalTicket;
      navigate(`/rentals/${_id}`);
      await deletePreOrder(preOrderID);
    } catch (error) {
      console.log('Error creating rental:', error);
    }
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <Space className="flex flex-col items-start">
        <Text className="text-2xl font-semibold">Phiếu đặt trước</Text>
        <p className="text-xs text-black/40">
          Ngày lập phiếu {formatDate(preOrder.createdAt.toString())}
        </p>
      </Space>
      <Space className="mt-6">
        <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
          <p className="text-xs text-black/40">Số điện thoại</p>
          <p className="mt-2">{preOrder.customer.phoneNumber}</p>
        </div>
        <div className="flex flex-col border-black/20 border-b pb-1">
          <p className="text-xs text-black/40">Tên khách hàng</p>
          <p className="mt-2">{preOrder.customer.customerName}</p>
        </div>
      </Space>
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
            className="bg-blue-500"
            type="primary"
            onClick={handleCloseDetailBtn}
          >
            Đóng
          </Button>
          <Button
            className="bg-green-600"
            type="primary"
            onClick={() => handleCreateBtn(preOrderID)}
          >
            Tạo phiếu thuê
          </Button>
        </Space>
        <p className="text-xl">
          Tổng tiền:{' '}
          <span className="font-semibold text-red-600">
            {formatPrice.format(preOrder.estimatedPrice)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PreOrderDetail;
