import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const PreOrderDetail = () => {
  const { preOrderID } = useParams();
  const navigate = useNavigate();
  const handleCloseDetailBtn = () => navigate('/pre-orders');

  return (
    <div>
      <p>{preOrderID}</p>
      <Button
        type="primary"
        className="bg-red-600"
        onClick={handleCloseDetailBtn}
      >
        Đóng
      </Button>
    </div>
  );
};

export default PreOrderDetail;
