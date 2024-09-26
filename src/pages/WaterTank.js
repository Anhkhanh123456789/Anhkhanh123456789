import React, { useState, useEffect } from "react";
import './../assets/css/WaterTank.css';

const WaterTank = () => {
  const [waterLevel, setWaterLevel] = useState(50); // Mực nước bắt đầu từ 50%

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prevLevel => {
        let newLevel = prevLevel + Math.random() * 10 - 5; // Tăng hoặc giảm ngẫu nhiên
        if (newLevel > 100) newLevel = 100;
        if (newLevel < 0) newLevel = 0;
        return newLevel;
      });
    }, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tank">
      <div 
        className="water" 
        style={{ height: `${waterLevel}%` }}
      >
        <div className="water-label">
          {waterLevel.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default WaterTank;
