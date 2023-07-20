import { Button, Divider, Space, Spin, Table, Tag, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Invoice } from '../types/invoice.type';
import axios from 'axios';
import { formatDate } from '../utils/format-date.function';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts';
import { formatPrice } from '../utils/format-price.function.ts';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  returnCode: string;
  rentalCode: string;
  customer: string;
  paymentState: string;
  estimatedPrice: string;
  createdAt: string;
};
const InvoiceDetail = () => {
  const { invoiceID } = useParams();
  const [invoice, setInvoice] = useState<Invoice>({} as Invoice);
  const { setNavigationKey } = useContext(NavigationKeyContexts);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setNavigationKey('7');
    const fetchInvoice = async () => {
      const { data }: { data: Invoice } = await axios.get(
        `http://localhost:3000/invoice/${invoiceID}`,
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
    ); // Render a loading state while fetching the data
  }

  console.log(invoice);
  

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
            {/* <p className="mt-2">{invoice.returnCode}</p> */}
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
      </div>
      <div>
        <Divider />
        <Table
          //   columns={columns}
          //   dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <div className="flex justify-between items-center">
        <Space direction="horizontal" className="relative top-[-9%]">
          <Button
            className="bg-blue-500 shadow-xl"
            type="primary"
            // onClick={handleCloseDetailBtn}
          >
            Đóng
          </Button>
          <Button
            className="bg-green-600 hover:!bg-green-500 shadow-xl"
            type="primary"
            // onClick={handleCreateInvoiceBtn}
            // disabled={returnTicket.paymentState === 'PAID'}
          >
            Tạo hóa đơn
          </Button>
        </Space>
        <Space className="flex flex-col items-end">
          <p className="text-lg">
            Tổng tiền phạt:{' '}
            {invoice.fine ? (
              <span className="font-semibold text-red-600">
                {formatPrice.format(invoice.fine)}
              </span>
            ) : (
              <span className="font-semibold text-red-600">
                {formatPrice.format(0)}
              </span>
            )}
          </p>
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
