
const Order_Table = () => {
    const data = [{ order_Id: "34fdf342d", product_Name: "paracetamol", Quantity: "40", TotalPrice: "3422", State: "In Process" }
        , { order_Id: "432rewf3", product_Name: "Flexon", Quantity: "20", TotalPrice: "4422", State: "Canceled" }, {
             order_Id: "3232rew32", product_Name: "D-cold", Quantity: "400", TotalPrice: "333221", State: "Delivered" }, 
             {order_Id: "7568y667", product_Name: "Laprozol", Quantity:"340", TotalPrice: "23425", State:"Delivered"}, 
             { order_Id: "34fdf342d", product_Name: "paracetamol", Quantity: "40", TotalPrice: "3422", State: "In Process" }
             , { order_Id: "432rewf3", product_Name: "Flexon", Quantity: "20", TotalPrice: "4422", State: "Canceled" }, {
                  order_Id: "3232rew32", product_Name: "D-cold", Quantity: "400", TotalPrice: "333221", State: "Delivered" }, 
                  {order_Id: "7568y667", product_Name: "Laprozol", Quantity:"340", TotalPrice: "23425", State:"Delivered"}, 
                  { order_Id: "34fdf342d", product_Name: "paracetamol", Quantity: "40", TotalPrice: "3422", State: "In Process" }
                  , { order_Id: "432rewf3", product_Name: "Flexon", Quantity: "20", TotalPrice: "4422", State: "Canceled" }, {
                       order_Id: "3232rew32", product_Name: "D-cold", Quantity: "400", TotalPrice: "333221", State: "Delivered" }, 
                       {order_Id: "7568y667", product_Name: "Laprozol", Quantity:"340", TotalPrice: "23425", State:"Delivered"}]
    return (
        <div className="w-[100%] lg:flex my-10 px-2 justify-center items-center gap-4">
            <section className="lg:w-[70%] w-[100%]">
            <table className=" w-[100%] ">
                <th className=" py-2 border-[3px] border-blue-500 bg-blue-500 text-white">SN</th>
                <th className="border-[3px] py-2 border-blue-500 bg-blue-500 text-white">order_Id</th>
                <th className="border-[3px] py-2 border-blue-500 bg-blue-500 text-white">Product Name</th>
                <th className="border-[3px] py-2 border-blue-500 bg-blue-500 text-white">Price</th>
                <th className="border-[3px] py-2 border-blue-500 bg-blue-500 text-white">Quantity</th>
                <th className="border-[3px] py-2 border-blue-500 bg-blue-500 text-white">Total Price</th>
                <th className="border-[3px] py-2 border-blue-500 bg-blue-500 text-white">State</th>
                {data.map((order, Index) =>{
                    return(
                        <tr key={Index} className="text-center border-[3px] py-2 cursor-pointer hover:bg-slate-200 hover:transition duration-150 ease-in-out">
                        <td className="border-[3px] py-2">{Index+1}</td>
                        <td className="border-[3px] py-2">{order.order_Id}</td>
                        <td  className="border-[3px] py-2">{order.product_Name}</td>
                        <td className="border-[3px] py-2">{order.TotalPrice}</td>
                        <td  className="border-[3px] py-2">{order.Quantity}</td>
                        <td  className="border-[3px] py-2">{order.TotalPrice}</td>
                        <td  className={`border-[3px] py-2 ${order.State === "Canceled" ? "text-red-500": order.State === "Delivered" ? " text-green-500" : " text-blue-500"}`}>{order.State}</td>
                    </tr>
                    )
                })}
                
            </table>

            <div className="flex justify-between w-full  my-4">
                <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400">&larr; next</button>
                <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400">prev &rarr;</button>
            </div>

            </section>

           

            {/* <section className="lg:w-[26%] my-4 py-4 border-2 text-center flex flex-col items-center rounded-md">
               <h1 className=" text-2xl font-semibold py-4 ">Best Seller</h1>
               <div className=" flex justify-between px-4 my-2  text-xl font-semibold rounded-md py-4 lg:w-[80%] w-[50%] shadow-[2px_5px_10px_2px_rgba(0,0,0,0.3)]">
                <h1>Paracetamol:</h1>
                <h1>450</h1>
               </div>

               <div className=" flex justify-between px-4 my-2 text-xl font-semibold rounded-md py-4 lg:w-[80%] w-[50%] shadow-[2px_5px_10px_2px_rgba(0,0,0,0.3)]">
                <h1>Paracetamol:</h1>
                <h1>450</h1>
               </div>

               <div className=" flex justify-between px-4 my-2 text-xl font-semibold rounded-md py-4 lg:w-[80%]  w-[50%] shadow-[2px_5px_10px_2px_rgba(0,0,0,0.3)]">
                <h1>Paracetamol:</h1>
                <h1>450</h1>
               </div>
               
            </section> */}
        </div>
    )
}

export default Order_Table