import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Product } from '../types/product.type';

const defaultFormFields = {
  price: 0,
  quantity: 0,
};

type UpdateDto = {
  price: number;
  quantity: number;
};

const UpdateProduct = ({
  setIsUpdateOpen,
  selectedUpdate,
}: {
  setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedUpdate: React.Key[];
}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game/${selectedUpdate[0]}`,
        );
        const { price, quantity } = response.data;

        // Cập nhật giá trị mặc định cho formFields từ CSDL
        setFormFields({
          price,
          quantity,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedUpdate.length > 0) {
      fetchProducts();
    }
  }, [selectedUpdate]);

  const { price, quantity } = formFields;
  console.log(formFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsUpdateOpen(false);

  const updateVideoGame = async (id: React.Key, updateDto: UpdateDto) => {
    try {
      await axios.patch(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game/${id}`,
        updateDto,
      );

      setIsUpdateOpen(false);

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

    const _id = selectedUpdate[0];

    const videoGame: UpdateDto = { price, quantity };

    await updateVideoGame(_id, videoGame);
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
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
