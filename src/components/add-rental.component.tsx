import { AutoComplete, Button, Input, Space, Typography } from 'antd';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/format-date.function';
import Table, { ColumnsType } from 'antd/es/table';
import AddProductToCart from './add-product-to-cart.component';
import { CartContext } from '../context/cart.context';
import { ProductForCart } from '../types/product-cart.type';
import { formatPrice } from '../utils/format-price.function';
import { RentalDaysEnum } from '../enums/rental-days.enum';
import { ToastContainer, toast } from 'react-toastify';
import { getCustomers } from '../api/customer.service';
import { createRental } from '../api/rental.service';
import { CreateRental } from '../types/create-rental.type';

const { Text } = Typography;

type DataType = {
  key: string;
  productName: string;
  priceByDays: number;
  preOrderQuantity: number;
  quantity: number;
  numberOfRentalDays: number;
};

type SuggestionCustomers = {
  _id: string;
  phoneNumber: string;
  customerName: string;
};

const defaultFormFields = {
  customerID: '',
  phoneNumber: '',
  customerName: '',
  deposit: 0,
};

const AddRental = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [suggestionCustomers, setSuggestionCustomers] = useState<
    SuggestionCustomers[]
  >([]);
  const [selectQuantity, setSelectQuantity] = useState<{
    [key: string]: number;
  }>({});
  const { customerID, phoneNumber, customerName, deposit } = formFields;
  const { cartItems, updateCartItem, deleteCartItem, resetCart } =
    useContext(CartContext);
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

  const postRental = async (rental: CreateRental) => {
    try {
      const respone = await createRental(rental);
      toast.success('Rental ticket created successfully 🥳', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return respone._id;
    } catch (error) {
      toast.error('Failed to create a rental ticket 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rental: CreateRental = {
      customerID,
      phoneNumber,
      customerName,
      rentedGames: rentalItems,
      deposit,
    };

    const rentalID = await postRental(rental);
    if (rentalID) {
      resetCart();
      navigate(`/rentals/${rentalID}`);
    }
  };

  const handleSearchPhoneNumber = async () => {
    const customerList = await getCustomers();

    const suggestList: SuggestionCustomers[] = customerList.map((customer) => ({
      _id: customer._id,
      phoneNumber: customer.phoneNumber,
      customerName: customer.customerName,
    }));

    const filteredCustomers = suggestList.filter((suggestion) =>
      suggestion.phoneNumber.toLowerCase().includes(phoneNumber),
    );

    setSuggestionCustomers(filteredCustomers);
  };

  const handleSelectPhoneNumber = (value: string) => {
    // console.log(suggestionCustomers);

    const selectedCustomer = suggestionCustomers.find(
      (customer) => customer.phoneNumber === value,
    );

    setFormFields({
      ...formFields,
      customerID: selectedCustomer?._id || '',
      phoneNumber: value,
      customerName: selectedCustomer?.customerName || '',
    });
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
                <AutoComplete
                  value={phoneNumber}
                  options={suggestionCustomers.map((item) => ({
                    value: item.phoneNumber,
                    text: item.phoneNumber,
                  }))}
                  onSearch={handleSearchPhoneNumber}
                  onSelect={(value) => handleSelectPhoneNumber(value)}
                  listHeight={150}
                >
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
                </AutoComplete>
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
                className="bg-green-600 hover:!bg-green-500"
                type="primary"
                htmlType="submit"
              >
                Tạo phiếu thuê
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

export default AddRental;
