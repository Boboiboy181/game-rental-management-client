import { Modal, Typography, Table } from 'antd';
import { RentalPackage } from '../types/rental-package.type';

const { Text } = Typography;

interface DetailRentalPackageProps {
  rentalPackage: RentalPackage | null;
  customers: { name: string; email: string }[];
  onClose: () => void;
}

const DetailRentalPackage: React.FC<DetailRentalPackageProps> = ({ rentalPackage, customers, onClose }) => {
  if (!rentalPackage) {
    return null;
  }

  const customerColumns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
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
      {customers && customers.length > 0 ? (
        <Table columns={customerColumns} dataSource={customers} pagination={false} />
      ) : (
        <p>Không có khách hàng đăng ký gói thuê</p>
      )}
    </Modal>
  );
};

export default DetailRentalPackage;
