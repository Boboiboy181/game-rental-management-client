import { Space, Typography, Divider, Button } from 'antd';
import Table from 'antd/es/table';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import AddVideoGame from '../components/add-video-game.component';
import { Product } from '../types/product.type';
import UpdateVideoGame from '../components/update-video-game.component';
import { ToastContainer, toast } from 'react-toastify';

const { Text } = Typography;

const AddProductToCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [searchField, setSearchField] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data }: { data: Product[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game',
      );
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
    },
  ];

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      return product.productName.toLowerCase().includes(searchField);
    });
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField]);

  const data = filteredProducts.map((product) => ({
    key: product._id,
    productName: product.productName,
    price: product.price,
    quantity: product.quantity,
    releaseDate: product.releaseDate,
  }));

  const rowSelection = {
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDeleteBtn = async () => {
    try {
      // Delete selected rows
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await axios.delete(
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: Product[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game',
      );

      // Update products state and selectedRowKeys state
      setProducts(data);
      setSelectedRowKeys([]);
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  const handleAddBtn = () => {
    setIsAddOpen(true);
  };

  const handleUpdateBtn = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      toast.error('Please select only 1 video game to update 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return;
    }
    setIsUpdateOpen(true);
  };

  return (
    <Fragment>
      <div className="fixed bg-black/[.5] w-full h-full">
        <div className="w-[90%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
          <Space className="flex justify-between">
            <Text className="text-2xl font-semibold">Video Games</Text>
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
          <div>
            <Divider />
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </div>
          <Space direction="horizontal" className="relative top-[-9%]">
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={handleAddBtn}
            >
              Thêm
            </Button>
            <Button danger type="primary" onClick={handleDeleteBtn}>
              Xóa
            </Button>
            <Button
              type="primary"
              className="bg-green-600"
              onClick={handleUpdateBtn}
            >
              Sửa
            </Button>
          </Space>
        </div>
      </div>
      {isAddOpen && <AddVideoGame setIsAddOpen={setIsAddOpen} />}
      {isUpdateOpen && (
        <UpdateVideoGame
          setIsUpdateOpen={setIsUpdateOpen}
          selectedUpdate={selectedRowKeys}
          setProducts={setProducts}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default AddProductToCart;
