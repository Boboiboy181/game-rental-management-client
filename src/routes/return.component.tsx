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
  paymentState: string;
  estimatedPrice: number;
  createdAt: string;
};

const ReturnTicket = () => {
  const [returnTickets, setReturnTickets] = useState<Return[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReturnTicket = async () => {
      try {
        const { data }: { data: Return[] } = await axios.get(
          'https://game-rental-management-app-yh3ve.ondigitalocean.app/return'
        );
        setReturnTickets(data);
      } catch (error) {
        console.log('Error fetching return tickets:', error);
      }
    };

    fetchReturnTicket();
  }, []);

  const formatCreatedAt = (date: Date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Tổng tiền thuê',
      dataIndex: 'estimatedPrice',
      align: 'center',
      key: 'estimatedPrice',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'center',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentState',
      align: 'center',
      key: 'paymentState',
    },
    {
      title: 'Thao tác',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Button type="primary" className="bg-blue-600" onClick={() => handleDetailBtn(record.key)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  const data: DataType[] = returnTickets.map((returnTicket) => ({
    key: returnTicket._id,
    customer: returnTicket.customer,
    paymentState: returnTicket.paymentState,
    estimatedPrice: returnTicket.estimatedPrice,
    createdAt: formatCreatedAt(new Date(returnTicket.createdAt)), // Convert createdAt to a Date object before formatting
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
      setReturnTickets(data);
      setSelectedRowKeys([]);
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <Fragment>
      <div className="w-[1080px] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10">
        <Space className="flex justify-between">
          <Text className="text-2xl font-semibold">Phiếu trả</Text>
          <div className="input-field">
            <input
              className="px-4"
              type="search"
              placeholder="Tên khách hàng"
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
          <Button danger type="primary" onClick={handleDeleteBtn}>
            Xóa
          </Button>
        </Space>
      </div>
    </Fragment>
  );
};

export default ReturnTicket;
