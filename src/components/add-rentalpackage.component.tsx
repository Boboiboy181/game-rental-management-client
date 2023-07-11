import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormFields = {
  packageName: '',
  numberOfGames: 0,
  price: 0,
  timeOfRental: 0,
};

const AddRentalPackage = ({
  setIsAddOpen,
}: {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const { setIsOpen } = useContext(OverlayContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const {
    packageName,
    numberOfGames,
    price,
    timeOfRental,
  } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsAddOpen(false);

  const postRentalPackage = async (data: FormData) => {
    try {
      await axios.post(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package',
        data,
      );
      toast.success('Tạo gói thuê thành công 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Tạo gói thuê thất bại 😞', {
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

    const RentalPackage = new FormData();
    RentalPackage.append('productName', packageName);
    RentalPackage.append('numberOfGames', numberOfGames);
    RentalPackage.append('price', price.toString());
    RentalPackage.append('timeOfRental', timeOfRental);

    await postRentalPackage(RentalPackage);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col rounded-lg mt-6 h-[85%] p-6 left-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Tên gói thuê">
          <Input
            required
            type="text"
            placeholder="Nhập tên gói thuê"
            name="packageName"
            value={packageName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Số lượng Games">
          <Input
            required
            type="number"
            placeholder="Nhập số lượng Games"
            name="numberOfGames"
            value={numberOfGames}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Giá thuê">
          <Input
            required
            type="number"
            placeholder="Nhập giá thuê"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Thời gian thuê">
          <Input
            required
            type="number"
            placeholder="Nhập thời gian thuê"
            name="timeOfRental"
            value={timeOfRental}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item className="flex items-center justify-between">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 mr-[14rem]"
          >
            Xác nhận
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

export default AddRentalPackage;
