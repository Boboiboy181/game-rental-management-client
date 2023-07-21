import { Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreOrder } from '../types/pre-order.type';
import { formatDate } from '../utils/format-date.function';
import { formatPrice } from '../utils/format-price.function';
import { deletePreOrder, getPreOrders } from '../api/pre-order.service';
import ShowData from '../components/page.component';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';

type DataType = {
  key: string;
  preOrderCode: string;
  customerName: string;
  estimatedPrice: string;
  createdAt: string;
  createdAtDate: Date;
};

const PreOrderPage = () => {
  const [preOrders, setPreorder] = useState<PreOrder[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [filteredPreorders, setFilteredPreorders] =
    useState<PreOrder[]>(preOrders);
  const [searchField, setSearchField] = useState('');
  const navigate = useNavigate();

  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('4');
    const fetchCustomers = async () => {
      const preOrderData: PreOrder[] = await getPreOrders();
      setPreorder(preOrderData);
    };

    fetchCustomers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    const newFilterPreOrders = preOrders.filter((preOrder) =>
      preOrder.preOrderCode.toLowerCase().includes(searchField),
    );
    setFilteredPreorders(newFilterPreOrders);
  }, [searchField, preOrders]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã đặt trước',
      dataIndex: 'preOrderCode',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Giá ước tính',
      dataIndex: 'estimatedPrice',
      align: 'center',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      align: 'center',
      render: (_, record) => {
        const status = {
          color: '',
          text: '',
        };
        let countHours = 0;
        const dateString = record.createdAtDate; 
        const createdAtDate = new Date(dateString);
        if (createdAtDate instanceof Date && !isNaN(createdAtDate.getTime())) {
          countHours =
            Math.abs(new Date().getTime() - createdAtDate.getTime()) / 3600000;
        } else {
          console.log('Invalid createdAtDate.');
        }
        if (countHours < 6) {
          status.text = 'Đang chờ';
          status.color = 'green';
        }
        if (countHours >= 6) {
          status.text = 'Đã hủy';
          status.color = 'red';
        }
        return (
          <Tag key={status.text} color={status.color} className="ml-2">
            {status.text}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
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
    preOrderCode: preOrder.preOrderCode,
    customerName: preOrder.customer.customerName,
    estimatedPrice: formatPrice.format(preOrder.estimatedPrice),
    createdAt: formatDate(preOrder.createdAt.toString()),
    createdAtDate: preOrder.createdAt,
  }));

  const rowSelection = {
    onChange: (selectedKeys: string[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDeleteBtn = async () => {
    try {
      // Delete selected rows
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await deletePreOrder(key);
        }),
      );

      // Fetch updated products data
      const preOrderData: PreOrder[] = await getPreOrders();
      setPreorder(preOrderData);
      setSelectedRowKeys([]);

      // Refresh the page by updating the searchField state
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  const handleDetailBtn = async (key: string) => {
    navigate(`/pre-orders/${key}`);
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <ShowData
        pageName="Phiếu đặt trước"
        placeHolder="Mã phiếu đặt trước"
        inputName="searchField"
        inputValue={searchField}
        handleChange={handleChange}
        rowSelection={rowSelection}
        columns={columns}
        data={data}
      />
      <Space direction="horizontal" className="relative top-[-9%]">
        <Button danger type="primary" onClick={handleDeleteBtn}>
          Xóa
        </Button>
      </Space>
    </div>
  );
};

export default PreOrderPage;
