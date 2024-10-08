import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BellDialog({ show, setShow, current }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      style={{ backdropFilter: "blur(8px)" }} // Hiệu ứng mờ nền khi modal xuất hiện
    >
      <Modal.Body
        style={{
          background: "linear-gradient(135deg, #f3e5f5, #fce4ec)", // Gradient màu tím nhạt đến hồng nhạt
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Bóng đổ tinh tế
        }}
      >
        {/* Header */}
        <h4
          className="border-bottom pb-3 text-center"
          style={{
            fontWeight: "bold",
            color: "#673ab7", // Màu tím nổi bật
            fontSize: "22px",
          }}
        >
          Thông báo quan trọng
        </h4>

        {/* Name */}
        <div
          className="ts-smd mt-3"
          style={{
            color: "#e91e63", // Màu hồng nổi bật cho phần tên
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {current.name}
        </div>

        {/* Title */}
        <div
          className="mt-3 ps-3"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#3f51b5", // Màu xanh đậm
          }}
        >
          {current.title}
        </div>

        {/* Content */}
        <div
          className="mt-3 border border-2 rounded py-2 ps-3"
          style={{
            backgroundColor: "#f8bbd0", // Màu nền hồng nhẹ cho nội dung
            borderColor: "#e91e63", // Màu viền hồng đậm
            whiteSpace: "pre-line",
            fontSize: "16px",
          }}
        >
          {current.content}
        </div>

        {/* Button Close */}
        <Button
          className="mt-4 d-block ms-auto"
          size="lg"
          variant="outline-danger"
          onClick={handleClose}
          style={{
            padding: "8px 24px",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "30px", // Nút bo tròn
            transition: "all 0.3s ease", // Hiệu ứng khi hover
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e91e63";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#e91e63";
          }}
        >
          Đóng
        </Button>
      </Modal.Body>
    </Modal>
  );
}
