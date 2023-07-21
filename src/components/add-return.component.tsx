import { Button, Space, Spin, Typography } from 'antd';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../utils/format-date.function';
import Table, { ColumnsType } from 'antd/es/table';
import { toast, ToastContainer } from 'react-toastify';
import { Rental } from '../types/rental.type.ts';
import { getRentalById } from '../api/rental.service.ts';
import { CreateReturn } from '../types/create-return.type.ts';
import { Return } from '../types/return.type.ts';
import { createReturn, getReturnByID } from '../api/return.service.ts';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';

const { Text } = Typography;

type DataType = {
  key: string;
  gameID: string;
  productName: string;
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
};

type RentedGame = {
  game: {
    _id: string;
    productName: string;
    price: number;
  };
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
  _id: string;
};

const AddReturn = () => {
  const navigate = useNavigate();
  const { rentalID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rental, setRental] = useState<Rental>({} as Rental);
  const [returnGames, setReturnGames] = useState<DataType[]>([]);
  const [returnGamesBackup, setReturnGamesBackup] = useState<DataType[]>([]);


  const { setNavigationKey } = useContext(NavigationKeyContexts);

  useEffect(() => {
    setNavigationKey('6');
    const fetchRental = async () => {
      try {
        const data: Rental = await getRentalById(rentalID);
        setRental(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRental();
  }, []);

  const gamesReturnedList = async (returnIDs: any): Promise<RentedGame[]> => {
    const gameReturnedFromReturnIDs = returnIDs.map(
      async (returnID: string) => {
        const returnTicket: Return = await getReturnByID(returnID);
        return returnTicket.rentedGames;
      },
    );

    return (await Promise.all(gameReturnedFromReturnIDs)).reduce(
      (acc: RentedGame[], curr) => {
        return [...acc, ...curr];
      },
      [],
    );
  };

  useEffect(() => {
    if (!isLoading && rental.rentedGames.length > 0) {
      const handleGameReturned = async () => {
        const gameReturned = await gamesReturnedList(rental.returnIDs);

        const returnGamesData = rental.rentedGames
          .filter((item) => {
            return !gameReturned.some(
              (returnedItem) => returnedItem.game._id === item.game._id,
            );
          })
          .map((item) => {
            return {
              key: item._id,
              gameID: item.game._id,
              productName: item.game.productName,
              preOrderQuantity: item.preOrderQuantity,
              numberOfRentalDays: item.numberOfRentalDays,
              returnDate: item.returnDate,
            };
          });

        // set the video-games to be returned
        setReturnGames(returnGamesData);
        setReturnGamesBackup(returnGamesData);
      };

      handleGameReturned();
    }
  }, [isLoading, rental.rentedGames]);

  if (isLoading) {
    return (
      <Spin className="text-lg mt-[30%]" size="large" tip="Loading">
        <div className="content"></div>
      </Spin>
    );
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên game',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'preOrderQuantity',
      align: 'center',
    },
    {
      title: 'Số ngày thuê',
      dataIndex: 'numberOfRentalDays',
      align: 'center',
    },
    {
      title: 'Ngày phải trả',
      align: 'center',
      dataIndex: 'returnDate',
      render: (_, record) => <p>{formatDate(record.returnDate)}</p>,
    },
    {
      title: 'Số ngày trễ',
      align: 'center',
      render: (_, record) => {
        const daysPastDue = Math.floor(
          (Date.now() - new Date(record.returnDate).getTime()) /
            (1000 * 3600 * 24),
        );
        return <p>{daysPastDue > 0 ? daysPastDue : 0}</p>;
      },
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          danger
          className="bg-blue-600"
          onClick={() => handleDeleteBtn(record.key)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleCloseBtn = () => {
    navigate(`/rentals/${rentalID}`);
  };

  const handleDeleteBtn = (key: string) => {
    const newReturnGames = returnGames.filter((item) => item.key !== key);
    setReturnGames(newReturnGames);
  };

  const handleResetBtn = () => {
    setReturnGames(returnGamesBackup);
  }

  const handleCreateBtn = async () => {
    if (!rentalID) return;
    if (!returnGames.length) {
      toast.error('Không đủ số lượng!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return;
    }
    const createReturnDto: CreateReturn = {
      rentalId: rentalID,
      rentedGames: returnGames.map((item) => ({
        gameID: item.gameID,
        preOrderQuantity: item.preOrderQuantity,
      })),
    };

    try {
      const respone: Return = await createReturn(createReturnDto);
      navigate(`/returns/${respone._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
        <div>
          <Space className="flex flex-col items-start">
            <Text className="text-3xl font-semibold">Phiếu trả</Text>
            <p className="text-xs text-black/40">
              Ngày lập phiếu {formatDate(new Date().toString())}
            </p>
          </Space>
          <div className="flex items-end justify-between">
            <Space className="mt-8">
              <div className="flex flex-col mr-10 border-black/20 border-b pb-1">
                <p className="text-xs text-black/40">Mã phiếu thuê</p>
                <p className="mt-2">{rental.rentalCode}</p>
              </div>
              <div className="flex flex-col border-b-black/20 border-b mr-5">
                <p className="text-xs text-black/40">Số điện thoại</p>
                <p className="mt-2">{rental.customer.phoneNumber}</p>
              </div>
              <div className="flex flex-col border-b-black/20 border-b mr-5">
                <p className="text-xs text-black/40">Tên khách hàng</p>
                <p className="mt-2">{rental.customer.customerName}</p>
              </div>
            </Space>
          </div>
          <div className="text-right my-5">
            <Table
              columns={columns}
              dataSource={returnGames}
              pagination={{ pageSize: 3 }}
            />
          </div>
          <div className="flex justify-between items-center">
            <Space direction="horizontal" className="relative top-[-9%]">
              <Button
                className="bg-blue-500"
                type="primary"
                danger
                onClick={handleCloseBtn}
              >
                Đóng
              </Button>
              <Button
                className="bg-green-600 hover:!bg-green-500"
                type="primary"
                htmlType="submit"
                onClick={handleCreateBtn}
              >
                Xác nhận phiếu trả
              </Button>
              {returnGames.length < returnGamesBackup.length && (
                <Button
                  className="bg-blue-600 hover:!bg-blue-500"
                  type="primary"
                  htmlType="submit"
                  onClick={handleResetBtn}
                >
                  Đặt lại
                </Button>
              )}
            </Space>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AddReturn;
