import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getCustomer, updateCustomer } from '../api/customer.service.ts';

const defaultFormFields = {
  customerName: '',
  email: '',
  phoneNumber: '',
  address: '',
};

type UpdateDto = {
  customerName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

const UpdateCustomer = ({
  setIsUpdateOpen,
  selectedUpdate,
}: {
  setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUpdate: React.Key[];
}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await getCustomer(selectedUpdate[0].toString());
        const { customerName, email, phoneNumber, address } = response;

        // Cập nhật giá trị mặc định cho formFields từ CSDL
        setFormFields({
          customerName,
          email,
          phoneNumber,
          address,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedUpdate.length > 0) {
      fetchCustomerData();
    }
  }, [selectedUpdate]);

  const { customerName, email, phoneNumber, address } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsUpdateOpen(false);

  const UpdateCustomer = async (id: string, updateDto: UpdateDto) => {
    try {
      await updateCustomer(id, updateDto);

      setIsUpdateOpen(false);
      toast.success('Cập nhật thông tin thành công 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Không thể cập nhật thông tin 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const _id = selectedUpdate[0].toString();

    const customer: UpdateDto = { customerName, email, phoneNumber, address };

    await UpdateCustomer(_id, customer);
    setIsUpdateOpen(false);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col justify-between rounded-lg mt-6 p-6 pb-0 left-[25%] top-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Cập nhật thông tin khách hàng
        </h1>
        <Form.Item label="Họ và tên">
          <Input
            required
            type="string"
            placeholder="Nhập tên khách hàng"
            name="customerName"
            value={customerName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            required
            type="string"
            placeholder="Nhập email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="SĐT">
          <Input
            required
            type="string"
            placeholder="Nhập SĐT"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input
            required
            type="string"
            placeholder="Nhập địa chỉ"
            name="address"
            value={address}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Space className="flex items-center justify-between">
            <Button
              type="primary"
              danger
              className="bg-red-500 "
              onClick={handleCloseBtn}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 w-[70px] "
            >
              Gửi
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default UpdateCustomer;
