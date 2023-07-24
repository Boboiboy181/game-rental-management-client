import { Button, Divider, Space, Spin, Table, Typography } from 'antd';
import { RentalPackage } from '../../types/rental-package/rental-package.type.ts';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/format-price.function.ts';
import { RegisterRentalPackage } from '../../types/rental-package/register-rental-package.type.ts';
import { ColumnsType } from 'antd/es/table';
import { formatDate } from '../../utils/format-date.function.ts';
import RentalPackageRegistration from './register-rental-package.component.tsx';
import { NavigationKeyContexts } from '../../context/navigation-key.context.ts.tsx';
import {
  deleteRegister,
  getRegisterList,
  getRentalPackageByID,
} from '../../api/rental-package.service.ts';
import { ToastContainer, toast } from 'react-toastify';

const { Text } = Typography;

type DataType = {
  key: string;
  customerName: string;
  phoneNumber: string;
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
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('3');
    const fetchRentalPackage = async () => {
      try {
        const response = await getRentalPackageByID(rentalPackageID);
        setRentalPackage(response);
      } catch (error) {
        console.log('Error fetching rental package:', error);
      }
    };

    fetchRentalPackage();
  }, []);

  useEffect(() => {
    const fetchRegisterList = async () => {
      try {
        const registerResponse = await getRegisterList(
          rentalPackage.packageName,
        );
        setRegisterList(registerResponse);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching register list:', error);
      }
    };

    fetchRegisterList();
  }, [rentalPackage, isRegisterOpen]);

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
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
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
            onClick={handleRenewBtn}
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
      phoneNumber: register.customer.phoneNumber,
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

  const handleRenewBtn = () => {
    toast.error('Không thể gia hạn khi vẫn còn hạn đăng ký', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      theme: 'colored',
      pauseOnHover: true,
    });
  };

  const handleDeleteBtn = async (record: DataType) => {
    try {
      if (record.numberOfGameRemaining !== rentalPackage.numberOfGames) {
        toast.error('Không thể xóa đăng ký gói thuê', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: 'colored',
          pauseOnHover: true,
        });
        return;
      }

      await deleteRegister(record.key);
      const newRegisterList = registerList.filter(
        (register) => register._id !== record.key,
      );
      setRegisterList(newRegisterList);
    } catch (error) {
      console.log('Error deleting register:', error);
    }
  };

  const handleRegisterBtn = () => {
    setIsRegisterOpen(true);
  };

  const phoneNumberList = registerList.map((register) => {
    return {
      phoneNumber: register.customer.phoneNumber,
      registerEndDate: register.registrationEndDate,
    };
  });

  return (
    <Fragment>
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
              <p className="mt-2">{rentalPackage.numberOfGames + ' đĩa'}</p>
            </div>
            <div className="flex flex-col border-black/20 border-b pb-1">
              <p className="text-xs text-black/40">Thời gian của gói</p>
              <p className="mt-2">{rentalPackage.timeOfRental + ' ngày'}</p>
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
        <Space direction="horizontal" className="relative top-[-8.5%]">
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
            onClick={handleRegisterBtn}
          >
            Đăng ký gói thuê
          </Button>
        </Space>
      </div>
      {isRegisterOpen && (
        <RentalPackageRegistration
          packageName={rentalPackage.packageName}
          setIsOpen={setIsRegisterOpen}
          phoneNumberList={phoneNumberList}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default RentalPackageDetail;
