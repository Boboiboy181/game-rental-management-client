import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useState } from 'react';
import { Invoice } from '../types/invoice.type';
import { formatPrice } from '../utils/format-price.function.ts';
import { formatDate } from '../utils/format-date.function.ts';
import ShowData from '../components/page.component.tsx';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { deleteInvoice, getInvoices } from '../api/invoice.service.ts';

const { Text } = Typography;

type DataType = {
  key: string;
  invoiceID: string;
  returnCode: string;
  customerName: string;
  finalPrice: number;
  createdAt: string;
};

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredInvoice, setFilteredInvoice] = useState<Invoice[]>(invoices);
  const [searchField, setSearchField] = useState('');
  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('7');
    const fetchInvoice = async () => {
      const data = await getInvoices();
      setInvoices(data);
    };

    fetchInvoice();
  }, []);

  useEffect(() => {
    const newFilteredInvoice = invoices.filter((invoice) => {
      return invoice.invoiceID.toLowerCase().includes(searchField);
    });
    setFilteredInvoice(newFilteredInvoice);
  }, [invoices, searchField]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'invoiceID',
      width: '15%',
    },
    {
      title: 'Mã phiếu trả',
      dataIndex: 'returnCode',
      width: '15%',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Giá thuê cuối cùng',
      dataIndex: 'finalPrice',
      align: 'center',
      render: (price: number) => (
        <Text className="font-medium">{formatPrice.format(price)}</Text>
      ),
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'createdAt',
      align: 'center',
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: () => (
        <Button type="primary" className="bg-blue-600">
          Chi tiết
        </Button>
      ),
    },
  ];

  const data = filteredInvoice.map((invoice) => ({
    key: invoice._id,
    invoiceID: invoice.invoiceID,
    returnCode: invoice.return.returnCode,
    customerName: invoice.customer.customerName,
    finalPrice: invoice.finalPrice,
    createdAt: formatDate(invoice.createdAt),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  const rowSelection = {
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDeleteBtn = async () => {
    try {
      // Delete selected rows
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await deleteInvoice(key.toString());
        }),
      );

      // Fetch updated products data
      const data = await getInvoices();

      setInvoices(data);
      setSelectedRowKeys([]);
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <div
      className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%]
      translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl"
    >
      <ShowData
        pageName={'Hóa đơn'}
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        placeHolder={'Mã hóa đơn'}
        inputName={'invoiceID'}
        inputValue={searchField}
        handleChange={handleChange}
      />
      <Space direction="horizontal" className="relative top-[-9%]">
        <Button danger type="primary" onClick={handleDeleteBtn}>
          Xóa
        </Button>
      </Space>
    </div>
  );
};

export default InvoicePage;
