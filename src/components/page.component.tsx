import { Fragment } from 'react';
import { Space, Typography, Divider, Table } from 'antd';
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
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder={`${placeHolder}`}
            name={`${inputName}`}
            value={inputValue}
            onChange={handleChange}
          />
          <label htmlFor={`${inputName}`}>{placeHolder}</label>
        </div>
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
