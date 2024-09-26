export const Utils = {
    CHART_COLORS: {
      red: 'rgb(255, 99, 132)',
      blue: 'rgb(54, 162, 235)',
      green: 'rgb(75, 192, 192)',
      yellow: 'rgb(255, 205, 86)',
      orange: 'rgb(255, 159, 64)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    },
    transparentize(color, opacity = 0.5) {
      const alpha = opacity;
      return `rgba(${color.slice(4, -1)}, ${alpha})`;
    },
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    numbers({ count = 10, min = 0, max = 100 }) {
      return Array.from({ length: count }, () => this.rand(min, max));
    },
    months({ count = 12 }) {
      const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
      return months.slice(0, count);
    },
    namedColor(index) {
      const colors = Object.values(this.CHART_COLORS);
      return colors[index % colors.length];
    }
  };
  

  