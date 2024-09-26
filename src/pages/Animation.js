import React, { useState } from 'react'; // Nhập useState từ React
import { Container } from 'react-bootstrap';
import anh1 from '../assets/images/anh1.gif';
import anh2 from '../assets/images/fan.png';
import Button from 'react-bootstrap/Button';

const Animation = () => {
  // Sử dụng state để quản lý ảnh hiện tại
  const [anh, setAnh] = useState(anh1);

  // Hàm xử lý sự kiện khi nhấp vào nút
  const handleImg = (e) => {
    const { name } = e.target;
    if (name === 'btu1') {
      setAnh(anh1);
    } else if (name === 'btu2') {
      setAnh(anh2);
    }
  };

  return (
    <Container>
      <div className="row">
        <div className="col-3 mb-3">
          <div className="card" style={{ maxWidth: '18rem' }}>
            <img src={anh} className="card-img-top" alt="..." />
            <div className="card-body">
              <Button onClick={handleImg} name="btu1">Đội Hình 1</Button>
              <Button onClick={handleImg} name="btu2">Đội Hình 2</Button>
            </div>
          </div>
        </div>
        {/* Các thẻ card khác */}
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-3 mb-3">
            <div className="card" style={{ maxWidth: '18rem' }}>
              <img src={anh1} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">122</h5>
                <p className="card-text">123</p>
                <a href="#" className="btn btn-primary">Add To Cart</a>
                <a href="#" className="btn btn-primary">Detail</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Animation;
