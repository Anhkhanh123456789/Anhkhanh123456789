import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import '../assets/css/chart.css'; // Đảm bảo đường dẫn này chính xác
import { Utils } from '../pages/Utils'; // Đảm bảo đường dẫn này chính xác
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

const ChartPage = () => {


    setInterval(()=>{
      
   },2000)
  
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  
  const [chartInstance, setChartInstance] = useState(null);
  const [chartInstance2, setChartInstance2] = useState(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance) {
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Utils.months({ count: 12 }),
          datasets: [
            {
              label: 'Dataset 1',
              data: Utils.numbers({ count: 12 }),
              borderColor: Utils.CHART_COLORS.red,
              backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            },
            {
              label: 'Dataset 2',
              data: Utils.numbers({ count: 12 }),
              borderColor: Utils.CHART_COLORS.blue,
              backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Biểu đồ với Thanh Trượt'
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                enabled: true,
                mode: 'x',
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              ticks: {
                maxTicksLimit: 12
              },
              
              afterBuildTicks: function(scale) {
                // Cắt bớt nhãn nếu có nhiều hơn maxTicksLimit
                if (scale.ticks.length > 12) {
                  scale.ticks = scale.ticks.slice(-12);
                }
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setChartInstance(newChart);
      

    }
    
    if (chartRef2.current && !chartInstance2) {
      const ctx2 = chartRef2.current.getContext('2d');
      const newChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: Utils.months({ count: 12 }),
          datasets: [
            {
              label: 'Dataset 1',
              data: Utils.numbers({ count: 12 }),
              borderColor: Utils.CHART_COLORS.red,
              backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
            },
            {
              label: 'Dataset 2',
              data: Utils.numbers({ count: 12 }),
              borderColor: Utils.CHART_COLORS.blue,
              backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue),
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Biểu đồ với Thanh Trượt'
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                enabled: true,
                mode: 'x',
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              ticks: {
                maxTicksLimit: 12
              },
              afterBuildTicks: function(scale) {
                // Cắt bớt nhãn nếu có nhiều hơn maxTicksLimit
                if (scale.ticks.length > 12) {
                  scale.ticks = scale.ticks.slice(-12);
                }
              }
            },  
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setChartInstance2(newChart2);

      
    }
 // Tạo interval để cập nhật cả hai biểu đồ mỗi 2 giây
 const intervalId = setInterval(() => {
  if (chartInstance && chartInstance2) {
    addData(chartInstance); // Thêm dữ liệu vào biểu đồ 1
    addData(chartInstance2); // Thêm dữ liệu vào biểu đồ 2
  }
}, 2000);
    return () => {
      // Dọn dẹp interval khi component bị unmount
      clearInterval(intervalId);
      // Huỷ biểu đồ khi component bị unmount
      chartInstance?.destroy();
      chartInstance2?.destroy();
    };
  }, [chartInstance, chartInstance2]);

  const updateChartData = (chartInstance, updateFn) => {
    if (chartInstance) {
      updateFn(chartInstance);
      chartInstance.update();
    }
  };

  const randomizeData = (chartInstance) => {
    chartInstance.data.datasets.forEach(dataset => {
      dataset.data = Utils.numbers({ count: chartInstance.data.labels.length, min: 0, max: 100 });
    });
  };

  const addDataset = (chartInstance) => {
    const data = chartInstance.data;
    const dsColor = Utils.namedColor(data.datasets.length);
    const newDataset = {
      label: 'Dataset ' + (data.datasets.length + 1),
      backgroundColor: Utils.transparentize(dsColor, 0.5),
      borderColor: dsColor,
      data: Utils.numbers({ count: data.labels.length, min: 0, max: 100 }),
    };
    data.datasets.push(newDataset);
  };

  const addData = (chartInstance) => {
    const data = chartInstance.data;
    const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
  
    // Tạo nhãn mới dựa trên thời gian thực
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const nextMonthIndex = data.labels.length % months.length;
    const nextMonth = months[nextMonthIndex];
    const nextLabel = `${nextMonth} ${hours}:${minutes}:${seconds}`;
  
    data.labels.push(nextLabel);
    data.datasets.forEach(dataset => {
      dataset.data.push(Utils.rand(0, 100));
    });
  
    // Đảm bảo chỉ hiển thị 12 nhãn gần nhất
    if (data.labels.length > 12) {
      const startIndex = data.labels.length - 12;
      const endIndex = data.labels.length - 1;
  
      // Cập nhật giới hạn của trục x
      chartInstance.options.scales.x.min = data.labels[startIndex];
      chartInstance.options.scales.x.max = data.labels[endIndex];
    }
  
    chartInstance.update();
  };
  
  
  const removeDataset = (chartInstance) => {
    chartInstance.data.datasets.pop();
  };

  const removeData = (chartInstance) => {
    const data = chartInstance.data;
    if (data.labels.length > 0) {
      data.labels.pop();
      data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
    }

    // Cập nhật phạm vi hiển thị trục x
    if (data.labels.length > 12) {
      chartInstance.options.scales.x.min = data.labels[data.labels.length - 12];
      chartInstance.options.scales.x.max = data.labels[data.labels.length - 1];
    } else {
      chartInstance.options.scales.x.min = data.labels[0];
      chartInstance.options.scales.x.max = data.labels[data.labels.length - 1];
    }
  
    chartInstance.update();
  };

  return (
    <div className="container">
      <h1>Biểu đồ Trực tiếp với Chart.js</h1>
      
      <div>
        <h2>Biểu đồ Đường</h2>
        <canvas ref={chartRef} id="myChart"></canvas>
        <div className="button-container">
          <button onClick={() => updateChartData(chartInstance, randomizeData)}>Ngẫu nhiên hóa</button>
          <button onClick={() => updateChartData(chartInstance, addDataset)}>Thêm Dataset</button>
          <button onClick={() => updateChartData(chartInstance, addData)}>Thêm Dữ liệu</button>
          <button onClick={() => updateChartData(chartInstance, removeDataset)}>Xóa Dataset</button>
          <button onClick={() => updateChartData(chartInstance, removeData)}>Xóa Dữ liệu</button>
        </div>
      </div>
  
      <div>
        <h2>Biểu đồ Cột</h2>
        <canvas ref={chartRef2} id="myChart2"></canvas>
        <div className="button-container">
          <button onClick={() => updateChartData(chartInstance2, randomizeData)}>Ngẫu nhiên hóa</button>
          <button onClick={() => updateChartData(chartInstance2, addDataset)}>Thêm Dataset</button>
          <button onClick={() => updateChartData(chartInstance2, addData)}>Thêm Dữ liệu</button>
          <button onClick={() => updateChartData(chartInstance2, removeDataset)}>Xóa Dataset</button>
          <button onClick={() => updateChartData(chartInstance2, removeData)}>Xóa Dữ Liệu</button>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
