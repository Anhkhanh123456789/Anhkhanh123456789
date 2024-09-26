import React, { useState, useEffect } from "react";
import './../assets/css/ScadaView.css';
import motorImage from '../assets/images/fan.png';
import tankImage from '../assets/images/tank.jpg';

const ScadaView = () => {
  const [tankLevel, setTankLevel] = useState(0); // Mực nước ban đầu trong bể
  const [isIncreasing, setIsIncreasing] = useState(true); // Trạng thái tăng/giảm
  const [bigTankLevel, setBigTankLevel] = useState(88);
  const [smallTankLevel, setSmallTankLevel] = useState(65);
  const [flowRate, setFlowRate] = useState(81); // Lưu lượng nước
  const [motor1Running, setMotorRunning] = useState(false); // Trạng thái động cơ
  const [deg1, setDeg] = useState(0); // Góc quay của động cơ
  const [speed1, setSpeed] = useState(0);
  const [buttonColor, setButtonColor] = useState('lightblue'); // Màu nút
  const [motor2Running, setMotor2Running] = useState(false); // Trạng thái động cơ
  const [deg2, setDeg2] = useState(0); // Góc quay của động cơ
  const [speed2, setSpeed2] = useState(0);
  useEffect(()=>{
    console.log(speed1);
    let motor1IntervalId;
    if (motor1Running) {
      motor1IntervalId = setInterval(() => {
        setDeg(prevDeg => (prevDeg + speed1) % 360); // Quay motor với tốc độ hiện tại
      }, 100); // Cập nhật mỗi 10ms
    }
    return () => {
      clearInterval(motor1IntervalId); }
  },[motor1Running,speed1])
  useEffect(() => {
    let motor2IntervalId
    // Kiểm tra nếu motor đang chạy thì bắt đầu quay
    if(motor2Running){
      motor2IntervalId= setInterval(()=>{
        setDeg2(prevDeg =>(prevDeg + speed2)%360);
      },100)
    }
    // Cleanup khi motor dừng hoặc component unmount
    return () => {    
      clearInterval(motor2IntervalId);// Dừng quay motor khi motorRunning là false
    };
  }, [motor2Running,speed2]);

  useEffect(() => {
    console.log(motor1Running);
    const interval = setInterval(() => {
      // Cập nhật mức nước cho tankLevel
      setTankLevel(prev => {
        if (isIncreasing) {
          if (prev >= 100) {
            setIsIncreasing(false); // Đổi trạng thái sang giảm
            return prev; // Giữ nguyên ở 100
          }
          return Math.min(prev + 1, 100); // Tăng từ 0 đến 100
        } else {
          if (prev <= 0) {
            setIsIncreasing(true); // Đổi trạng thái sang tăng
            return prev; // Giữ nguyên ở 0
          }
          return Math.max(prev - 1, 0); // Giảm từ 100 về 0
        }
      });

      // Cập nhật các giá trị khác
      setBigTankLevel(prev => Math.min(Math.max(prev + (Math.random() * 2 - 1), 0), 100));
      setSmallTankLevel(prev => Math.min(Math.max(prev + (Math.random() * 2 - 1), 0), 100));
      setFlowRate(prev => Math.min(Math.max(prev + (Math.random() * 4 - 2), 0), 100));
    }, 100); // Tăng/giảm nhanh hơn
    
    return () => clearInterval(interval);
  }, [isIncreasing]);

  // Hàm reset hệ thống cho từng bể
  const resetTankLevel = (tankType) => {
    if (tankType === 'tankLevel') {
      setTankLevel(0);
    } else if (tankType === 'bigTank') {
      setBigTankLevel(50);
    } else if (tankType === 'smallTank') {
      setSmallTankLevel(50);
    }
  };
  const StartStopMotor = (motortype,isBoolllll)=>{
    if(motortype=="motor1"){
      setMotorRunning(isBoolllll);
      if(!isBoolllll){
        setSpeed(0);
        console.log("dung motor 1")
      }
    else{
      setSpeed(10);
    }
    }
    else if(motortype=="motor2"){
      setMotor2Running(isBoolllll);
      if(!isBoolllll){
        setSpeed2(0);

      }
      else{
        setSpeed2(10);
    }
    }
  }
  
  const handMotor = (event,motortype) =>{
    const buttonPosition = {
      x: event.screenX, // Vị trí x của nút trên màn hình
      y: event.screenY  // Vị trí y của nút trên màn hình
    };
    const newWindow = window.open(
      "123",
      `Bật tắt motor ${motortype}`,
      `width=300,height=200,left=${buttonPosition.x},top=${buttonPosition.y}`
    );
    newWindow.document.write(`
      <html>
        <head>
          <title>Điều khiển Motor</title>
        </head>
        <body style="text-align: center; padding: 20px;">
          <h4>Xác nhận</h4>
          <p>Bảng điều khiển motor?</p>
          <button id="start" style="margin-right: 10px;">Start</button>
          <button id="stop">Stop</button>
          <script>
            document.getElementById('start').onclick = function() {
              window.opener.StartStopMotor('${motortype}',true); 
              
            };
            document.getElementById('stop').onclick = function() {
              window.opener.StartStopMotor('${motortype}',false); 
            };
          </script>
        </body>
      </html>

      `);
  } 
  window.StartStopMotor = StartStopMotor;
  // Hàm xử lý reset thông qua popup xác nhận
  const handleReset = (event, tankType) => {
    const buttonPosition = {
      x: event.screenX, // Vị trí x của nút trên màn hình
      y: event.screenY  // Vị trí y của nút trên màn hình
    };

    const newWindow = window.open(
      "123",
      "Xác nhận Reset",
      `width=300,height=200,left=${buttonPosition.x},top=${buttonPosition.y}`
    );

    // Nội dung của popup
    newWindow.document.write(`
      <html>
        <head>
          <title>Xác nhận Reset</title>
        </head>
        <body style="text-align: center; padding: 20px;">
          <h4>Xác nhận</h4>
          <p>Bạn có chắc chắn muốn reset không?</p>
          <button id="confirm" style="margin-right: 10px;">Có</button>
          <button id="cancel">Không</button>
          <script>
            document.getElementById('confirm').onclick = function() {
              window.opener.resetTankLevel('${tankType}'); // Gọi hàm reset chung
              window.close();
            };
            document.getElementById('cancel').onclick = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `);
  };

  // Đảm bảo hàm resetTankLevel có sẵn trong window để cửa sổ popup có thể gọi
  window.resetTankLevel = resetTankLevel;
 
  return (
    <div className="scada-container">
      <svg width="100%" height="800">
        {/* Bể chứa nước trên tháp */}
        <g>
          <image href={tankImage} x="150" y="80" width="250" height="200" />
          {/* Nước bên trong bể, thay đổi chiều cao dựa vào tankLevel */}
          <rect 
            x="230" // Căn giữa với hình bể
            y={245 - (tankLevel / 100) * 115} // Điều chỉnh y để nước dâng lên từ đáy bể
            width="90" // Chiều rộng của mức nước, căn chỉnh để vừa với bể
            height={(tankLevel / 100) * 115} // Chiều cao nước thay đổi từ 0 đến 115
            fill="blue"
            opacity="0.6" // Đặt opacity để nước trong suốt
          />
          <text x="220" y="60" fontSize="16" fontFamily="Arial">Tank Level: {tankLevel.toFixed(1)}%</text>

          {/* Nút bấm reset cho tankLevel */}
          <rect 
            x="190" 
            y="70" 
            width="120" 
            height="30" 
            fill={buttonColor} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handleReset(event, 'tankLevel')} }
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
            rx="10" // Góc bo tròn
            ry="10" // Góc bo tròn
            style={{ cursor: 'pointer' }} 
          />
          <text 
            x="250" 
            y="90" 
            fontSize="14" 
            fontFamily="Arial" 
            textAnchor="middle" 
            fill="black" 
            style={{ cursor: 'pointer' }} 
            onClick={(event) =>{
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
               handleReset(event, 'tankLevel')}}
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
          >
            Reset tankLevel
          </text>
        </g>

        {/* Đường ống dẫn nước */}
        <line x1="275" y1="250" x2="275" y2="400" stroke="green" strokeWidth="8" />
        <line x1="271" y1="400" x2="720" y2="400" stroke="green" strokeWidth="8" />
        <line x1="100" y1="400" x2="275" y2="400" stroke="green" strokeWidth="8" />
        <line x1="673" y1="500" x2="673" y2="550" stroke="green" strokeWidth="8" />
        <line x1="669" y1="550" x2="1100" y2="550" stroke="green" strokeWidth="8" />

        {/* Động cơ và lưu lượng */}
        <g>
          {/* <image href={motorImage} x="420" y="360" width="80" height="80" /> */}
         < image 
            href={motorImage} 
            x="420" 
            y="360" 
            width="80" 
            height="80" 
            transform={`rotate(${deg1}, 460, 400)`} // Góc quay + tâm xoay
          />
          <text x="420" y="345" fontSize="12" fontFamily="Arial">Motor 1</text>
          <text x="420" y="365" fontSize="12" fontFamily="Arial">Flow: {flowRate.toFixed(1)} l/s</text>

            {/* */}
            <rect 
            x="420" 
            y="440" 
            width="80" 
            height="30" 
            fill={buttonColor} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handMotor(event, "motor1")}}
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
            rx="10" // Góc bo tròn
            ry="10" // Góc bo tròn
            stroke="black"
            style={{ cursor: 'pointer' }} 
          />
          <text 
            x="460" 
            y="460" 
            fontSize="14" 
            fontFamily="Arial" 
            textAnchor="middle" 
            fill="black" 
            name="motor1"
            style={{ cursor: 'pointer' }} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handMotor(event, "motor1")}}
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
          >
            Motor 1
          </text>
        </g>
        <g>
        < image 
            href={motorImage} 
            x="870" 
            y="510" 
            width="80" 
            height="80" 
            transform={`rotate(${deg2}, 910, 550)`} // Góc quay + tâm xoay
          />
            <text x="870" y="485" fontSize="12" fontFamily="Arial">Motor 2</text>
            <text x="870" y="500" fontSize="12" fontFamily="Arial">Flow: {flowRate.toFixed(1)} l/s</text>
             {/* */}
             <rect 
            x="870" 
            y="590" 
            width="80" 
            height="30" 
            fill={buttonColor} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handMotor(event, "motor2")}}
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
            rx="10" // Góc bo tròn
            ry="10" // Góc bo tròn
            stroke="black"
            style={{ cursor: 'pointer' }} 
          />
          <text 
            x="910" 
            y="610" 
            fontSize="14" 
            fontFamily="Arial" 
            textAnchor="middle" 
            fill="black" 
            name="motor1"
            style={{ cursor: 'pointer' }} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handMotor(event, "motor2")}}
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
          >
            Motor 2
          </text>
        </g>


        {/* Bể chứa lớn */}
        <g>
          <rect x="600" y="350" width="150" height="150" fill="#e0e0e0" stroke="black" />
          <rect
            x="600"
            y={500 - (bigTankLevel / 100) * 150}
            width="150"
            height={(bigTankLevel / 100) * 150}
            fill="blue"
          />
          <text x="620" y="300" fontSize="16" fontFamily="Arial">Big Tank: {bigTankLevel.toFixed(1)}%</text>
          {/* Nút bấm reset cho bigTankLevel */}
          <rect 
            x="610" 
            y="310" 
            width="140" 
            height="30" 
            fill={buttonColor} 
            onClick={(event) =>{ 
              event.stopPropagation(); 
              handleReset(event, 'bigTank')} }
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
            rx="10" // Góc bo tròn
            ry="10" // Góc bo tròn
            style={{ cursor: 'pointer' }} 
          />
          <text 
            x="680" 
            y="330" 
            fontSize="14" 
            fontFamily="Arial" 
            textAnchor="middle" 
            fill="black" 
            style={{ cursor: 'pointer' }} 
            onClick={(event) =>{
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
               handleReset(event, 'bigTank')}}
               onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
               onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
          >
            Reset bigTankLevel
          </text>
        </g>

        {/* Bể chứa nhỏ */}
        <g>
          <rect x="100" y="350" width="100" height="150" fill="#e0e0e0" stroke="black" />
          <rect
            x="100"
            y={500 - (smallTankLevel / 100) * 150}
            width="100"
            height={(smallTankLevel / 100) * 150}
            fill="blue"
          />
          <text x="90" y="305" fontSize="16" fontFamily="Arial">Small Tank: {smallTankLevel.toFixed(1)}%</text>
          {/* Nút bấm reset cho smallTankLevel */}
          <rect 
            x="70" 
            y="310" 
            width="160" 
            height="30" 
            fill={buttonColor} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handleReset(event, 'smallTank')}} 
            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra
            rx="10" // Góc bo tròn
            ry="10" // Góc bo tròn
            style={{ cursor: 'pointer' }} 
          />
          <text 
            x="150" 
            y="330" 
            fontSize="14" 
            fontFamily="Arial" 
            textAnchor="middle" 
            fill="black" 
            style={{ cursor: 'pointer' }} 
            onClick={(event) => {
              event.stopPropagation(); // Ngăn sự kiện lan truyền đến phần tử cha
              handleReset(event, 'smallTank')}}

            onMouseEnter={() => setButtonColor('skyblue')} // Khi di chuột vào
            onMouseLeave={() => setButtonColor('lightblue')} // Khi di chuột ra  
          >
            Reset smallTankLevel
          </text>
        </g>
        <g>
         {/* Vẽ bể nước không có nắp trên */}
  <path 
    d="M1100 530 L1100 730 L1350 730 L1350 530" 
    fill="none" 
    stroke="black" 
    strokeWidth="2"
  />

  {/* Mực nước bên trong bể */}
  <rect
    x="1100"
    y={730 - (bigTankLevel / 100) * 150}
    width="250"
    height={(bigTankLevel / 100) * 150}
    fill="blue"
  />

  {/* Nhãn bể nước */}
  <text x="1150" y="480" fontSize="16" fontFamily="Arial">Water tank : {bigTankLevel.toFixed(1)}%</text>
        </g>
      </svg>
    </div>
  );
};

export default ScadaView;
