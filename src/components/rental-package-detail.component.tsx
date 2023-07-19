import { Button, Divider, Space, Spin, Table, Typography } from 'antd';
import { RentalPackage } from '../types/rental-package.type';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/format-price.function';
import { RegisterRentalPackage } from '../types/register-rental-package.type';
import { ColumnsType } from 'antd/es/table';
import { formatDate } from '../utils/format-date.function';

const { Text } = Typography;

type DataType = {
  key: string;
  customerName: string;
  registrationDate: string;
  registrationEndDate: string;
  numberOfGameRemaining: number;
};

const RentalPackageDetail = () => {
  const navigate = useNavigate();
  const { rentalPackageID } = useParams();
  const [loading, setLoading] = useState(true);
  const [rentalPackage, setRentalPackage] = useState<RentalPackage>(
    {} as RentalPackage,
  );
  const [registerList, setRegisterList] = useState<RegisterRentalPackage[]>([]);
  const [filteredRegisterList, setFilteredRegisterList] =
    useState<RegisterRentalPackage[]>(registerList);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    const fetchRentalPackage = async () => {
      try {
        const response = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/${rentalPackageID}`,
        );
        setRentalPackage(response.data);
        // setLoading(false);
      } catch (error) {
        console.log('Error fetching rental package:', error);
      }
    };

    fetchRentalPackage();
  }, []);

  useEffect(() => {
    const fetchRegisterList = async () => {
      try {
        const registerResponse = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/registration-list?packageName=${rentalPackage.packageName}`,
        );
        setRegisterList(registerResponse.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching register list:', error);
      }
    };

    fetchRegisterList();
  }, [rentalPackage]);

  useEffect(() => {
    const newFilteredRegisterList = registerList.filter((register) => {
      return register.customer.customerName.toLowerCase().includes(searchField);
    });
    setFilteredRegisterList(newFilteredRegisterList);
  }, [registerList, searchField]);

  if (loading) {
    return (
      <Spin className="text-lg mt-[30%]" size="large" tip="Loading">
        <div className="content"></div>
      </Spin>
    ); // Render a loading state while fetching the data
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'registrationDate',
      align: 'center',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'registrationEndDate',
      align: 'center',
    },
    {
      title: 'Số lượng khả dụng',
      dataIndex: 'numberOfGameRemaining',
      align: 'center',
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="bg-blue-500 hover:!bg-blue-400 shadow-xl"
            type="primary"
            // onClick={() => handleUpdateBtn(record)}
          >
            Gia hạn
          </Button>
          <Button
            className="bg-red-500 hover:!bg-red-400 shadow-xl"
            type="primary"
            danger
            onClick={() => handleDeleteBtn(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data = filteredRegisterList.map((register) => {
    return {
      key: register._id,
      customerName: register.customer.customerName,
      registrationDate: formatDate(register.registrationDate),
      registrationEndDate: formatDate(register.registrationEndDate),
      numberOfGameRemaining: register.numberOfGameRemaining,
    };
  });

  const handleCloseDetailBtn = () => {
    navigate('/rental-packages');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  const handleDeleteBtn = async (record: DataType) => {
    try {
      await axios.delete(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/registration-list/${record.key}`,
      );
      const newRegisterList = registerList.filter(
        (register) => register._id !== record.key,
      );
      setRegisterList(newRegisterList);
    } catch (error) {
      console.log('Error deleting register:', error);
    }
  };

  return (
    <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
      <Space className="flex items-center justify-between">
        <Text className="text-3xl font-semibold">
          Chi tiết gói thuê{' '}
          <span className={'text-gray-400 font-light ml-1'}>
            #{rentalPackage.packageName}
          </span>
        </Text>
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Tên khách hàng"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Tên khách hàng</label>
        </div>
      </Space>
      <div className="flex items-end justify-between">
        <Space className="mt-6">
          <div className="flex flex-col mr-2 border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Số lượng game</p>
            <p className="mt-2">{rentalPackage.numberOfGames}</p>
          </div>
          <div className="flex flex-col border-black/20 border-b pb-1">
            <p className="text-xs text-black/40">Thời gian của gói</p>
            <p className="mt-2">{rentalPackage.timeOfRental}</p>
          </div>
        </Space>
        <p className="text-lg">
          Giá gói thuê:{' '}
          <span className="font-semibold">
            {formatPrice.format(rentalPackage.price)}
          </span>
        </p>
      </div>
      <div>
        <Divider />
        <Space className="flex justify-between items-center mb-4">
          <Text className="text-xl font-semibold block">
            Danh sách khách hàng đăng ký gói thuê
          </Text>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 3 }}
        />
      </div>
      <div className="flex justify-between items-center">
        <Space direction="horizontal" className="relative top-[-9%]">
          <Button
            className="shadow-xl"
            type="primary"
            danger
            onClick={handleCloseDetailBtn}
          >
            Đóng
          </Button>
          <Button
            className="bg-green-600 hover:!bg-green-500 shadow-xl"
            type="primary"
            // onClick={handleCreateReturnBtn}
            // disabled={rentalPackage.paymentState === 'RETURNED'}
          >
            Đăng ký gói thuê
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default RentalPackageDetail;
