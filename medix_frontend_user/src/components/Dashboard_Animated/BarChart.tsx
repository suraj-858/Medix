import { Chart as ChartJS, BarElement, LinearScale, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";


const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept","Oct","Nov","Dec"],
    datasets: [{
    data: [30, 40, 50 ,6, 20, 70],
    backgroundColor:[ 'red', 'green', 'blue', 'cyan', 'orange'],
    borderColor: 'green',
    // borderWidth: 1
    },
]
  };

  ChartJS.register(BarElement, CategoryScale, LinearScale);

  return (
    <div className=" md:block hidden min-h-[300px] min-w-[400px] w-full h-full text-center object-center p-2">
      <h1 className=" font-semibold text-xl my-2">Revenue of Year 2024</h1>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
