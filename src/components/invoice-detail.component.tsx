import { Button, Divider, Space, Spin, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Invoice } from '../types/invoice.type';
import axios from 'axios';
import Table, { ColumnsType } from 'antd/es/table';
import { formatDate } from '../utils/format-date.function';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts';
import { formatPrice } from '../utils/format-price.function.ts';
import { calculatePrice } from '../utils/caculate-price.function.ts';
import { Voucher } from '../types/voucher.type.ts';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  productName: string;
  price: number;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  dayPastDue: number;
  returnDate: string;
  fine: number;
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
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/invoice/${invoiceID}`,
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
      render: (_, record) =>
        record.dayPastDue > 0 ? (
          <span>{record.dayPastDue}</span>
        ) : (
          <span>0</span>
        ),
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

  const data = invoice.rentedGames.map((rentedGame, index) => ({
    key: index,
    productName: rentedGame.game.productName,
    price: rentedGame.game.price,
    preOrderQuantity: rentedGame.preOrderQuantity,
    numberOfRentalDays: rentedGame.numberOfRentalDays,
    dayPastDue: rentedGame.daysPastDue,
    fine: rentedGame.fine,
    returnDate: formatDate(rentedGame.returnDate.toString()),
  }));

  const calculateDiscount = (voucher: Voucher) => {
    if (!voucher.voucherName) return 0;
    const { voucherValue } = voucher;
    return invoice.finalPrice * (voucherValue / 100);
  };

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
        {invoice.voucher ? (
          <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Mã giảm giá</p>
            <p className="mt-2">{invoice.voucher.voucherCode}</p>
          </div>
        ) : null}
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
        <Button
          className="shadow-xl"
          type="primary"
          danger={true}
          onClick={handleCloseDetailBtn}
        >
          Đóng
        </Button>
        <Space className="flex flex-col items-end">
          {invoice.fine > 0 ? (
            <p className="text-lg">
              Phạt:{' '}
              <span className="font-semibold text-red-600">
                {formatPrice.format(invoice.fine)}
              </span>
            </p>
          ) : (
            <p className="text-lg">
              Phạt:{' '}
              <span className="font-semibold text-red-600">
                {formatPrice.format(0)}
              </span>
            </p>
          )}
          {invoice.voucher ? (
            <p className="text-lg">
              Giảm:{' '}
              <span className="font-semibold text-red-600">
                {formatPrice.format(calculateDiscount(invoice.voucher))}
              </span>
            </p>
          ) : (
            <p className="text-lg">
              Giảm:{' '}
              <span className="font-semibold text-red-600">
                {formatPrice.format(0)}
              </span>
            </p>
          )}
          <p className="text-2xl">
            Tổng tiền:{' '}
            <span className="font-semibold text-red-600">
              {formatPrice.format(invoice.finalPrice)}
            </span>
          </p>
        </Space>
      </div>
    </div>
  );
};

export default InvoiceDetail;
