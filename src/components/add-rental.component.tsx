import { Button, Input, Space, Typography } from 'antd';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../utils/format-date.function';
import Table, { ColumnsType } from 'antd/es/table';
import AddProductToCart from './add-video-game-to-cart.component';
import { CartContext } from '../context/cart.context';
import { ProductForCart } from '../types/product-cart.type';
import { formatPrice } from '../utils/format-price.function';
import { calculatePrice } from '../utils/caculate-price.function';
import { RentalDaysEnum } from '../enums/rental-days.enum';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const { Text } = Typography;

type DataType = {
  key: string;
  productName: string;
  priceByDays: number;
  preOrderQuantity: number;
  quantity: number;
  numberOfRentalDays: number;
};

const defaultFormFields = {
  phoneNumber: '',
  customerName: '',
  deposit: 1,
};

const AddRentalComponent = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState<{
    [key: string]: number;
  }>({});
  const { phoneNumber, customerName, deposit } = formFields;
  const { cartItems, updateCartItem, deleteCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Convert selectQuantity into an array of { productId, quantity } pairs
    const updatedItems = Object.entries(selectQuantity).map(
      ([productId, quantity]) => ({
        productId,
        quantity,
      }),
    );

    // Update the cart items using the updateCartItem function
    updatedItems.forEach(({ productId, quantity }) => {
      const productToUpdate: ProductForCart | undefined = cartItems.find(
        (item) => item._id === productId,
      );
      if (!productToUpdate) return;
      updateCartItem(productToUpdate, quantity);
    });
  }, [selectQuantity]);

  console.log(selectQuantity);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'preOrderQuantity',
      align: 'center',
      render: (_, record) => (
        <Input
          type="number"
          min={1}
          max={record.quantity}
          defaultValue={1}
          onChange={(e) =>
            setSelectQuantity({
              ...selectQuantity,
              [record.key]: Number(e.target.value),
            })
          }
          className="w-[65px]"
        />
      ),
    },
    {
      title: 'Số ngày thuê',
      dataIndex: 'numberOfRentalDays',
      align: 'center',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'priceByDays',
      align: 'center',
      render: (priceByDays) => (
        <Text className="font-semibold">{formatPrice.format(priceByDays)}</Text>
      ),
    },
    {
      title: 'Tổng tiền',
      align: 'center',
      render: (_, record) => {
        const product = cartItems.find((item) => item._id === record.key);
        const totalPrice = product
          ? product.priceByDays * product.preOrderQuantity
          : 0;

        return (
          <Text className="font-semibold">
            <span>{formatPrice.format(totalPrice)}</span>
          </Text>
        );
      },
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          danger
          className="bg-blue-600"
          onClick={() => handleDeleteBtn(record.key)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const data = cartItems.map((item) => ({
    key: item._id,
    productName: item.productName,
    quantity: item.quantity,
    preOrderQuantity: item.preOrderQuantity,
    numberOfRentalDays:
      RentalDaysEnum[item.numberOfRentalDays as keyof typeof RentalDaysEnum],
    priceByDays: item.priceByDays,
  }));

  const handleCloseBtn = () => {
    navigate('/rentals');
  };

  const handleAddProductBtn = () => {
    setIsAddProductOpen(true);
  };

  const handleDeleteBtn = (productID: string) => {
    const productToDelete: ProductForCart | undefined = cartItems.find(
      (item) => item._id === productID,
    );
    if (productToDelete) {
      deleteCartItem(productToDelete);
    }
  };

  const rentalItems = cartItems.map((item) => ({
    gameID: item._id,
    preOrderQuantity: item.preOrderQuantity,
    numberOfRentalDays: item.numberOfRentalDays,
  }));

  const postRental = async (rental: any) => {
    try {
      const respone = await axios.post(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental',
        rental,
      );
      console.log(respone);
      
      toast.success('Rental ticket created successfully 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return respone.data._id;
    } catch (error) {
      toast.error('Failed to create a rental ticket 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rental = {
      customerID: '',
      phoneNumber,
      customerName,
      rentedGames: rentalItems,
      deposit,
    };

    const rentalID = await postRental(rental);
    navigate(`/rentals/${rentalID}`);
  };

  return (
    <Fragment>
      <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <Space className="flex flex-col items-start">
            <Text className="text-3xl font-semibold">Phiếu thuê</Text>
            <p className="text-xs text-black/40">
              Ngày lập phiếu {formatDate(new Date().toString())}
            </p>
          </Space>
          <div className="flex items-end justify-between">
            <Space className="mt-8">
              <div className="flex flex-col border-b-black/20 border-b w-[180px] mr-5">
                <p className="text-xs text-black/40">Số điện thoại</p>
                <Input
                  className="p-0 py-1"
                  allowClear
                  required
                  bordered={false}
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col border-b-black/20 border-b w-[180px] mr-5">
                <p className="text-xs text-black/40">Tên khách hàng</p>
                <Input
                  className="p-0 py-1"
                  allowClear
                  required
                  bordered={false}
                  type="text"
                  name="customerName"
                  value={customerName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col border-b-black/20 border-b w-[180px]">
                <p className="text-xs text-black/40">Tiền đặt cọc</p>
                <Input
                  className="p-0 py-1"
                  allowClear
                  required
                  bordered={false}
                  defaultValue={0}
                  min={1}
                  type="number"
                  name="deposit"
                  value={deposit}
                  onChange={handleChange}
                />
              </div>
            </Space>
            <Button onClick={handleAddProductBtn}>+ Thêm sản phẩm</Button>
          </div>
          <div className="text-right my-5">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 3 }}
            />
          </div>
          <div className="flex justify-between items-center">
            <Space direction="horizontal" className="relative top-[-9%]">
              <Button
                className="bg-blue-500"
                type="primary"
                onClick={handleCloseBtn}
              >
                Đóng
              </Button>
              <Button
                className="bg-green-600"
                type="primary"
                htmlType="submit"
                // onClick={handleCreateBtn}
              >
                Tạo phiếu trả
              </Button>
            </Space>
            <p className="text-xl">
              Tổng thanh toán dự kiến:{' '}
              <span className="font-semibold text-red-600">
                {formatPrice.format(
                  cartItems.reduce((acc, curr) => {
                    return acc + curr.priceByDays * curr.preOrderQuantity;
                  }, 0),
                )}
              </span>
            </p>
          </div>
        </form>
      </div>
      {isAddProductOpen && (
        <AddProductToCart setIsAddProductOpen={setIsAddProductOpen} />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default AddRentalComponent;
