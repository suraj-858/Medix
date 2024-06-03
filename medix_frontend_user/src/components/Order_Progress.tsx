import { FaCheckCircle } from "react-icons/fa"

interface progressValueProps {
    progressValue: number
}
const Order_Progress = ({ progressValue }: progressValueProps) => {

    return (
        <div className=" relative flex w-[80%] items-center mx-auto justify-between my-5">
            <FaCheckCircle size={30} className={`text-orange-600 bg-white rounded-[40px]`} />
            <FaCheckCircle size={30} className={`${progressValue >= 33 ? " text-orange-600" : "text-gray-400"} bg-white rounded-[40px]`} />
            <FaCheckCircle size={30} className={`${progressValue >= 66 ? " text-orange-600" : "text-gray-400"} bg-white rounded-[40px]`} />
            <FaCheckCircle size={30} className={`${progressValue >= 99 ? " text-orange-600" : "text-gray-400"} bg-white rounded-[40px]`} />
            <div className={`bg-gradient-to-r from-orange-600 to-gray-500 h-4 w-full absolute z-[-1] rounded-lg`} style={{ background: `linear-gradient(to right, rgb(234, 88, 12) 0%, rgb(234, 88, 12)${progressValue}%, rgb(156, 163, 175) ${progressValue}%, rgb(156, 163, 175) 100%)` }}></div>
        </div>
    )
}

export default Order_Progress