import { Space, Typography, Divider, Button, Table } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Return } from '../types/return.type';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
const { Text } = Typography;

type DataType = {
  key: React.Key;
  customer: string;
  price: number;
  createdAt: string;
};

const RentalPackage = () => {
    const [rentalPackages, setRentalPackages] = useState<RentalPackage[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchRentalPackages = async () => {
      try {
        const { data }: { data: Return[] } = await axios.get(
          'https://game-rental-management-app-yh3ve.ondigitalocean.app/return'
        );
        setRentalPackages(data);
      } catch (error) {
        console.log('Error fetching return tickets:', error);
      }
    };

    fetchRentalPackages();
  }, []);

  const formatCreatedAt = (date: Date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  };

  const columns: ColumnsType<DataType> = [
    {
        title: '#',
        dataIndex: 'index',
        align: 'center',
        render: (_, __, index) => index + 1,
      },
    {
      title: 'Tên gói thuê',
      dataIndex: 'rentalPackageName',
      key: 'rentalPackageName',
    },
    {
      title: 'Số lượng cho thuê',
      dataIndex: 'rentalQuantity',
      align: 'center',
      key: 'rentalQuantity',
    },
    {
      title: 'Thời gian cho thuê',
      dataIndex: 'rentalTime',
      align: 'center',
      key: 'rentalTime',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
    },
  ];

  const data: DataType[] = rentalPackages.map((rentalPackage) => ({
    key: rentalPackage._id,
    customer: rentalPackage.customer,
    price: rentalPackage.price,
    estimatedPrice: rentalPackage.estimatedPrice,
    createdAt: formatCreatedAt(new Date(rentalPackage.createdAt)), // Convert createdAt to a Date object before formatting
  }));

  const handleDetailBtn = (key: React.Key) => {
    navigate(`/return/${key}`);
  };

  const [searchField, setSearchField] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/return/${key}`
          );
        })
      );

      // Fetch updated return tickets data
      const { data }: { data: Return[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/return'
      );

      // Update return tickets state and selectedRowKeys state
      setRentalPackages(data);
      setSelectedRowKeys([]);
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <Fragment>
      <div className="w-[1080px] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10">
        <Space className="flex justify-between">
          <Text className="text-2xl font-semibold">Gói thuê</Text>
          <div className="input-field">
            <input
              className="px-4"
              type="search"
              placeholder="Tìm kiếm gói thuê"
              name="searchField"
              value={searchField}
              onChange={handleChange}
            />
            <label htmlFor="searchField">Tên khách hàng</label>
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
    </Fragment>
  );
};

export default RentalPackage;
