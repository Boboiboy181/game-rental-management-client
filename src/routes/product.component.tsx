import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product/product.type.ts';
import { toast, ToastContainer } from 'react-toastify';
import { formatPrice } from '../utils/format-price.function';
import AddProduct from '../components/product/add-product.component.tsx';
import UpdateProduct from '../components/product/update-video-game.component.tsx';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';
import { deleteProduct, getProducts } from '../api/product.service.ts';
import DeleteConfirmationDialog from '../components/common/confirmation-dialog.component.tsx';

import ShowData from '../components/common/page.component.tsx';

type DataType = {
  key: string;
  productName: string;
  price: string;
  quantity: number;
  releaseDate: string;
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [searchField, setSearchField] = useState('');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const { setNavigationKey } = useContext(NavigationKeyContexts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  useEffect(() => {
    setNavigationKey('2');
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, [isAddOpen, isUpdateOpen]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Ngày sản xuất',
      dataIndex: 'releaseDate',
      align: 'center',
    },
  ];

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      return product.productName.toLowerCase().includes(searchField);
    });
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField]);

  const data = filteredProducts.map((product) => ({
    key: product._id,
    productName: product.productName,
    price: formatPrice.format(product.price),
    quantity: product.quantity,
    releaseDate: product.releaseDate,
  }));

  const rowSelection = {
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleConfirmDeleteOpen = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete selected rows
      setIsConfirmDeleteOpen(false);
      await Promise.all(
        selectedRowKeys.map(async (key) => {
          await deleteProduct(key.toString());
        }),
      );

      toast.success('Xóa video game thành công 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });

      const data = await getProducts();
      setProducts(data);
      setSelectedRowKeys([]);
    } catch (error: any) {
      // if (error.response.status === 404) {
      toast.error('Không thể xóa video game 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      // return;
      // }
      console.log('Error deleting rows:', error);
    }
  };

  const productsNameList = products.map((product) => product.productName);

  const handleAddBtn = () => {
    setIsAddOpen(true);
  };

  const handleUpdateBtn = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      toast.error('Vui lòng chọn 1 video game để cập nhật 😞', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
      return;
    }
    setIsUpdateOpen(true);
  };

  return (
    <Fragment>
      <div className="w-[90%] h-[80%] bg-white rounded-md relative top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%] p-10 shadow-2xl">
        <ShowData
          pageName="Video game"
          placeHolder="Tên video game"
          columns={columns}
          data={data}
          inputName="searchField"
          inputValue={searchField}
          rowSelection={rowSelection}
          handleChange={handleChange}
        />
        <Space direction="horizontal" className="relative top-[-9%]">
          <Button type="primary" className="bg-blue-500" onClick={handleAddBtn}>
            Thêm
          </Button>
          <Button danger type="primary" onClick={handleConfirmDeleteOpen}>
            Xóa
          </Button>
          <Button
            type="primary"
            className="bg-green-600 hover:!bg-green-500"
            onClick={handleUpdateBtn}
          >
            Sửa
          </Button>
        </Space>
      </div>
      {isAddOpen && (
        <AddProduct
          setIsAddOpen={setIsAddOpen}
          productsNameList={productsNameList}
        />
      )}
      {isUpdateOpen && (
        <UpdateProduct
          setIsUpdateOpen={setIsUpdateOpen}
          selectedUpdate={selectedRowKeys}
          setProducts={setProducts}
        />
      )}
      {isConfirmDeleteOpen && (
        <DeleteConfirmationDialog
          onConfirm={handleConfirmDelete}
          setOpenConfirmation={setIsConfirmDeleteOpen}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ProductPage;
