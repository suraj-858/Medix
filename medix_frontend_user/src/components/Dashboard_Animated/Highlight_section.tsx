import AnimatedCircle from "./Animated_Circle/AnimatedCircle"
import BarChart from "./BarChart"
import PieChart from "./PieChart"

const Highlight_section = () => {
  return (
    <div className=" grid lg:grid-cols-7 md:grid-cols-2 grid-cols-1 gap-2 px-2">
      <div className="  col-span-3 rounded-lg border-2 flex items-center justify-center object-center ">
        <BarChart/>
      </div>
      <div className=" col-span-2 h-[350px] rounded-lg border-2 flex flex-col  items-center justify-evenly  ">
        <h1 className="text-xl font-semibold pt-2">Product Category</h1>
        <div className=" flex justify-evenly w-full font-semibold py-2">
          <h1>Total Products:</h1>
          <h1>504</h1>

        </div>
        <PieChart/>
      </div>


      <div className=" col-span-2 h-[350px] border-2 flex justify-between items-center rounded-lg">
        <section className=" w-full">
          <span className="flex justify-evenly lg:text-xl text-xl font-semibold lg:mb-10 ">
            <h1>Products:</h1>
            <h1>219</h1>
          </span>

          <div className="flex flex-wrap  justify-evenly">
            <span className="flex flex-col items-center my-4">

            </span>
            <span className="flex flex-col items-center my-4">
              <AnimatedCircle/>
            </span>
          </div>

          
        </section>
      </div>
    </div>
  )
}

export default Highlight_section