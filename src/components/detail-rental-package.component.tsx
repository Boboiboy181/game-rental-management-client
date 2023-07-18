import { Modal, Typography, Table, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RentalPackage } from '../types/rental-package.type';

const { Text } = Typography;

interface DetailRentalPackageProps {
  rentalPackageId: string;
  onClose: () => void;
}

interface Customer {
  _id: string;
  customerName: string;
  email: string;
  phoneNumber: string;
}

const DetailRentalPackage: React.FC<DetailRentalPackageProps> = ({ rentalPackageId, onClose }) => {
  const [rentalPackage, setRentalPackage] = useState<RentalPackage | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentalPackageResponse = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/${rentalPackageId}`
        );
        setRentalPackage(rentalPackageResponse.data);

        const customersResponse = await axios.get(
          `https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/registration-list`
        );
        const registrations = customersResponse.data;

        const filteredRegistrations = registrations.filter(
          (registration: any) => registration.rentalPackage === rentalPackageId
        );

        const customerIds = filteredRegistrations.map((registration: any) => registration.customer);
        const uniqueCustomerIds = Array.from(new Set<string>(customerIds));

        const customerPromises = uniqueCustomerIds.map(async (customerId: string) => {
          const customerResponse = await axios.get(
            `https://game-rental-management-app-yh3ve.ondigitalocean.app/customer/${customerId}`
          );
          return customerResponse.data;
        });

        const customersData = await Promise.all<Customer>(customerPromises);
        setCustomers(customersData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [rentalPackageId]);

  if (!rentalPackage) {
    return null;
  }

  const rentalPackageColumns = [
    {
      title: 'Tên gói thuê',
      dataIndex: 'packageName',
    },
    {
      title: 'Số lượng thuê',
      dataIndex: 'numberOfGames',
      align: 'center',
      render: (numberOfGames: number) => <Text>{numberOfGames}</Text>,
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
      render: (price: number) => <Text className="font-medium">{price} đ</Text>,
    },
  ];

  const customerColumns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  return (
    <Modal
      visible
      title="Chi tiết gói thuê"
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text strong>Thông tin gói thuê:</Text>
          <Table
            columns={rentalPackageColumns}
            dataSource={[rentalPackage]}
            pagination={false}
            size="small"
          />
        </div>

        <div>
          <Text strong style={{ marginBottom: 8 }}>Danh sách khách hàng đăng ký gói thuê:</Text>
          {customers.length > 0 ? (
            <Table
              columns={customerColumns}
              dataSource={customers}
              pagination={false}
              size="small"
            />
          ) : (
            <p>Không có khách hàng đăng ký gói thuê</p>
          )}
        </div>

        <Space direction="horizontal">
          <Button type="primary" className="bg-red-600" >
            Xóa
          </Button>
          <Button type="primary" className="bg-green-600" style={{ marginLeft: 10 }}>
            Sửa
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default DetailRentalPackage;
