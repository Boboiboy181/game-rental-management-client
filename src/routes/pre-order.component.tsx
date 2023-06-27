import { Space, Typography, Divider, Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PreOrder } from '../types/pre-order.type';
import { formatDate } from '../utils/format-date.function';
import { formatPrice } from '../utils/format-price.function';
const { Text } = Typography;

type DataType = {
  key: React.Key;
  customerName: string;
  estimatedPrice: string;
  createdAt: string;
};

const PreOrderPage = () => {
  const [preOrders, setPreorder] = useState<PreOrder[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredPreorders, setFilteredPreorders] =
    useState<PreOrder[]>(preOrders);
  const [searchField, setSearchField] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data }: { data: PreOrder[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/pre-order',
      );
      setPreorder(data);
    };

    fetchCustomers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    const newFilterPreOrders = preOrders.filter((preOrder) =>
      preOrder.customer.customerName.toLowerCase().includes(searchField),
    );
    setFilteredPreorders(newFilterPreOrders);
  }, [searchField, preOrders]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    {
      title: 'Estimated Price',
      dataIndex: 'estimatedPrice',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          className="bg-blue-600"
          onClick={() => handleDetailBtn(record.key)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const data = filteredPreorders.map((preOrder) => ({
    key: preOrder._id,
    customerName: preOrder.customer.customerName,
    estimatedPrice: formatPrice.format(preOrder.estimatedPrice),
    createdAt: formatDate(preOrder.createdAt.toString()),
  }));

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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/pre-order/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: PreOrder[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/pre-order',
      );
      // Update customer state and selectedRowKeys state
      setPreorder(data);
      setSelectedRowKeys([]);

      // Refresh the page by updating the searchField state
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  const handleDetailBtn = (key: React.Key) => {
    navigate(`/pre-orders/${key}`);
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <Space className="flex justify-between">
        <Text className="text-2xl font-semibold">Pre-Order</Text>
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Search customer"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Search pre-order</label>
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
          pagination={{ pageSize: 5 }}
        />
      </div>
      <Space direction="horizontal" className="relative top-[-9%]">
        <Button danger type="primary" onClick={handleDeleteBtn}>
          Xóa
        </Button>
      </Space>
    </div>
  );
};

export default PreOrderPage;
