import { Modal, Typography, Table } from 'antd';
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

  const customerColumns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
  ];

  return (
    <Modal
      visible
      title="Chi tiết gói thuê"
      onCancel={onClose}
      onOk={onClose}
      okText="Đóng"
    >
      <p>Tên gói thuê: {rentalPackage.packageName}</p>
      <p>Số lượng thuê: {rentalPackage.numberOfGames}</p>
      <p>Thời gian thuê: {rentalPackage.timeOfRental} ngày</p>
      <p>Giá thuê: {rentalPackage.price}</p>

      <Text strong>Danh sách khách hàng đăng ký gói thuê:</Text>
      {customers.length > 0 ? (
        <Table columns={customerColumns} dataSource={customers} pagination={false} />
      ) : (
        <p>Không có khách hàng đăng ký gói thuê</p>
      )}
    </Modal>
  );
};

export default DetailRentalPackage;
