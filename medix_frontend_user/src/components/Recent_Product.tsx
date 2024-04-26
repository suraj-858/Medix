import Image1 from '../assets/Images/medix_img_01.jpg';
import Image2 from '../assets/Images/medix_img_02.jpg';

const Recent_Product = () => {
    const recentProduct = [{
        productImage:Image1, 
        createdDate:"12-20-2023",
        ProductName:"Moov",
        Price:"560 per piece"
    }, 
    {
        productImage:Image2, 
        createdDate:"12-20-2023",
        ProductName:"Moov",
        Price:"560 per piece"
    },
    {
        productImage:Image1, 
        createdDate:"12-20-2023",
        ProductName:"Moov",
        Price:"560 per piece"
    },
    {
        productImage:Image1, 
        createdDate:"12-20-2023",
        ProductName:"Moov",
        Price:"560 per piece"
    },
    {
        productImage:Image2, 
        createdDate:"12-20-2023",
        ProductName:"Moov",
        Price:"560 per piece"
    }
]
  return (
    <div className="w-full h-full relative">

        <div className='sticky top-0 bg-[#faf8fa] pt-4 flex justify-between flex-col'>
        <h1 className="lg:text-2xl md:text-xl text-base text-center font-semibold ">Recently Added</h1>
        <hr className=' border-none h-[1px] bg-slate-400 mt-3' />
        </div>
        
        <section className='md:grid md:grid-cols-2 flex flex-wrap justify-evenly '>
            
            {recentProduct.map((product, Index) =>{
                return <div key={Index} className='m-4 bg-white grid-cols-1 max-w-[240px]'>
                    <img src={product.productImage} className='w-full max-h-[300px] object-cover object-center -z-0' alt="" />
                    <h1 className=' font-semibold m-2'>{product.ProductName}</h1>
                    <h2 className='text-sm lg:text-md text-slate-700 m-2'>{product.Price}</h2>
                    <p className='text-sm lg:text-md text-slate-500 m-2'> <b>Created At: </b>{product.createdDate}</p>
                </div>
            })}

        </section>
    </div>
  )
}

export default Recent_Product