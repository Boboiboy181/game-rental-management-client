import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const defaultFormFields = {
  packageName:'',
  price: 0,
  numberOfGames: 0,
  timeOfRental:0,
};

type UpdateDto = {
  packageName:string;
  price: number;
  numberOfGames: number;
  timeOfRental:number;
};

const UpdateRentalPackage = ({
  setIsUpdateOpen,
  selectedUpdate,
}: {
  setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUpdate: React.Key[];
}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  useEffect(() => {
    const fetchRentalPackage = async () => {
      try {
        const response = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/${selectedUpdate[0]}`,
        );
        const { packageName, price, numberOfGames,timeOfRental } = response.data;
        // Cập nhật giá trị mặc định cho formFields từ CSDL
        setFormFields({
          packageName,
          price,
          numberOfGames,
          timeOfRental,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedUpdate.length > 0) {
      fetchRentalPackage();
    }
  }, [selectedUpdate]);

  const { packageName,price, numberOfGames,timeOfRental } = formFields;
  console.log(formFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseBtn = () => setIsUpdateOpen(false);

  const updateRentalPackage = async (id: React.Key, updateDto: UpdateDto) => {
    try {
      await axios.patch(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/${id}`,
        updateDto,
      );

      setIsUpdateOpen(false);

      toast.success('Cập nhật gói thuê thành công 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Cập nhật gói thuê thất bại 😞', {
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

    const rentalpackage: UpdateDto = { packageName,price, numberOfGames,timeOfRental };

    await updateRentalPackage(_id, rentalpackage);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className="absolute w-[25rem] bg-white flex flex-col justify-between rounded-lg mt-6 p-6 pb-0 left-[25%] top-[25%]"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="tên gói Games">
          <Input
            required
            type="string"
            placeholder="Nhập tên gói Game"
            name="packageName"
            value={packageName}
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
        <Form.Item label="Số lượng game trong gói thuê">
          <Input
            required
            type="number"
            placeholder="Nhập số lượng game thuê"
            name="numberOfGames"
            value={numberOfGames}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Thời gian cho gói thuê">
          <Input
            required
            type="number"
            placeholder="Nhập thời gian game cho thuê"
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

export default UpdateRentalPackage;
