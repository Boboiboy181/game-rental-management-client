import { AutoComplete, Button, Form, Input, Space, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { getCustomers } from '../../api/customer.service';
import { useEffect, useState } from 'react';
import { Customer } from '../../types/customer/customer.type';
import { registerRentalPackage } from '../../api/rental-package.service';

const { Text } = Typography;

const RentalPackageRegistration = ({
  packageName,
  phoneNumberList,
  setIsOpen,
}: {
  packageName: string;
  phoneNumberList: { phoneNumber: string; registerEndDate: string }[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchField, setSearchField] = useState('');
  const [suggestionCustomers, setSuggestionCustomers] =
    useState<Customer[]>(customers);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response: Customer[] = await getCustomers();
        setCustomers(response);
      } catch (error) {
        console.log('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearchPhoneNumber = (value: string) => {
    setSearchField(value);
    const filteredCustomers = customers.filter((suggestion) =>
      suggestion.phoneNumber.toLowerCase().includes(searchField.toLowerCase()),
    );
    setSuggestionCustomers(filteredCustomers);
  };

  const handleSelectPhoneNumber = (value: string) => {
    setSearchField(value);
  };

  const handleCloseBtn = () => setIsOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerDto = {
      packageSearch: packageName,
      customerSearch: searchField,
    };

    try {
      if (!checkValidResgistration()) {
        toast.error('Khách hàng đang sử dụng một gói thuê', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 8000,
          theme: 'colored',
          pauseOnHover: true,
        });
        return;
      }
      const response = await registerRentalPackage(registerDto);
      handleCloseBtn();

      console.log('Register rental package response:', response);
    } catch (error) {
      console.log('Error registering rental package:', error);
    }
  };

  const checkValidResgistration = (): boolean => {
    const isRegistered = phoneNumberList.some(
      (phoneNumber) => phoneNumber.phoneNumber === searchField,
    );
    if (!isRegistered) {
      return true;
    }
    // check if registerEndDate is valid
    const registerEndDate = phoneNumberList.find(
      (phoneNumber) => phoneNumber.phoneNumber === searchField,
    )?.registerEndDate;
    const currentDate = new Date();
    const registerEndDateObj = new Date(registerEndDate as string);
    if (registerEndDateObj > currentDate) {
      return false;
    }
    return true;
  };

  return (
    <div className="fixed bg-black/[.5] w-full h-full">
      <Form
        layout="horizontal"
        className={
          'absolute bg-white flex flex-col rounded-lg p-6 pb-8 px-10 left-[50%] top-[50%] translate-x-[-70%] translate-y-[-60%]'
        }
        onSubmitCapture={handleSubmit}
      >
        <Text className="text-2xl text-center font-semibold mb-6">
          Đăng ký gói thuê
        </Text>
        <Form.Item label="Số điện thoại">
          <AutoComplete
            value={searchField}
            options={suggestionCustomers.map((item) => ({
              value: item.phoneNumber,
              text: item.phoneNumber,
            }))}
            onSearch={handleSearchPhoneNumber}
            onSelect={handleSelectPhoneNumber}
            listHeight={150}
          />
        </Form.Item>
        <Form.Item label="Tên khách hàng">
          <Input
            required
            type="text"
            placeholder="Tên khách hàng"
            name="customerName"
            value={
              suggestionCustomers.find(
                (customer) => customer.phoneNumber === searchField,
              )?.customerName
            }
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <Space className={'justify-between w-full mb-0'}>
            <Button
              type="primary"
              className="bg-red-500 hover:!bg-red-400"
              onClick={handleCloseBtn}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 w-[70px]"
            >
              Gửi
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default RentalPackageRegistration;
