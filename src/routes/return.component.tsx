import { Button, Space, Tag } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { Return } from '../types/return.type';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import PageComponent from '../components/page.component.tsx';
import { formatPrice } from '../utils/format-price.function.ts';
import { deleteReturn, getReturns } from '../api/return.service.ts';
import { formatDate } from '../utils/format-date.function.ts';

type DataType = {
  key: React.Key;
  customer: string;
  paymentState: string;
  estimatedPrice: string;
  createdAt: string;
};

const ReturnPage = () => {
  const [returnTickets, setReturnTickets] = useState<Return[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReturnTicket = async () => {
      try {
        const returnList: Return[] = await getReturns();
        setReturnTickets(returnList);
      } catch (error) {
        console.log('Error fetching return tickets:', error);
      }
    };

    fetchReturnTicket();
  }, []);

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
      title: 'Ngày trả',
      dataIndex: 'createdAt',
      align: 'center',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentState',
      align: 'center',
      key: 'paymentState',
      render: (_, { paymentState }) => {
        let color = 'green';
        if (paymentState === 'NOT_PAID') color = 'red';
        if (paymentState === 'NOT_ENOUGH') color = 'orange';
        return (
          <Tag key={paymentState} color={color} className="ml-2">
            {paymentState}
          </Tag>
        );
      },
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

  const data: DataType[] = returnTickets.map((returnTicket) => ({
    key: returnTicket._id,
    customer: returnTicket.customer.customerName,
    paymentState: returnTicket.paymentState,
    estimatedPrice: formatPrice.format(returnTicket.estimatedPrice),
    createdAt: formatDate(returnTicket.createdAt.toString()), // Convert createdAt to a Date object before formatting
  }));

  const handleDetailBtn = (key: React.Key) => {
    navigate(`/returns/${key}`);
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
          await deleteReturn(key as string);
        }),
      );

      // Fetch updated return tickets data
      const returnList: Return[] = await getReturns();

      // Update return tickets state and selectedRowKeys state
      setReturnTickets(returnList);
      setSelectedRowKeys([]);
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <Fragment>
      <div
        className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%]
      translate-x-[-50%] translate-y-[-30%] p-10"
      >
        <PageComponent
          pageName="Phiếu trả"
          columns={columns}
          data={data}
          rowSelection={rowSelection}
          placeHolder="Tên khách hàng"
          inputName="searchField"
          inputValue={searchField}
          handleChange={handleChange}
        />
        <Space direction="horizontal" className="relative top-[-9%]">
          <Button
            danger
            type="primary"
            className="bg-blue-600 "
            onClick={handleDeleteBtn}
          >
            Xóa
          </Button>
        </Space>
      </div>
    </Fragment>
  );
};

export default ReturnPage;
