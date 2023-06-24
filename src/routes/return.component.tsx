import { Space, Typography, Divider, Button } from 'antd';
import Table from 'antd/es/table';
import { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AddVideoGame from '../components/add-video-game.component';
import { OverlayContext } from '../context/overlay.context';
import { ProductContext } from '../context/product.context';
const { Text } = Typography;

const Return = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { isOpen, setIsOpen } = useContext(OverlayContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data }: { data: Product[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game',
      );
      setProducts(data);
    };

    fetchProducts();
  }, [products]);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      align: 'center',
render: (_, record) => record.price * record.quantity,
    },
    {
      title: 'Thao tác',
      width: 100,
      align: 'center' as any,
      render: (_, record) => (
        <Button type="primary" className='bg-red-600' onClick={() => handleAction(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  const data = products.map((product) => ({
    key: product._id,
    productName: product.productName,
    price: product.price,
    quantity: product.quantity,
    releaseDate: product.releaseDate,
  }));

  const [searchField, setSearchField] = useState('');
  const [currentPage, setCurrentPage] = useState('search');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

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
    setIsOpen(true);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div className="w-[1080px] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10">
        <Space className="flex justify-between">
          <Text className="text-2xl font-semibold">Phiếu trả</Text>
          <div className="input-field">
            <div style={{ marginBottom: '8px' }}>Khách hàng</div>
            <input
              className="px-4"
              type="search"
              placeholder="Search customer"
              name="searchField"
              value={searchField}
              onChange={handleChange}
            />
            <label htmlFor="searchfield">Search customer</label>
          </div>
        </Space>
        <div>
          <Divider />
          {currentPage === 'search' && (
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          )}
          {currentPage === 'create' && <div>Create Page Content</div>}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Text className="text-lg font-semibold">Số ngày trễ hạn:</Text>
          <Button type="primary" className="bg-green-600">
            Xác nhận phiếu trả
          </Button>
        </div>
      </div>
      {isOpen && <AddVideoGame />}
    </Fragment>
  );
};

export default Return;