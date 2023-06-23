import { Button, Form, Input, Select } from 'antd';
import { useContext, useState } from 'react';
import { OverlayContext } from '../context/overlay.context';
import axios from 'axios';

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

const AddVideoGame = () => {
  const { setIsOpen } = useContext(OverlayContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [image, setImage] = useState<File | null>(null);

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

  console.log(
    productName,
    price,
    quantity,
    manufacture,
    genre,
    releaseDate,
    description,
    language,
    system,
  );

  const selectHandler = (value: string, name: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsOpen(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
  };

  const postVideoGame = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game',
        data,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    postVideoGame(videoGame);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col rounded-lg mt-6 h-[85%] p-6 left-[25%]"
        onSubmitCapture={handleSubmit}
      >
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
    </div>
  );
};

export default AddVideoGame;
