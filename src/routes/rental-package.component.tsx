import { Space, Typography, Divider, Button } from 'antd';
import Table from 'antd/es/table';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { formatPrice } from '../utils/format-price.function';
import { RentalPackage } from '../types/rental-package.type';
import AddRentalPackage from '../components/add-rentalpackage.component';
import UpdateRentalPackage from '../components/update-rentalpackage.component';
import { ToastContainer, toast } from 'react-toastify';

const { Text } = Typography;

const RentalPackagePage = () => {
  const [rentalpackage, setRentalPackage] = useState<RentalPackage[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredRentalPackage, setFilteredRentalPackage] = useState<RentalPackage[]>(rentalpackage);
  const [searchField, setSearchField] = useState('');
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  useEffect(() => {
    const newFilteredRentalPackage = rentalpackage.filter((rentalpackage) => {
      return rentalpackage.packageName.toLowerCase().includes(searchField);
    });
    setFilteredRentalPackage(newFilteredRentalPackage);
  }, [rentalpackage, searchField]);

  const data = filteredRentalPackage.map((rentalpackage) => ({
    key: rentalpackage._id,
    packageName: rentalpackage.packageName,
    numberOfGames: rentalpackage.numberOfGames,
    price: formatPrice.format(rentalpackage.price),
    timeOfRental: rentalpackage.timeOfRental,
  }));

  useEffect(() => {
    const fetchRentalPackage = async () => {
      const { data }: { data: RentalPackage[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package',
      );
      setRentalPackage(data);
    };

    fetchRentalPackage();
  }, []);

  const columns = [
    {
      title: 'Tên gói thuê',
      dataIndex: 'packageName',
    },
    {
      title: 'Số lượng Games',
      dataIndex: 'numberOfGames',
    },
    {
      title: 'Giá thuê',
      dataIndex: 'price',
    },
    {
      title: 'Thời gian thuê',
      dataIndex: 'timeOfRental',
    },
  ];

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
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/${key}`,
          );
        }),
      );

      // Fetch updated products data
      const { data }: { data: RentalPackage[] } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package',
      );

      setRentalPackage(data);
      setSelectedRowKeys([]);

      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  const handleAddBtn = () => {
    setIsAddOpen(true);
  };

  const handleUpdateBtn = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      toast.error('Vui lòng chỉ chọn 1 Gói thuê để cập nhật 😞', {
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
      <div className="w-[1080px] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10">
        <Space className="flex justify-between">
          <Text className="text-2xl font-semibold">GÓI THUÊ</Text>
          <div className="input-field">
            <input
              className="px-4"
              type="search"
              placeholder="Tìm kiếm gói thuê"
              name="searchField"
              value={searchField}
              onChange={handleChange}
            />
            <label htmlFor="searchfield">Tìm kiếm gói thuê</label>
          </div>
        </Space>
        <div className='relative'> 
          <Divider />
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize:5 }}
          />
          <Space direction="horizontal" className="">
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
              className="bg-green-600 hover:!bg-green-500"
              onClick={handleUpdateBtn}
            >
              Sửa
            </Button>
          </Space>
        </div>
      </div>
      {isAddOpen && <AddRentalPackage setIsAddOpen={setIsAddOpen} />}
      {isUpdateOpen && (
        <UpdateRentalPackage
          setIsUpdateOpen={setIsUpdateOpen}
          selectedUpdate={selectedRowKeys}
          setRentalPackage={setRentalPackage}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default RentalPackagePage;