import { Space, Typography, Divider, Button, Select } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/product/product.type';
import { CartContext } from '../../context/cart.context';
import { calculatePrice } from '../../utils/caculate-price.function';
import { ProductForCart } from '../../types/product/product-cart.type';
import { RentalDaysEnum } from '../../enums/rental-days.enum';
import { ToastContainer, toast } from 'react-toastify';
import { formatPrice } from '../../utils/format-price.function';
import { getProducts } from '../../api/product.service';

const { Text } = Typography;

type DataType = {
  key: string;
  productName: string;
  price: number;
  quantity: number;
  numberOfRentalDays: string;
};

const items = [
  {
    value: 'ONE_DAY',
    label: '1',
  },
  {
    value: 'THREE_DAYS',
    label: '3',
  },
  {
    value: 'SEVEN_DAYS',
    label: '7',
  },
  {
    value: 'FOURTEEN_DAYS',
    label: '14',
  },
  {
    value: 'THIRTY_DAYS',
    label: '30',
  },
  {
    value: 'SIXTY_DAYS',
    label: '60',
  },
];

const AddProductToCart = ({
  setIsAddProductOpen,
}: {
  setIsAddProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [products, setProducts] = useState<ProductForCart[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchField, setSearchField] = useState('');
  const [selectedRentalDays, setSelectedRentalDays] = useState<{
    [key: string]: string;
  }>({});

  const { cartItems, addItemToCart } = useContext(CartContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData: ProductForCart[] = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: 'Giá',
      // dataIndex: 'price',
      align: 'center',
      render: (_, record) => {
        const rentalDays = selectedRentalDays[record.key]
          ? selectedRentalDays[record.key]
          : 'ONE_DAY';
        const numberOfRentalDays: RentalDaysEnum =
          RentalDaysEnum[rentalDays as keyof typeof RentalDaysEnum];

        return (
          <Text>
            {formatPrice.format(
              calculatePrice(record.price, numberOfRentalDays),
            )}
          </Text>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Số ngày thuê',
      dataIndex: 'numberOfRentalDays',
      align: 'center',
      render: (_, record) => (
        <Select
          defaultValue={record.numberOfRentalDays}
          onChange={(value) => handleRentalDaysChange(record.key, value)}
        >
          {items.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Thao tác',
      align: 'right',
      render: (_, record) => (
        <Button
          className="bg-blue-600 text-white"
          type="primary"
          onClick={() => handleAddProductBtn(record.key)}
        >
          Thêm
        </Button>
      ),
    },
  ];

  const data = filteredProducts.map((product) => ({
    key: product._id,
    productName: product.productName,
    price: product.price,
    quantity: product.quantity,
    numberOfRentalDays: selectedRentalDays[product._id] || 'ONE_DAY',
  }));

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      return product.productName.toLowerCase().includes(searchField);
    });
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField]);

  const handleCloseBtn = () => {
    setIsAddProductOpen(false);
  };

  const handleRentalDaysChange = (key: string, value: string) => {
    setSelectedRentalDays((prevDays) => ({
      ...prevDays,
      [key]: value,
    }));
  };

  const handleAddProductBtn = (productID: string) => {
    const product: ProductForCart | undefined = products.find(
      (product) => product._id === productID,
    );
    if (product) {
      const rentalDays = selectedRentalDays[productID]
        ? selectedRentalDays[productID]
        : 'ONE_DAY';
      const numberOfRentalDays: RentalDaysEnum =
        RentalDaysEnum[rentalDays as keyof typeof RentalDaysEnum];

      const priceByDays = calculatePrice(product.price, numberOfRentalDays);

      // check if product is already in cart
      const productInCart = cartItems.find((item) => item._id === productID);
      if (productInCart) {
        toast.error('Game already in cart !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: 'colored',
          pauseOnHover: true,
        });
      } else {
        addItemToCart(product, rentalDays, priceByDays);
        toast.success('Added to cart successfully. 🥳', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: 'colored',
          pauseOnHover: true,
        });
      }
    }
  };

  return (
    <Fragment>
      <div className="fixed bg-black/[.5] w-screen h-screen">
        <div className="w-[60%] bg-white rounded-md relative p-5 shadow-2xl top-[20%] left-[7%]">
          <Space className="flex justify-between">
            <Text className="text-3xl font-semibold">Thêm game</Text>
            <div className="input-field">
              <input
                className="px-4"
                type="search"
                placeholder="Search game"
                name="searchField"
                value={searchField}
                onChange={handleChange}
              />
              <label htmlFor="searchfield">Search game</label>
            </div>
          </Space>
          <div className="relative">
            <Divider />
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 3 }}
            />
            <Button
              type="primary"
              danger
              className=" absolute top-[85%]"
              onClick={handleCloseBtn}
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AddProductToCart;
