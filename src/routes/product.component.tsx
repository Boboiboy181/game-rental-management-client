import { Button, Divider, Space, Typography } from 'antd';
import Table from 'antd/es/table';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types/product.type';
import { toast, ToastContainer } from 'react-toastify';
import { formatPrice } from '../utils/format-price.function';
import AddProduct from '../components/add-product.component';
import UpdateProduct from '../components/update-video-game.component';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';

const { Text } = Typography;

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [searchField, setSearchField] = useState('');

  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('2');
  }, []);

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
  }, [isAddOpen, isUpdateOpen]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Ngày sản xuất',
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
    price: formatPrice.format(product.price),
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

  const productsNameList = products.map((product) => product.productName);

  const handleAddBtn = () => {
    setIsAddOpen(true);
  };

  const handleUpdateBtn = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      toast.error('Vui lòng chỉ chọn 1 sản phẩm để cập nhật 😞', {
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
      <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
        <Space className="flex justify-between">
          <Text className="text-2xl font-semibold">Sản phẩm</Text>
          <div className="input-field">
            <input
              className="px-4"
              type="search"
              placeholder="Tên sản phẩm"
              name="searchField"
              value={searchField}
              onChange={handleChange}
            />
            <label htmlFor="searchfield">Tên sản phẩm</label>
          </div>
        </Space>
        <div className="relative">
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
          <Button type="primary" className="bg-blue-500" onClick={handleAddBtn}>
            Thêm
          </Button>
          <Button danger type="primary" onClick={handleDeleteBtn}>
            Xóa
          </Button>
          <Button
            type="primary"
            className="bg-green-600 hover:!bg-green-500"
            onClick={handleUpdateBtn}
          >
            Sửa
          </Button>
        </Space>
      </div>
      {isAddOpen && (
        <AddProduct setIsAddOpen={setIsAddOpen} productsNameList={productsNameList} />
      )}
      {isUpdateOpen && (
        <UpdateProduct
          setIsUpdateOpen={setIsUpdateOpen}
          selectedUpdate={selectedRowKeys}
          setProducts={setProducts}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ProductPage;
