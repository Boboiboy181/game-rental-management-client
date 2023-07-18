import { Space, Typography, Divider, Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Invoice } from '../types/invoice.type';

const { Text } = Typography;


type DataType = {
  key: string;
  invoiceID: string;
  customer: string;
  finalprice: number;
};

const InvoicePage = () => {
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredInvoice, setFilteredInvoice] = useState<Invoice[]>(invoice);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    const newFilteredInvoice = invoice.filter((invoice) => {
      return invoice.customer.toLowerCase().includes(searchField);
    });
    setFilteredInvoice(newFilteredInvoice);
  }, [invoice, searchField]);

  const data = filteredInvoice.map((invoice) => ({
    key: invoice._id,
    customer: invoice.customer,
    finalprice: invoice.finalPrice,
  }));

  useEffect(() => {
    const fetchInvoice = async () => {
      const { data }: { data: Invoice[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/invoice',
      );
      setInvoice(data);
    };

    fetchInvoice();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'invoiceID',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Giá thuê cuối cùng',
      dataIndex: 'price',
      align: 'left',
      render: (price: number) => <Text className="font-medium">{price}</Text>,
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Button type="primary" className="bg-blue-600">
          Chi tiết
        </Button>
      ),
    },
  ];

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
          await axios.delete(
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/invoice/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: Invoice[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/invoice',
      );

      setInvoice(data);
      setSelectedRowKeys([]);
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <div className="w-[1080px] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10">
      <Space className="flex justify-between">
        <Text className="text-2xl font-semibold">Hóa đơn</Text>
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Search rentalform"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Tìm kiếm hóa đơn</label>
        </div>
      </Space>
      <div>
        <Divider />
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize:5 }}
        />
      </div>
      <Space direction="horizontal" className="relative top-[-9%]">
        <Button type="primary" className="bg-blue-500">
          Thêm
        </Button>
        <Button danger type="primary" onClick={handleDeleteBtn}>
          Xóa
        </Button>
        <Button type="primary" className="bg-green-600">
          Sửa
        </Button>
      </Space>
    </div>
  );
};

export default InvoicePage;
