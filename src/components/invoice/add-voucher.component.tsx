import React, { Fragment, useContext } from 'react';
import { Button, Divider, Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { VoucherContext } from '../../context/voucher.context.tsx';
import { Voucher } from '../../types/invoice/voucher.type.ts';

const { Text } = Typography;

const vouchers: Voucher[] = [
  {
    _id: '64929f25f5cfc8109ffc91ff',
    voucherName: 'Giảm giá 10%',
    voucherValue: 10,
    pointRequired: 10,
    voucherCode: 'GIAMGIA10',
  },
  {
    _id: '64929fd3f5cfc8109ffc9200',
    voucherName: 'Giảm giá 20%',
    voucherValue: 20,
    pointRequired: 20,
    voucherCode: 'GIAMGIA20',
  },
  {
    _id: '64929ff4f5cfc8109ffc9201',
    voucherName: 'Giảm giá 30%',
    voucherValue: 30,
    pointRequired: 30,
    voucherCode: 'GIAMGIA30',
  },
  {
    _id: '6492a00ef5cfc8109ffc9202',
    voucherName: 'Giảm giá 40%',
    voucherValue: 40,
    pointRequired: 40,
    voucherCode: 'GIAMGIA40',
  },
  {
    _id: '6492a031f5cfc8109ffc9203',
    voucherName: 'Giảm giá 50%',
    voucherValue: 50,
    pointRequired: 50,
    voucherCode: 'GIAMGIA50',
  },
];

const AddVoucher = ({
  setIsVoucherOpen,
  customerPoint,
}: {
  setIsVoucherOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerPoint: number;
}) => {
  const { setVoucher } = useContext(VoucherContext);

  const handleCloseBtn = () => {
    setIsVoucherOpen(false);
  };

  const columns: ColumnsType<Voucher> = [
    {
      title: 'Tên voucher',
      dataIndex: 'voucherName',
      key: 'voucherName',
    },
    {
      title: 'Giá trị',
      dataIndex: 'voucherValue',
      key: 'voucherValue',
      align: 'center',
    },
    {
      title: 'Điểm yêu cầu',
      dataIndex: 'pointRequired',
      key: 'pointRequired',
      align: 'center',
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      render: (_, record) => {
        return (
          <Button
            type="primary"
            className={`bg-blue-500 hover:bg-blue-300`}
            disabled={customerPoint < record.pointRequired}
            onClick={() => {
              setVoucher(record);
              setIsVoucherOpen(false);
            }}
          >
            Chọn
          </Button>
        );
      },
    },
  ];

  const data = vouchers.map((voucher) => ({
    key: voucher._id,
    _id: voucher.voucherCode,
    voucherCode: voucher.voucherCode,
    voucherName: voucher.voucherName,
    voucherValue: voucher.voucherValue,
    pointRequired: voucher.pointRequired,
  }));

  return (
    <Fragment>
      <div className="fixed bg-black/[.5] w-screen h-screen">
        <div className="w-[50%] bg-white rounded-md relative p-5 shadow-2xl top-[20%] left-[21%]">
          <Space className="flex justify-between">
            <Text className="text-3xl font-semibold">Chọn voucher</Text>
            <Text className="text-xl">Điểm tích lũy: {customerPoint}</Text>
          </Space>
          <div className="relative">
            <Divider />
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 3 }}
            />
          </div>
          <Button
            type="primary"
            danger
            className="absolute bottom-[8%]"
            onClick={handleCloseBtn}
          >
            Đóng
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddVoucher;
