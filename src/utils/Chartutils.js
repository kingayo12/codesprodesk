// utils.js

export const filterData = (selectedCategory, priority, startDate, endDate, initialData) => {
    let filteredData = { ...initialData };
  
    if (selectedCategory) {
      filteredData.datasets = filteredData.datasets.filter(dataset => dataset.label.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
  
    if (priority) {
      filteredData.datasets = filteredData.datasets.filter(dataset => dataset.label.toLowerCase().includes(priority.toLowerCase()));
    }
  
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
      const startIndex = startDateObj.getMonth();
      const endIndex = endDateObj.getMonth();
      filteredData.labels = initialData.labels.slice(startIndex, endIndex + 1);
      filteredData.datasets.forEach(dataset => {
        dataset.data = dataset.data.slice(startIndex, endIndex + 1);
      });
    }
  
    return filteredData;
  };
  
  export const renderChart = async (filteredData, chart) => {
    const chartOptions = {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          min: 2,
          max: 30,
          ticks: {
            stepSize: 2,
            callback: (value) => value
          },
          title: {
            display: true,
            text: 'No of Tickets'
          },
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Tickets Break down ',
          position: 'top',
        },
      },
      datasets: {
        line: {
          pointRadius: 0
        }
      },
      elements: {
        point: {
          radius: 0
        }
      }
    };
    const ctx = document.getElementById('lineChart').getContext('2d');
    if (chart) {
      chart.data = filteredData;
      chart.update();
    } else {
      setChart(new Chart(ctx, {
        type: 'line',
        data: filteredData,
        options: chartOptions,
      }));
    }
  renderChart();
};
  
 
  