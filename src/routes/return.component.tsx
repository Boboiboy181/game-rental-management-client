import { Space, Typography, Divider, Button } from 'antd';
import Table from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

const Return = () => {
  const [returns, setReturns] = useState<Return[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchReturns = async () => {
      const { data }: { data: Return[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/returns',
      );
      setReturns(data);
    };

    fetchReturns();
  }, []);

  const columns = [
    {
      title: 'Return ID',
      dataIndex: 'returnId',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Product',
      dataIndex: 'productName',
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  const data = returns.map((returnItem) => ({
    key: returnItem.returnId,
    returnId: returnItem.returnId,
    customerName: returnItem.customerName,
    productName: returnItem.productName,
    returnDate: returnItem.returnDate,
    status: returnItem.status,
  }));

  const [searchField, setSearchField] = useState('');

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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/returns/${key}`,
          );
        }),
      );

      // Fetch updated returns data
      const { data }: { data: Return[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/returns',
      );
      // Update returns state and selectedRowKeys state
      setReturns(data);
      setSelectedRowKeys([]);

      // Refresh the page by updating the searchField state
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <div className="w-[1080px] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10">
      <Space className="flex justify-between">
        <Text className="text-2xl font-semibold">Returns</Text>
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Search return"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Search return</label>
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
          Delete
        </Button>
        <Button type="primary" className="bg-green-600">
          Edit
        </Button>
      </Space>
    </div>
  );
};

export default Return;
