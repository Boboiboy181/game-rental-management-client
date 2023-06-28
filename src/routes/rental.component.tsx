import { Space, Typography, Divider, Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Rental } from '../types/rental.type';
const { Text } = Typography;

type DataType = {
  key: React.Key;
  _id: string;
  customer: string;
  deposit: number;
  returnValue: number;
  returnState: string;
  estimatedPrice: number;
};

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

const Rental = () => {
  const [rentals, setRental] = useState<Rental[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredRental, setFilteredRental] = useState<Rental[]>(rentals);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    const fetchRental = async () => {
      const { data }: { data: Rental[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental',
      );
      setRental(data);
    };

    fetchRental();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    const newFilteredRental = Rental.filter((rental) =>
     Rental.customer.customerName.toLowerCase().includes(searchField),
    );
    setFilteredRental(newFilteredRental);
  }, [searchField, Rental]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'customer',
      dataIndex: 'customer',
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
    },
    {
      title: 'ReturnValue',
      dataIndex: 'returnvalue',
    },
    {
      title: 'ReturnState',
      dataIndex: 'returnstate',
    },
    {
      title: 'EstimatedPrice',
      dataIndex: 'estimatedprice',
    },
  ];

  const data = filteredRental.map((rental) => ({
    key: rental._id,
    customer: rental.customer,
    deposit: rental.deposit,
    returnvalue: rental.returnValue,
    returnstate: rental.returnState,
    estimatedprice: rental.estimatedPrice,
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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: Rental[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental',
      );
      // Update customer state and selectedRowKeys state
      setRental(data);
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
        <Text className="text-2xl font-semibold">Rental</Text>
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Search rentalform"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Search rental form</label>
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

export default Rental;