import React, {useEffect, useState} from 'react'
import MasterLayout from '../../Layout/masterLayout/MasterLayout'
import LoadingAnimation from '../../components/LoadingAnimation';
import Chart from 'chart.js/auto';
import Box from '../../components/box/Box';
import Progress from '../../components/progress/Progress';
import { useAnimate, usePresence } from 'framer-motion';
import { Await } from 'react-router-dom';


const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chart, setChart] = useState(null);


   // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  // Function to handle priority change
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating loading data
      setIsLoading(false);
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (!isLoading) {
      updateLineChart();
    }
  }, [isLoading, selectedCategory, priority, startDate, endDate]);


   // Function to update the line chart
  const updateLineChart = async () => {
    const initialData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Resolved',
          data: [1, 10, 12, 9, 12, 11, 10, 9, 10, 9, 12, 9, 0],
          borderColor: 'rgba(0, 88, 109, 1)',
          backgroundColor: 'rgba(0, 88, 109, 0.8)',
          fill: true,
          pointBorderColor: 'transparent',
          pointBorderWidth: 4,
          tension: 0.5
        },
        {
          label: 'Unresolved',
          data: [10, 10, 12, 12, 11, 10, 8, 13, 13, 11, 14, 14, 0],
          borderColor: 'rgba(142, 185, 230, 1)',
          backgroundColor: 'rgba(142, 202, 230, 0.8)',
          fill: true,
          pointBorderColor: 'transparent',
          tension: 0.5
        },
      ],
    };
    // Function to filter the data based on selected options
      const filterData = async () => {
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


       // Function to render the chart
      const renderChart = async () => {
        const filteredData = await filterData();
  
        const chartOptions = {
          responsive: true,
          animation: {
            duration: 2000, // Set the duration of the animation in milliseconds
            easing: 'easeOutQuart' // Set the easing function for the animation
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          scales: {
            x:{
              grid: {
                display: false
              }
            },
            y:{
              min:2,
              max:30,
              ticks:{
                stepSize: 2,
                callback: (value) => value 
              },
              title:{
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
                pointRadius: 0 // disable for all `'line'` datasets
            }
        },
        elements: {
            point: {
                radius: 0 // default to disabled in all datasets
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
      };
  
      renderChart();
    };

   
  return (
    <MasterLayout>
          {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="dashboard flex flex-row  h-full">
            <div className="right-d w-full h-screen pt-9 my-5">
              <Box/>
              <Progress/>
              <div className="graph-rep w-full flex item-center justify-center px-4 ">
                 <canvas id="lineChart"></canvas>
              </div>
            </div>
            <div className="left-d w-96 px-5 py-5  bg-white">
            <div className="filter">
              <div className="f-title pb-3 font-semibold capitalize">Filter</div>
              <div className="category flex flex-col gap-2 pb-4">
                <label htmlFor="category">Category</label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="bord5 py-2 rounded focus:bg-slate-400"
                >
                  <option value="">Select a category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="priority flex flex-col gap-2 pb-4">
                <label htmlFor="priority">Priority</label>
                <select
                  value={priority}
                  onChange={handlePriorityChange}
                  className="bord5 py-2 rounded focus:bg-slate-400"
                >
                  <option value="">Select a Priority</option>
                  <option value="low">Low</option>
                  <option value="middle">Middle</option>
                  <option value="high">High</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="date-filter flex flex-col gap-3 mt-6">
                <label htmlFor="priority">Date Range</label>
                <input
                  className="rounded py-1 px-2 bord5 focus:bg-slate-400"
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className="rounded py-1 px-2 bord5 focus:bg-slate-400"
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="reset mt-5">Reset Filters</div>
            </div>
            </div>
        </div>
      )}
    
    </MasterLayout>
  )
}

export default Dashboard
