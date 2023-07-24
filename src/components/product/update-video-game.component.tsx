import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Product } from '../../types/product/product.type.ts';
import { getProduct, updateProduct } from '../../api/product.service.ts';

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
        const response = await getProduct(selectedUpdate[0].toString());
        const { price, quantity } = response;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsUpdateOpen(false);

  const updateVideoGame = async (id: React.Key, updateDto: UpdateDto) => {
    try {
      await updateProduct(id.toString(), updateDto);
      setIsUpdateOpen(false);
      toast.success('Cập nhật video game thành công 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Không thể cập nhật video game 😞', {
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
        className="absolute w-[25rem] bg-white flex flex-col justify-between rounded-lg mt-6 p-6 pb-0 left-[50%] top-[50%] translate-x-[-70%] translate-y-[-60%]"
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl text-center font-semibold mb-6">
          Cập nhật sản phẩm
        </h1>
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
        <Form.Item>
          <Space className={'flex justify-between items-center'}>
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

export default UpdateProduct;
