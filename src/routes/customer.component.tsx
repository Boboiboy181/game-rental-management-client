import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import UpdateCustomer from '../components/update-customer.component';
import AddCustomer from '../components/add-customer.component';
import { Customer } from '../types/customer.type';
import ShowData from '../components/page.component';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { deleteCustomer, getCustomers } from '../api/customer.service.ts';
import DeleteConfirmationDialog from '../components/confirmation-dialog.component.tsx';

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [searchField, setSearchField] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('1');
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };

    fetchCustomers();
  }, [isAddOpen, isUpdateOpen]);

  useEffect(() => {
    const newFilteredCustomers = customers.filter((customer) => {
      return customer.customerName.toLowerCase().includes(searchField);
    });
    setFilteredCustomers(newFilteredCustomers);
  }, [customers, searchField]);

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: 'Điểm tích lũy',
      dataIndex: 'point',
      align: 'center',
    },
  ];

  const data = filteredCustomers.map((customer) => ({
    key: customer._id,
    customerName: customer.customerName,
    email: customer.email,
    address: customer.address,
    phoneNumber: customer.phoneNumber,
    point: customer.point,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchField(value);
  };

  const rowSelection = {
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  const handleConfirmDeleteOpen = () => {
    setIsConfirmDeleteOpen(true);
  };

  // Hàm xác nhận xóa khi người dùng nhấn nút "OK" trong hộp thoại xác nhận
  const handleConfirmDelete = async () => {
    try {
      setIsConfirmDeleteOpen(false);
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await deleteCustomer(key as string);
        }),
      );

      toast.success('Xóa khách hàng thành công ', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });

      const data = await getCustomers();
      setCustomers(data);
      setSelectedRowKeys([]);
      setSearchField('');
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error('Không thể xóa khách hàng 😞', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 8000,
          theme: 'colored',
          pauseOnHover: true,
        });
        return;
      }
      console.log('Error deleting rows:', error);
    }
  };

  const handleAddBtn = () => {
    setIsAddOpen(true);
  };

  const handleUpdateBtn = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      toast.error('Vui lòng chọn 1 khách hàng 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return;
    }
    setIsUpdateOpen(true);
  };

  return (
    <Fragment>
      <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
        <ShowData
          pageName="Khách hàng"
          placeHolder="Tên khách hàng"
          inputName="Tìm khách hàng"
          inputValue={searchField}
          handleChange={handleChange}
          columns={columns}
          data={data}
          rowSelection={rowSelection}
        />
        <Space direction="horizontal" className={'relative top-[-9%]'}>
          <Button type="primary" className="bg-blue-500" onClick={handleAddBtn}>
            Thêm
          </Button>
          <Button danger type="primary" onClick={handleConfirmDeleteOpen}>
            Xóa
          </Button>
          <Button
            type="primary"
            className="bg-green-600 hover:!bg-green-500"
            onClick={handleUpdateBtn}
          >
            Sửa
          </Button>
        </Space>
      </div>
      {isUpdateOpen && (
        <UpdateCustomer
          setIsUpdateOpen={setIsUpdateOpen}
          selectedUpdate={selectedRowKeys}
        />
      )}
      {isAddOpen && <AddCustomer setIsAddOpen={setIsAddOpen} />}
      {
        isConfirmDeleteOpen && (
          <DeleteConfirmationDialog
            onConfirm={handleConfirmDelete}
            setOpenConfirmation={setIsConfirmDeleteOpen}
          />
        )
      }
      <ToastContainer />
    </Fragment>
  );
};

export default CustomerPage;
