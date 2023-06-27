import { Space, Typography, Divider, Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Rental } from '../types/rental.type';
import { formatPrice } from '../utils/format-price.function';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  customerName: string;
  deposit: number;
  returnState: string;
  estimatedPrice: string;
};

const RentalPage = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRental = async () => {
      const { data }: { data: Rental[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental',
      );
      setRentals(data);
    };

    fetchRental();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Tiền đặt cọc',
      dataIndex: 'deposit',
      align: 'center',
    },
    {
      title: 'Trạng thái trả',
      dataIndex: 'returnState',
      align: 'center',
    },
    {
      title: 'Giá trị ước tính',
      dataIndex: 'estimatedPrice',
      align: 'center',
    },
    {
      title: 'Thao tác',
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

  const data = rentals.map((rental) => ({
    key: rental._id,
    customerName: rental.customer.customerName,
    deposit: rental.deposit,
    returnState: rental.returnState,
    estimatedPrice: formatPrice.format(rental.estimatedPrice),
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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: Rental[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental',
      );
      // Update customer state and selectedRowKeys state
      setRentals(data);
      setSelectedRowKeys([]);

      // Refresh the page by updating the searchField state
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  const handleDetailBtn = (key: React.Key) => {
    navigate(`/rentals/${key}`);
  };

  return (
    <div className="w-[90%] h-[80%]s bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
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
          pagination={{ pageSize: 5 }}
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

export default RentalPage;
