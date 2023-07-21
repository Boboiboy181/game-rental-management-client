import { Fragment } from 'react';
import { Space, Typography, Divider, Table } from 'antd';
import Input from './input.component';
const { Text } = Typography;

type ShowDataProps = {
  pageName: string;
  columns: any;
  data: any;
  rowSelection: any;
  placeHolder: string;
  inputName: string;
  inputValue: string;
  handleChange: any;
};

const ShowData = (props: ShowDataProps) => {
  const {
    pageName,
    columns,
    data,
    rowSelection,
    placeHolder,
    inputName,
    inputValue,
    handleChange,
  } = props;
  return (
    <Fragment>
      <Space className="flex justify-between">
        <Text className="text-3xl font-semibold">{pageName}</Text>
        <Input
          placeHolder={placeHolder}
          inputName={inputName}
          inputValue={inputValue}
          handleChange={handleChange}
        />
      </Space>
      <div>
        <Divider />
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Fragment>
  );
};

export default ShowData;
