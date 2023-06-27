import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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

  const { 
    customerName, 
    email, 
    phoneNumber, 
    address,
  } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsAddOpen(false);

  const postCustomer = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/customer',
        data,
      );
      toast.success('New customer created successfully 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Failed to create a customer 😞', {
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
    const customer = new FormData();
    customer.append('customerName', customerName);
    customer.append('email', email);
    customer.append('phoneNumber', phoneNumber);
    customer.append('address', address);
    await postCustomer(customer);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col rounded-lg mt-6 p-6 pb-0 left-[25%] top-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl text-center font-semibold mb-4">Thêm khách hàng</h1>
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
        <Form.Item label="Số điện thoại">
          <Input
            required
            type="text"
            placeholder="SĐT"
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

        <Form.Item className="flex items-center justify-between">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 mr-[14rem]"
          >
            Gửi
          </Button>
          <Button
            type="primary"
            className="bg-red-500"
            onClick={handleCloseBtn}
          >
            Đóng
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddCustomer;
