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
  customerName: string;
  email: string;
  phoneNumber: string;
}

const DetailRentalPackage: React.FC<DetailRentalPackageProps> = ({ rentalPackageId, onClose }) => {
  const [rentalPackage, setRentalPackage] = useState<RentalPackage | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchRentalPackage = async () => {
      try {
        const response = await axios.get(`https://game-rental-management-app-yh3ve.ondigitalocean.app/rental-package/${rentalPackageId}`);
        setRentalPackage(response.data);
      } catch (error) {
        console.log('Error fetching rental package:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`https://game-rental-management-app-yh3ve.ondigitalocean.app/customer`);
        setCustomers(response.data);
      } catch (error) {
        console.log('Error fetching customers:', error);
      }
    };

    fetchRentalPackage();
    fetchCustomers();
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
