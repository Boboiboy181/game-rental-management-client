import { Button, Divider, Space, Spin, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Invoice } from '../types/invoice.type';
import axios from 'axios';
import Table, { ColumnsType } from 'antd/es/table';
import { formatDate } from '../utils/format-date.function';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts';
import { formatPrice } from '../utils/format-price.function.ts';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  returnCode: string;
  rentalCode: string;
  price: string;
  customer: string;
  productName: string;
  numberOfRentalDays: number;
  finalPrice: string;
  createdAt: string;
  returnDate: string;
};

const InvoiceDetail = () => {
  const { invoiceID } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice>({} as Invoice);
  const { setNavigationKey } = useContext(NavigationKeyContexts);
  const [loading, setIsLoading] = useState(true);
  const handleCloseDetailBtn = () => navigate('/invoices');

  useEffect(() => {
    setNavigationKey('7');
    const fetchInvoice = async () => {
      const { data }: { data: Invoice } = await axios.get(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/invoice/${invoiceID}`
      );
      setInvoice(data);
      setIsLoading(false);
    };

    fetchInvoice();
  }, [invoiceID]);

  if (loading) {
    return (
      <Spin className="text-lg mt-[30%]" size="large" tip="Loading">
        <div className="content"></div>
      </Spin>
    );
  }

  console.log(invoice);
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: " Giá thuê",
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: " Số ngày thuê",
      dataIndex: 'numberOfRentalDays',
      align: 'center',
    },
    {
      title: " Ngày trả",
      dataIndex: 'returnDate',
    },
    {
      title: 'Ngày lập phiếu',
      dataIndex: 'createdAt',
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'finalPrice',
      align: 'center',
    },
  ];

  const dataSource: DataType[] = [
    {
      key: invoice.return._id,
      returnCode: invoice.return.returnCode,
      rentalCode: invoice._id,
      customer: invoice.customer.customerName,
      productName: invoice.rentedGames[0].game.productName,
      finalPrice: formatPrice.format(invoice.finalPrice),
      createdAt: formatDate(invoice.rentedGames[0].returnDate.toString()), // Convert Date to string
      returnDate: formatDate(invoice.rentedGames[0].returnDate.toString()),
      price: formatPrice.format(invoice.rentedGames[0].game.price),
      numberOfRentalDays: invoice.rentedGames[0].numberOfRentalDays,
    },
  ];

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <Space className="flex flex-col items-start">
        <Text className="text-3xl font-semibold">
          Hóa đơn{' '}
          <span className={'text-gray-400 font-light ml-1'}>
            #{invoice.invoiceID}
          </span>
        </Text>
        <p className="text-xs text-black/40">
          Ngày lập phiếu {formatDate(invoice.createdAt)}
        </p>
      </Space>
      <div className="flex items-end justify-between">
        <Space className="mt-6">
          <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Mã phiếu trả</p>
            {<p className="mt-2">{invoice.return.returnCode}</p>}
          </div>
          <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Số điện thoại</p>
            <p className="mt-2">{invoice.customer.phoneNumber}</p>
          </div>
          <div className="flex flex-col border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Tên khách hàng</p>
            <p className="mt-2">{invoice.customer.customerName}</p>
          </div>
        </Space>
        <p className="text-lg">
          Mã giảm giá: {' '}
          <span className="font-semibold text-red-600">
            {/* {voucherCode ? voucherCode : ''} */}
          </span>
        </p>
      </div>
      <div>
        <Divider />
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
      </div>
      <div className="flex justify-between items-center">
      <Button
            className="bg-blue-500 shadow-xl"
            type="primary"
            onClick={handleCloseDetailBtn}
          >
            Đóng
          </Button>
        {/* ... */}
      </div>
    </div>
  );
};

export default InvoiceDetail;
