import { Space, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Rental } from '../types/rental.type';
import { formatPrice } from '../utils/format-price.function';
import { useNavigate } from 'react-router-dom';
import { delelteRental, getRentals } from '../api/rental.service';
import ShowData from '../components/page.component';

type DataType = {
  key: string;
  customerName: string;
  deposit: number;
  returnValue: number;
  returnState: string;
  estimatedPrice: number;
};

const RentalPage = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>(rentals);
  const [searchField, setSearchField] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRental = async () => {
      const rentalData: Rental[] = await getRentals();
      setRentals(rentalData);
    };

    fetchRental();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    const newFilteredRental = rentals.filter((rental) => {
     return rental.customer.customerName.toLowerCase().includes(searchField);
    });
    setFilteredRental(newFilteredRental);
  }, [searchField, filteredRental]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
    },
    {
      title: 'Trạng thái trả',
      dataIndex: 'returnState',
      align: 'center',
      render: (_, { returnState }) => {
        let color = 'green';
        if (returnState === 'NOT_RETURNED') color = 'red';
        if (returnState === 'NOT_ENOUGH') color = 'orange';
        return (
          <Tag key={returnState} color={color} className="ml-2">
            {returnState}
          </Tag>
        );
      },
    },
    {
      title: 'ReturnState',
      dataIndex: 'returnstate',
    },
    {
      title: 'EstimatedPrice',
      dataIndex: 'estimatedprice',
    },
  ];

  useEffect(() => {
    const newFilteredRentals = rentals.filter((rental) => {
      return rental.customer.customerName.toLowerCase().includes(searchField);
    });
    setFilteredRentals(newFilteredRentals);
  }, [rentals, searchField]);

  const data = filteredRentals.map((rental) => ({
    key: rental._id,
    customerName: rental.customer.customerName,
    deposit: formatPrice.format(rental.deposit),
    returnState: rental.returnState,
    estimatedPrice: formatPrice.format(rental.estimatedPrice),
  }));


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  const rowSelection = {
    onChange: (selectedKeys: string[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDeleteBtn = async () => {
    try {
      // Delete selected rows
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await delelteRental(key);
        }),
      );

      // Fetch updated products data
      const rentalData: Rental[] = await getRentals();
      // Update customer state and selectedRowKeys state
      setRentals(rentalData);
      setSelectedRowKeys([]);

      // Refresh the page by updating the searchField state
      setSearchField('');
    } catch (error) {
      console.log('Error deleting rows:', error);
    }
  };

  const handleDetailBtn = (key: string) => {
    navigate(`/rentals/${key}`);
  };

  const handleAddBtn = () => {
    navigate('/rentals/create');
  };

  return (
    <div
      className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] 
    translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl"
    >
      <ShowData
        pageName="Phiếu thuê"
        placeHolder="Tên khách hàng"
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
      </Space>
    </div>
  );
};

export default RentalPage;