import { Button, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { OverlayContext } from '../context/overlay.context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormFields = {
  price: 0,
  quantity: 0,
};

const UpdateVideoGame = () => {
  const { setIsOpen } = useContext(OverlayContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const {
    price,
    quantity,
  } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsOpen(false);

  const updateVideoGame = async (data: FormData) => {
    try {
      const response = await axios.patch(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game',
        data,
      );
      toast.success('Video game updated successfully 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Failed to update video game 😞', {
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

    const videoGame = new FormData();
    videoGame.append('price', price.toString());
    videoGame.append('quantity', quantity.toString());

    await updateVideoGame(videoGame);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col justify-between rounded-lg mt-6 p-6 pb-0 left-[25%] top-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Giá tiền">
          <Input
            required
            type="number"
            placeholder="Nhập giá tiền"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Số lượng">
          <Input
            required
            type="number"
            placeholder="Nhập số lượng"
            name="quantity"
            value={quantity}
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

export default UpdateVideoGame;
