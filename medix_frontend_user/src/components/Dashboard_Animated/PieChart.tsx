import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = () => {

    const data = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
            label: "Category of",
        data: [30, 40, 50],
        backgroundColor:[ 'red', 'green', 'blue'],
        // borderWidth: 1
        },
        
    ]
      };
      const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'bottom', // Place legend at the bottom
            },
          },
      }

    
      ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);
    
  return (
    <div className="w-[240px] h-[240px] my-4 ">
        <Pie data={data} options={options} />
    </div>
  )
}

export default PieChart