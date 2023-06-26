import { Button, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { OverlayContext } from '../context/overlay.context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormFields = {
  customerName: '',
  email: '',
  phoneNumber: '',
  point: 0,
};

const AddCustomer = () => {
  const { setIsOpen } = useContext(OverlayContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const {
    customerName,
    email,
    phoneNumber,
    point,
  } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };


  const handleCloseBtn = () => setIsOpen(false);


  const postCustomer  = async (data: FormData) => {
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
    customer.append('point', point.toString());
    await postCustomer(customer);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col rounded-lg mt-6 h-[85%] p-6 left-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Tên khách hàng">
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
            name="text"
            value={phoneNumber}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Điểm tích lũy">
          <Input
            required
            type="text"
            placeholder="Nhập điểm"
            name="point"
            value={point}
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
      <ToastContainer/>
    </div>
  );
};

export default AddCustomer;
