import { Space, Typography, Divider, Button } from 'antd';
import Table from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Customer } from '../types/customer.type';

const { Text } = Typography;

// // rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       'selectedRows: ',
//       selectedRows,
//     );
//   },
// };

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data }: { data: Customer[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/customer',
      );
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'point',
      dataIndex: 'point',
    }
  ];

  const data = customers.map((customer) => ({
    key: customer._id,
    customerName: customer.customerName,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
    point: customer.point,
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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/customer/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: Customer[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/customer',
      );
      // Update customer state and selectedRowKeys state
      setCustomers(data);
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
        <Text className="text-2xl font-semibold">Customer</Text>
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Search customer"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Search customer</label>
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

export default CustomerPage;