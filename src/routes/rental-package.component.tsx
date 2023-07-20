import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { formatPrice } from '../utils/format-price.function';
import { RentalPackage } from '../types/rental-package.type';
import AddRentalPackage from '../components/add-rental-package.component';
import UpdateRentalPackage from '../components/update-rental-package.component';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts';
import {
  deleteRentalPackage,
  getRentalPackages,
} from '../api/rental-package.service.ts';
import ShowData from '../components/page.component.tsx';

const { Text } = Typography;

type DataType = {
  key: string;
  packageName: string;
  numberOfGames: number;
  timeOfRental: number;
  price: string;
};

const RentalPackagePage = () => {
  const [rentalPackages, setRentalPackages] = useState<RentalPackage[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [filteredRentalPackages, setFilteredRentalPackages] = useState<
    RentalPackage[]
  >([]);
  const [searchField, setSearchField] = useState('');
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('3');
  }, []);

  useEffect(() => {
    const fetchRentalPackages = async () => {
      try {
        const response = await getRentalPackages();
        setRentalPackages(response);
      } catch (error) {
        console.log('Error fetching rental packages:', error);
      }
    };

    fetchRentalPackages();
  }, []);

  useEffect(() => {
    const newFilteredRentalPackages = rentalPackages.filter((pkg) => {
      return pkg.packageName.toLowerCase().includes(searchField);
    });
    setFilteredRentalPackages(newFilteredRentalPackages);
  }, [rentalPackages, searchField]);

  const data = filteredRentalPackages.map((pkg) => ({
    key: pkg._id,
    packageName: pkg.packageName,
    numberOfGames: pkg.numberOfGames,
    price: formatPrice.format(pkg.price),
    timeOfRental: pkg.timeOfRental,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên gói thuê',
      dataIndex: 'packageName',
    },
    {
      title: 'Số lượng thuê',
      dataIndex: 'numberOfGames',
      align: 'center',
      width: 200,
    },
    {
      title: 'Thời gian thuê',
      dataIndex: 'timeOfRental',
      align: 'center',
      render: (timeOfRental: number) => <Text>{timeOfRental} ngày</Text>,
    },
    {
      title: 'Giá thuê',
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => <Text className="font-medium">{price}</Text>,
    },
    {
      title: 'Thao tác',
      dataIndex: 'timeOfRental',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          className="bg-blue-600"
          onClick={() => handleDetailBtn(record.key)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  const rowSelection = {
    onChange: (selectedKeys: string[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const rentalPackagesNameList = rentalPackages.map((pkg) => pkg.packageName);

  const handleDeleteBtn = async () => {
    try {
      // Delete selected rows
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await deleteRentalPackage(key.toString());
        }),
      );

      // Fetch updated rental packages data
      const response = await getRentalPackages();
      setRentalPackages(response);
      setSelectedRowKeys([]);

      setSearchField('');
    } catch (error) {
      console.log('Error deleting rental packages:', error);
    }
  };

  const handleDetailBtn = (key: string) => {
    navigate(`/rental-packages/${key}`);
  };

  const handleAddBtn = () => {
    setIsAddOpen(true);
  };

  const handleUpdateBtn = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      toast.error('Vui lòng chỉ chọn 1 gói thuê để cập nhật 😞', {
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
        <ShowData
          pageName="Gói thuê"
          placeHolder="Tên gói thuê"
          inputName="searchField"
          inputValue={searchField}
          handleChange={handleChange}
          columns={columns}
          data={data}
          rowSelection={rowSelection}
        />
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
        <AddRentalPackage
          setIsAddOpen={setIsAddOpen}
          rentalPackagesNameList={rentalPackagesNameList}
        />
      )}
      {isUpdateOpen && (
        <UpdateRentalPackage
          setIsUpdateOpen={setIsUpdateOpen}
          selectedUpdate={selectedRowKeys}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default RentalPackagePage;
