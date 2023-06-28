import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormFields = {
  customerName: '',
  email: '',
  phoneNumber:'',
};

type UpdateDto = {
  customerName: string;
  email: string;
  phoneNumber: string;
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
        const response = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/customer/${selectedUpdate[0]}`
        );
        const { customerName, email, phoneNumber } = response.data;

        // Cập nhật giá trị mặc định cho formFields từ CSDL
        setFormFields({
          customerName,
          email,
          phoneNumber,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedUpdate.length > 0) {
      fetchCustomerData();
    }
  }, [selectedUpdate]);

  const { customerName, email, phoneNumber } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsUpdateOpen(false);

  const UpdateCustomer = async (id: React.Key, updateDto: UpdateDto) => {
    try {
      const response = await axios.patch(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/customer/${id}`,
        updateDto,
      );

      console.log(response);

      setIsUpdateOpen(false);

      toast.success('Customer info updated successfully 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Failed to update customer info 😞', {
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

    const _id = selectedUpdate[0];

    const customer: UpdateDto = { customerName, email, phoneNumber };

    await UpdateCustomer(_id, customer);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col justify-between rounded-lg mt-6 p-6 pb-0 left-[25%] top-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4">Cập nhật thông tin khách hàng</h1>
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
        <Form.Item label="Email của khách hàng">
          <Input
            required
            type="string"
            placeholder="Nhập email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="SDT của khách hàng">
          <Input
            required
            type="string"
            placeholder="Nhập SDT"
            name="phoneNumber"
            value={phoneNumber}
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

export default UpdateCustomer;
