import { Button, Space, Tag } from 'antd';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Return } from '../types/return.type';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import PageComponent from '../components/page.component.tsx';
import { formatPrice } from '../utils/format-price.function.ts';
import { deleteReturn, getReturns } from '../api/return.service.ts';
import { formatDate } from '../utils/format-date.function.ts';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { toast, ToastContainer } from 'react-toastify';
import DeleteConfirmationDialog from '../components/confirmation-dialog.component.tsx';

type DataType = {
  key: React.Key;
  returnCode: string;
  rentalCode: string;
  customer: string;
  paymentState: string;
  estimatedPrice: string;
  createdAt: string;
};

const ReturnPage = () => {
  const [returnTickets, setReturnTickets] = useState<Return[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredReturns, setFilteredReturns] =
    useState<Return[]>(returnTickets);
  const [searchField, setSearchField] = useState('');
  const navigate = useNavigate();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('6');
  }, []);

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
      title: 'Mã phiếu trả',
      dataIndex: 'returnCode',
      key: 'returnCode',
      width: 150,
    },
    {
      title: 'Mã phiếu thuê',
      dataIndex: 'rentalCode',
      key: 'rentalCode',
      width: 150,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
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

  useEffect(() => {
    const newFilteredReturns = returnTickets.filter((returnTicket) => {
      return returnTicket.returnCode
        .toLowerCase()
        .includes(searchField);
    });
    setFilteredReturns(newFilteredReturns);
  }, [returnTickets, searchField]);

  const data: DataType[] = filteredReturns.map((returnTicket) => ({
    key: returnTicket._id,
    returnCode: returnTicket.returnCode,
    rentalCode: returnTicket.rentalCode,
    customer: returnTicket.customer.customerName,
    paymentState: returnTicket.paymentState,
    estimatedPrice: formatPrice.format(returnTicket.estimatedPrice),
    createdAt: formatDate(returnTicket.createdAt.toString()), // Convert createdAt to a Date object before formatting
  }));

  const handleDetailBtn = (key: React.Key) => {
    navigate(`/returns/${key}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchField(value);
  };

  const rowSelection = {
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const checkReturnStatus = () => {
    return selectedRowKeys.some((key) => {
      const returnTicket = filteredReturns.find(
        (returnTicket) => returnTicket._id === key,
      );
      return returnTicket?.paymentState === 'PAID';
    });
  };

  const handleConfirmDeleteOpen = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsConfirmDeleteOpen(false);
      if (checkReturnStatus()) {
        toast.error('Không thể xóa phiếu trả 😞', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 8000,
          theme: 'colored',
          pauseOnHover: true,
        });
        return;
      }

      // Delete selected rows
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await deleteReturn(key as string);
        }),
      );

      toast.success('Xóa phiếu trả thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });

      // Fetch updated return tickets data
      const returnList: Return[] = await getReturns();

      // Update return tickets state and selectedRowKeys state
      setReturnTickets(returnList);
      setSelectedRowKeys([]);
    } catch (error) {
      toast.success('Không thể xóa phiếu trả 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      console.log('Error deleting rows:', error);
    }
  };

  return (
    <Fragment>
      <div
        className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%]
      translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl"
      >
        <PageComponent
          pageName="Phiếu trả"
          columns={columns}
          data={data}
          rowSelection={rowSelection}
          placeHolder="Mã phiếu trả"
          inputName="searchField"
          inputValue={searchField}
          handleChange={handleChange}
        />
        <Space direction="horizontal" className="relative top-[-9%]">
          <Button
            danger
            type="primary"
            className="bg-blue-600 "
            onClick={handleConfirmDeleteOpen}
          >
            Xóa
          </Button>
        </Space>
      </div>
      <ToastContainer />
      {
        isConfirmDeleteOpen && (
          <DeleteConfirmationDialog
            onConfirm={handleConfirmDelete}
            setOpenConfirmation={setIsConfirmDeleteOpen}
          />
        )
      }
    </Fragment>
  );
};

export default ReturnPage;
