import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createRentalPackage } from '../api/rental-package.service';

const defaultFormFields = {
  packageName: '',
  numberOfGames: 0,
  price: 0,
  timeOfRental: 0,
};

const AddRentalPackage = ({
  setIsAddOpen,
  rentalPackagesNameList,
}: {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rentalPackagesNameList: string[];
}) => {
  // const { setIsOpen } = useContext(OverlayContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { packageName, numberOfGames, price, timeOfRental } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const selectHandler = (value: string, name: string) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsAddOpen(false);

  const postRentalPackage = async (data: any) => {
    try {
      await createRentalPackage(data);
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

    const rentalpackage = {
      packageName,
      price,
      numberOfGames,
      timeOfRental,
    };

    // check if the package name already exists
    if (rentalPackagesNameList.includes(packageName)) {
      toast.error('Gói thuê đã tồn tại 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return;
    }

    await postRentalPackage(rentalpackage);
    setFormFields(defaultFormFields);
    setIsAddOpen(false);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col rounded-lg mt-6 p-6 left-[50%] top-[50%] translate-x-[-70%] translate-y-[-60%]"
        onSubmitCapture={handleSubmit}
      >
        <h1 className="text-2xl text-center font-semibold mb-4">
          Thêm gói thuê
        </h1>
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
            min={0}
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
            min={0}
            type="number"
            placeholder="Nhập giá thuê"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Thời gian cho thuê gói theo ngày">
          <Select
            value={timeOfRental}
            onSelect={(value) =>
              selectHandler(value.toString(), 'timeOfRental')
            }
          >
            <Select.Option value="7">7</Select.Option>
            <Select.Option value="14">14</Select.Option>
            <Select.Option value="30">30</Select.Option>
            <Select.Option value="60">60</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="mb-0">
          <Row justify="space-between">
            <Col>
              <Button
                type="primary"
                danger
                className="bg-red-500"
                onClick={handleCloseBtn}
              >
                Đóng
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Xác nhận
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddRentalPackage;
