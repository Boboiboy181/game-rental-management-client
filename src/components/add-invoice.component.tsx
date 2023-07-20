import React, { Fragment, useContext, useEffect, useState } from 'react';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { Button, Divider, Space, Spin, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useNavigate, useParams } from 'react-router-dom';
import { Return } from '../types/return.type.ts';
import { getReturnByID } from '../api/return.service.ts';
import { formatDate } from '../utils/format-date.function.ts';
import { formatPrice } from '../utils/format-price.function.ts';
import { calculatePrice } from '../utils/caculate-price.function.ts';
import { CreateInvoice } from '../types/create-invoice.type.ts';
import { getRegistrationByCustomerID } from '../api/rental-package.service.ts';
import AddVoucher from './add-voucher.component.tsx';
import { VoucherContext } from '../context/voucher.context.tsx';
import { Voucher } from '../types/voucher.type.ts';
import { CloseOutlined } from '@ant-design/icons';
import IsCreating from './is-creating.component.tsx';
import { createInvoice } from '../api/invoice.service.ts';

const { Text } = Typography;

type DataType = {
  key: React.Key;
  productName: string;
  price: number;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
  dayPastDue: number;
  fine: number;
};

const AddInvoice = () => {
  const navigate = useNavigate();
  const { returnID } = useParams();
  const [isMember, setIsMember] = useState(false);
  const [returnTicket, setReturnTicket] = useState<Return>({} as Return);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const { setNavigationKey } = useContext(NavigationKeyContexts);
  const { voucher, setVoucher } = useContext(VoucherContext);

  const checkRegistrationPackage = async (
    customerID: string,
    rentedGames: any,
    createInvoceAt: Date,
  ): Promise<boolean> => {
    const registrationPackageList = await getRegistrationByCustomerID(
      customerID,
    );

    if (registrationPackageList.length === 0) return false;

    const latestRegistrationPackage = registrationPackageList[0];
    const registrationEndDate = new Date(
      latestRegistrationPackage.registrationEndDate,
    );
    // Check if the registration end date is greater than or equal to the createInvoiceAt date
    const isDateValid = registrationEndDate >= createInvoceAt;

    const numberOfRentedGames = rentedGames.reduce((acc: any, game: any) => {
      return acc + game.preOrderQuantity;
    }, 0);

    // Check if the number of games is still valid
    const remainingGame =
      latestRegistrationPackage.numberOfGameRemaining - numberOfRentedGames;
    const isQuantityValid = remainingGame > 0;

    return isDateValid && isQuantityValid;
  };

  const checkMember = async () => {
    if (!returnTicket || !returnTicket.customer) return;

    const result = await checkRegistrationPackage(
      returnTicket.customer._id,
      returnTicket.rentedGames,
      new Date(),
    );

    setIsMember(result);
  };

  useEffect(() => {
    setNavigationKey('7');
    setVoucher({} as Voucher);

    const fetchReturn = async () => {
      try {
        const data = await getReturnByID(returnID || '');
        setReturnTicket(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Handle the error state here (optional)
      }
    };

    fetchReturn();
  }, [returnID]);

  useEffect(() => {
    if (!isLoading) {
      checkMember();
    }
  }, [isLoading, returnTicket]);

  if (isLoading) {
    return (
      <Spin className="text-lg mt-[30%]" size="large" tip="Loading">
        <div className="content"></div>
      </Spin>
    ); // Render a loading state while fetching the data
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: 'Ngày trả',
      dataIndex: 'returnDate',
    },
    {
      title: 'Số lượng',
      dataIndex: 'preOrderQuantity',
      align: 'center',
    },
    {
      title: 'Số ngày trễ hạn',
      dataIndex: 'dayPastDue',
      align: 'center',
      render: (_, record) =>
        record.dayPastDue > 0 ? (
          <span>{record.dayPastDue}</span>
        ) : (
          <span>0</span>
        ),
    },
    {
      title: 'Tiền phạt',
      align: 'center',
      render: (_, record) => (
        <p className="font-semibold">{formatPrice.format(record.fine)}</p>
      ),
    },
    {
      title: 'Giá thuê',
      align: 'center',
      render: (_, record) => (
        <p className="font-semibold text-red-600">
          {formatPrice.format(
            record.preOrderQuantity *
              calculatePrice(record.price, record.numberOfRentalDays),
          )}
        </p>
      ),
    },
  ];

  const data = returnTicket.rentedGames.map((rentedGame, index) => ({
    key: index,
    productName: rentedGame.game.productName,
    price: rentedGame.game.price,
    preOrderQuantity: rentedGame.preOrderQuantity,
    numberOfRentalDays: rentedGame.numberOfRentalDays,
    dayPastDue: rentedGame.daysPastDue,
    fine: rentedGame.fine,
    returnDate: formatDate(rentedGame.returnDate.toString()),
  }));

  const handleCloseBtn = () => {
    navigate('/returns');
  };

  const handleConfirmInvoiceBtn = async () => {
    if (!returnID) return;

    setIsCreating(true);

    const createInvoiceDto: CreateInvoice = {
      returnTicketID: returnID,
      voucherCode: voucher.voucherCode,
    };

    try {
      const respone = await createInvoice(createInvoiceDto);
      console.log(respone);
      setVoucher({} as Voucher);
      setIsCreating(false);
    } catch (error) {
      setIsCreating(false);
      console.log(error);
    }
  };

  const handleVoucherOpen = () => {
    setIsVoucherOpen(true);
  };

  const calculateDiscount = (voucher: Voucher) => {
    if (!voucher.voucherName) return 0;
    const { voucherValue } = voucher;
    return returnTicket.estimatedPrice * (voucherValue / 100);
  };

  const handleDeleteVoucher = () => {
    setVoucher({} as Voucher);
  };

  return (
    <Fragment>
      <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
        <div>
          <Space className="flex flex-col items-start">
            <Text className="text-3xl font-semibold">Hóa đơn</Text>
            <p className="text-xs text-black/40">
              Ngày lập phiếu {formatDate(new Date().toString())}
            </p>
          </Space>
          <div className="flex items-end justify-between">
            <Space className="mt-6">
              <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
                <p className="text-xs text-black/40">Mã phiếu trả</p>
                <p className="mt-2">{returnTicket.returnCode}</p>
              </div>
              <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
                <p className="text-xs text-black/40">Số điện thoại</p>
                <p className="mt-2">{returnTicket.customer.phoneNumber}</p>
              </div>
              <div className="flex flex-col border-black/20 border-b pb-1">
                <p className="text-xs text-black/40">Tên khách hàng</p>
                <p className="mt-2">{returnTicket.customer.customerName}</p>
              </div>
            </Space>
            <Space>
              <Button
                onClick={handleVoucherOpen}
                disabled={isMember}
                className={voucher.voucherName && 'border-red-500 text-red-500'}
              >
                {!voucher.voucherName ? (
                  <span>Phiếu giảm giá +</span>
                ) : (
                  <span>{voucher.voucherName}</span>
                )}
              </Button>
              {voucher.voucherName && (
                <CloseOutlined
                  className={'cursor-pointer hover:text-red-500 p-1'}
                  onClick={handleDeleteVoucher}
                />
              )}
            </Space>
          </div>
          <div>
            <Divider />
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </div>
          <div className="flex justify-between items-center">
            <Space direction="horizontal" className="relative top-[-9%]">
              <Button
                className="bg-blue-500 shadow-xl"
                type="primary"
                onClick={handleCloseBtn}
              >
                Đóng
              </Button>
              <Button
                className="bg-green-600 hover:!bg-green-500 shadow-xl"
                type="primary"
                onClick={handleConfirmInvoiceBtn}
              >
                Xác nhận hóa đơn
              </Button>
            </Space>
            <Space className="flex flex-col items-end">
              <p className="text-lg">
                Phạt:{' '}
                <span className="font-semibold text-red-600">
                  {formatPrice.format(
                    returnTicket.rentedGames.reduce((acc, currentValue) => {
                      return acc + currentValue.fine;
                    }, 0),
                  )}
                </span>
              </p>
              <p className="text-lg">
                Giảm:{' '}
                <span className="font-semibold text-red-600">
                  {formatPrice.format(calculateDiscount(voucher))}
                </span>
              </p>
              <p className="text-2xl">
                Tổng tiền:{' '}
                {isMember ? (
                  <span className="font-semibold text-red-600">0</span>
                ) : (
                  <span className="font-semibold text-red-600">
                    {formatPrice.format(
                      returnTicket.estimatedPrice - calculateDiscount(voucher),
                    )}
                  </span>
                )}
              </p>
            </Space>
          </div>
        </div>
        {isCreating && <IsCreating />}
      </div>
      {isVoucherOpen && (
        <AddVoucher
          setIsVoucherOpen={setIsVoucherOpen}
          customerPoint={returnTicket.customer.point}
        />
      )}
    </Fragment>
  );
};

export default AddInvoice;
