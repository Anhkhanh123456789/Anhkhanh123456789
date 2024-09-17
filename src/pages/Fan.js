import { Button } from 'react-bootstrap';
import fan_img from '../assets/images/fan.png';
import { useState, useEffect } from 'react';
import '../assets/css/chart.css'; // Đảm bảo đường dẫn này chính xác

const Fan = () => {
    const [deg, setDeg] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setDeg(prevDeg => (prevDeg + speed) % 360); // Giữ góc quay trong khoảng từ 0 đến 359 độ
            }, 10);
        }
        return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount hoặc isRunning thay đổi
    }, [isRunning, speed]);

    const startFan = () => {
        setIsRunning(true); // Kích hoạt trạng thái chạy
        setSpeed(5); // Đặt tốc độ quạt mặc định
    };

    const changeSpeed = (newSpeed) => {
        if (isRunning) {
            setSpeed(newSpeed); // Thay đổi tốc độ quạt
        }
    };

    const stopFan = () => {
        setIsRunning(false); // Dừng quạt
        setSpeed(0); // Đặt tốc độ về 0 khi dừng
    };

    return (
        <>
            <h1>Quạt</h1>
            <div>
                <img style={{ transform: `rotate(${deg}deg)` }} src={fan_img} width={400} alt="Fan" />
            </div>
            <button className='btuStart' onClick={startFan} variant='primary' type='button'>Start</button>
            <button className='btuStop' onClick={stopFan} variant='danger' type='button'>Stop</button>
            <button className='btu1' onClick={() => changeSpeed(10)} variant='danger' type='button'>Tốc độ 1</button>
            <button className='btu2' onClick={() => changeSpeed(100)} variant='danger' type='button'>Tốc độ 2</button>
            <button className='btu3' onClick={() => changeSpeed(200)} variant='danger' type='button'>Tốc độ 3</button>
        </>
    );
};

export default Fan;
