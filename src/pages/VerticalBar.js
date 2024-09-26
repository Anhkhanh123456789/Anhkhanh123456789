import React, { useState, useEffect } from 'react';
import './../assets/css/VerticalBarBar.css';
import { Container } from 'react-bootstrap';



import Button from 'react-bootstrap/Button';

const VerticalBar = () => {
  const [progress, setProgress] = useState(0); // Trạng thái lưu giá trị width
  const [isIncreasing, setIsIncreasing] = useState(true); // Trạng thái điều khiển chiều hướng tăng/giảm

  // Hàm cập nhật progress
  const updateProgress = () => {
    setProgress((prev) => {
      if (isIncreasing) {
        if (prev >= 100) {
          setIsIncreasing(false);
          return 100; // Nếu đạt 100% thì giữ lại 100
        }
        return prev + 1; // Tăng lên dần
      } else {
        if (prev <= 0) {
          setIsIncreasing(true);
          return 0; // Nếu về 0% thì giữ lại 0
        }
        return prev - 1; // Giảm dần
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(updateProgress, 100); // Gọi hàm updateProgress mỗi 10ms
    console.log(isIncreasing);
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [isIncreasing]); // Thay đổi giá trị isIncreasing sẽ khởi động lại interval

  return (
    <Container>
     

      <div className="row">
        <div className="col-3 mb-3">
          <div className="card" style={{ maxWidth: '18rem' }}> 
            <div className="card-body">
            <div className="progress-bar vertical"
                role="progressbar"
                aria-label="Example with label"
                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {progress}%
            </div>
            </div>
          </div>
        </div>
        {/* Các thẻ card khác */}
        {[...Array(20)].map((_, index) => (
          <div key={index} className="col-3 mb-3">
            <div className="card" style={{ maxWidth: '18rem' }}>
              <div className="card-body">
              <div className="progress-bar vertical"
                role="progressbar"
                aria-label="Example with label"
                style={{ width: `${progress}%`, transition: 'width 1s linear' }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {progress}%
            </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default VerticalBar;
