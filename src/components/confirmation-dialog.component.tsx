import React from "react";
import { Button } from "antd";
interface DeleteConfirmationDialogProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }
  const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    isVisible,
    onConfirm,
    onCancel,
  }) => {
    // CSS cho hộp thoại
    const dialogStyle: React.CSSProperties = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-42%, -50%)',
      padding: '28px',
      background: 'grey',
      borderRadius: '40px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: isVisible ? 'block' : 'none',
      width: '900px', // Thay đổi giá trị width ở đây để chỉnh kích cỡ khung pop-up
      maxWidth: '20%',
    };
    const captionStyle: React.CSSProperties = {
      marginBottom: '19px', // Khoảng cách giữa tiêu đề và nội dung
      fontSize: '20px', // Cỡ chữ của tiêu đề
      fontWeight: 'bold', // Đậm chữ tiêu đề
      color:'white'
    };
    const contentStyle: React.CSSProperties = {
      fontSize: '16px', // Cỡ chữ của nội dung
      color: 'white', // Màu chữ của nội dung
      marginBottom: '20px', // Khoảng cách giữa tiêu đề và nội dung
      
    };
    return (
      <div style={dialogStyle}>
        <header style={captionStyle}>Xác nhận xóa</header>
        <div className="dialog-content" style={contentStyle}>
          <p>Bạn có chắc chắn muốn xóa ?</p>
        </div>
        <div className="dialog-actions">
        <Button danger type="primary" onClick={onConfirm}>
            OK
          </Button>
          <Button type="primary" className="bg-blue-500" onClick={onCancel}>
            CANCEL
          </Button>
        </div>
      </div>
    );
  };

export default DeleteConfirmationDialog;
