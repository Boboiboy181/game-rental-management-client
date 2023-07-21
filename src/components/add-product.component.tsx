import { Button, Form, Input, Select, Space, Spin } from 'antd';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createProduct } from '../api/product.service.ts';

const defaultFormFields = {
  productName: '',
  price: 0,
  quantity: 0,
  manufacture: '',
  genre: '',
  releaseDate: '',
  description: '',
  language: '',
  system: '',
};

const AddProduct = ({
  setIsAddOpen,
  productsNameList,
}: {
  productsNameList: string[];
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const { setIsOpen } = useContext(OverlayContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    productName,
    price,
    quantity,
    manufacture,
    genre,
    releaseDate,
    description,
    language,
    system,
  } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const selectHandler = (value: string, name: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsAddOpen(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
  };

  if (isLoading) {
    return (
      <div className="fixed bg-black/[.5] w-full h-full">
        <div className="absolute bg-white flex flex-col rounded-lg p-6 pb-8 px-10 top-[50%] left-[30%] translate-y-[-50%]">
          <h1 className="text-2xl text-center font-semibold mb-6">
            Thêm sản phẩm
          </h1>
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  const postVideoGame = async (data: FormData) => {
    try {
      setIsLoading(true);
      const respone = await createProduct(data);
      respone.productName ? setIsLoading(false) : setIsLoading(true);
      toast.success('Thêm video game thành công 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error('Không thể thêm video game mới 😞', {
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
    videoGame.append('productName', productName);
    videoGame.append('price', price.toString());
    videoGame.append('quantity', quantity.toString());
    videoGame.append('manufacture', manufacture);
    videoGame.append('genre', genre);
    videoGame.append('releaseDate', releaseDate);
    videoGame.append('description', description);
    videoGame.append('language', language);
    videoGame.append('system', system);
    videoGame.append('file', image!);

    // check if product name already exists
    if (productsNameList.includes(productName)) {
      toast.error('Video game đã tồn tại 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return;
    }

    await postVideoGame(videoGame);
    setIsAddOpen(false);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className={
          'absolute bg-white flex flex-col rounded-lg p-6 pb-8 px-10 top-[50%] left-[50%] translate-x-[-65%] translate-y-[-50%]'
        }
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl text-center font-semibold mb-6">
          Thêm sản phẩm
        </h1>
        <Form.Item label="Tên video game">
          <Input
            required
            type="text"
            placeholder="Nhập tên video game"
            name="productName"
            value={productName}
            onChange={handleChange}
          />
        </Form.Item>
        <Space>
          <Form.Item label="Giá tiền">
            <Input
              required
              type="number"
              placeholder="Nhập giá tiền"
              name="price"
              value={price}
              min={0}
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
              min={0}
              onChange={handleChange}
            />
          </Form.Item>
        </Space>
        <Form.Item label="Nhà sản xuất">
          <Input
            required
            type="text"
            placeholder="Nhập nhà sản xuất"
            name="manufacture"
            value={manufacture}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Thể loại">
          <Select
            value={genre}
            onSelect={(value) => selectHandler(value, 'genre')}
          >
            <Select.Option value="Action">Action</Select.Option>
            <Select.Option value="Adventure">Adventure</Select.Option>
            <Select.Option value="RolePlaying">RolePlaying</Select.Option>
            <Select.Option value="Shooter">Shooter</Select.Option>
            <Select.Option value="Sports">Sports</Select.Option>
            <Select.Option value="Racing">Racing</Select.Option>
            <Select.Option value="Strategy">Strategy</Select.Option>
            <Select.Option value="Simulation">Simulation</Select.Option>
            <Select.Option value="Puzzle">Puzzle</Select.Option>
            <Select.Option value="Fighting">Fighting</Select.Option>
            <Select.Option value="Platformer">Platformer</Select.Option>
            <Select.Option value="Stealth">Stealth</Select.Option>
            <Select.Option value="Horror">Horror</Select.Option>
            <Select.Option value="OpenWorld">OpenWorld</Select.Option>
            <Select.Option value="Sandbox">Sandbox</Select.Option>
            <Select.Option value="MMO">
              Massively Multiplayer Online
            </Select.Option>
            <Select.Option value="Indie">Indie</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
            <Select.Option value="Default">Default</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ngày ra mắt">
          <Input
            required
            type="date"
            placeholder="Chọn ngày ra mắt"
            name="releaseDate"
            value={releaseDate}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Ngôn ngữ">
          <Input
            required
            type="text"
            placeholder="Nhập ngôn ngữ"
            name="language"
            value={language}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Hệ máy">
          <Select
            value={system}
            onSelect={(value) => selectHandler(value, 'system')}
          >
            <Select.Option value="Default">Default</Select.Option>
            <Select.Option value="PlayStation4">PS4</Select.Option>
            <Select.Option value="PlayStation5">PS5</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            required
            type="text"
            placeholder="Nhập mô tả"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Upload">
          <Input
            required
            type="file"
            placeholder="Nhập ảnh video game"
            name="file"
            onChange={handleUpload}
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <Space className={'justify-between w-full mb-0'}>
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
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
