import { Button, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createCustomer } from '../api/customer.service.ts';

const defaultFormFields = {
  customerName: '',
  email: '',
  phoneNumber: '',
  address: '',
};

const AddCustomer = ({
  setIsAddOpen,
}: {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { customerName, email, phoneNumber, address } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsAddOpen(false);

  const postCustomer = async (data: any) => {
    try {
      await createCustomer(data);
      toast.success('Tạo khách hàng mới thành công 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Không thể tạo khách hàng mới 😞', {
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

    const customer = {
      customerName,
      email,
      phoneNumber,
      address,
    };

    await postCustomer(customer);
    setIsAddOpen(false);
    setFormFields(defaultFormFields);
    setIsAddOpen(false);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col rounded-lg mt-6 p-6 pb-0 left-[25%] top-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl text-center font-semibold mb-4">
          Thêm khách hàng
        </h1>
        <Form.Item label="Họ và tên">
          <Input
            required
            type="text"
            placeholder="Nhập tên khách hàng"
            name="customerName"
            value={customerName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            required
            type="text"
            placeholder="Nhập email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="SĐT">
          <Input
            required
            type="text"
            placeholder="Nhập số điện thoại"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input
            required
            type="text"
            placeholder="Nhập địa chỉ"
            name="address"
            value={address}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Space className="flex justify-between">
            <Button
              type="primary"
              className="bg-red-500 hover:!bg-red-400"
              onClick={handleCloseBtn}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 w-[70px]"
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

export default AddCustomer;
