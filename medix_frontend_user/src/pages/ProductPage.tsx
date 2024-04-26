import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Suggestion_Cart from "../components/Suggestion_Cart";
import ContentWrapper from "../components/ContentWrapper";
import productArray from "../assets/Data/MedicineData";
import { singleProductsType } from "../Types/authType";
import { useLocation } from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify';



const ProductPage = () => {

  const location = useLocation();
  const product: singleProductsType = location.state

  const [openDescription, setOpenDescription] = useState(false);
  const [openComposition, setOpenComposition] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);
  const [openCustomInput, setOpenCustomInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imageExpand, setImageExpand] = useState(false);
  const originalPrice = 2000;

  const discount = 20
  const bulkRef = useRef<any>();

  useEffect(() => {
    bulkRef?.current?.focus();
  }, [bulkRef])

  const discountedPerItem = originalPrice - discount / 100 * originalPrice;
  const [isDiscountedPrice, setIsDiscountedPrice] = useState(discountedPerItem);
  const [isReducedOrginalBulkPrice, setIsReducedOriginalBulkPrice] = useState(originalPrice)

  const bulkItemHandler = (buttonValue: number, bulkValue: number) => {

    const totalBlukPrice = bulkValue * originalPrice;
    setSelectedButton(buttonValue)

    if (bulkValue < 100) {

      setIsReducedOriginalBulkPrice(totalBlukPrice)
      const discountedPrice = totalBlukPrice - discount / 100 * totalBlukPrice;
      setIsDiscountedPrice(discountedPrice)

    }
    else if (bulkValue >= 100) {

      const bulkDiscountone = 5;
      const bulkDiscountPrice = totalBlukPrice - bulkDiscountone / 100 * totalBlukPrice;
      setIsReducedOriginalBulkPrice(bulkDiscountPrice);

      const discountedPrice = bulkDiscountPrice - discount / 100 * bulkDiscountPrice;
      setIsDiscountedPrice(discountedPrice)

    }
    else if (bulkValue >= 500) {

      const bulkDiscounttwo = 7;
      const bulkDiscountPrice = totalBlukPrice - bulkDiscounttwo / 100 * totalBlukPrice;
      setIsReducedOriginalBulkPrice(bulkDiscountPrice);

      const discountedPrice = bulkDiscountPrice - discount / 100 * bulkDiscountPrice;
      setIsDiscountedPrice(discountedPrice)

    }
    else {

      const bulkDiscountThree = 8;
      const bulkDiscountPrice = totalBlukPrice - bulkDiscountThree / 100 * totalBlukPrice;
      setIsReducedOriginalBulkPrice(bulkDiscountPrice);

      const discountedPrice = bulkDiscountPrice - discount / 100 * bulkDiscountPrice;
      setIsDiscountedPrice(discountedPrice)

    }
  }
  const bgUrl = product && product?.productImageDetails?.ImageURL;


  return (
    <div className=" my-4 w-full mx-auto flex justify-center items-center flex-col ">

      <div className="md:flex justify-evenly md:w-[80%] mx-3 relative ">
        <section className={`md:mx-6 md:w-[350px] md:h-[400px] w-full max-w-[400px] h-[400px] bg-transparent flex-shrink-0 mb-5 cursor-pointer`}
          onMouseEnter={() => { setImageExpand(true) }}
          onMouseLeave={() => { setImageExpand(false) }}
        >
          {/* <img className="cursor-pointer h-full object-cover object-center relative" src={bgUrl} alt="" /> */}
          <div className="h-full w-full">

          <ReactImageMagnify {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: bgUrl
            },
            largeImage: {
              src: bgUrl,
              width: 1800,
              height: 1200,
            },
            enlargedImageContainerDimensions:{
              width: 700,
              height: 600
            }
          }} />
          </div>
          {/* <img  className={`${!imageExpand ? "hidden": "lg:block hidden"} w-[55%] top-0 right-0 h-[100%] object-cover object-center bg-slate-800 absolute z-10`} src={product?.productImageDetails?.ImageURL}/> */}
        </section>

        <div className="max-w-[800px]">
          <h1 className="flex flex-wrap text-4xl 
                mb-5 font-semibold">{product?.productName}</h1>
          <p>Manufacturer: Arya pharmacitucals pvt ltd</p>
          <hr className=" border-none h-[1px] bg-black/20 my-1" />


          <section className="my-2">
            <h2 className="px-2 py-1 bg-red-600 inline-block rounded-sm
                  text-white my-4">Deal of the Day</h2>
            <div className="flex">
              <h3 className="text-4xl text-red-700 font-light">-{product?.Discount}%</h3>
              <h3 className="text-4xl mx-3 flex items-start">
                <span className="text-sm">Rs</span>
                {isDiscountedPrice ? isDiscountedPrice : 0}
              </h3>
            </div>

            <div className="flex my-4">
              <h3 className="mr-1 text-[18px] text-slate-500">MRP:</h3>
              <div className="relative inline-block ">
                <hr className="border-none h-[1px] w-full
                     bg-slate-500 absolute top-[50%] " />
                <h3 className=" text-slate-500 text-[18px] ">
                  {isReducedOrginalBulkPrice ? isReducedOrginalBulkPrice : 0}
                </h3>
              </div>
            </div>
          </section>

          <section className="flex justify-between max-w-[40%] my-2">

            <button className={` mx-2 px-3 text-md text-red-600 
                font-semibold py-1 border-[3px] border-red-600 rounded-md 
                  ${selectedButton === 1 ? "bg-red-600 text-white " : ""}`}

              onClick={() => {
                const bulkValue = 1;
                const buttonValue = 1;

                bulkItemHandler(buttonValue, bulkValue)
                setOpenCustomInput(false);
              }}
            >1</button>

            <button className={`mx-2 px-3 text-md text-red-600 font-semibold py-1
                 border-[3px] border-red-600 rounded-md
                  ${selectedButton === 2 ? "bg-red-600 text-white " : ""}`}

              onClick={() => {
                const bulkValue = 100;
                const buttonValue = 2
                bulkItemHandler(buttonValue, bulkValue);
                setOpenCustomInput(false);
              }}
            >100</button>

            <button className={`mx-2 px-3 text-md text-red-600 font-semibold py-1
             border-[3px] border-red-600 rounded-md
            ${selectedButton === 3 ? "bg-red-600 text-white " : ""}`}
              onClick={() => {
                const bulkValue = 500;
                const buttonValue = 3;
                bulkItemHandler(buttonValue, bulkValue)
                setOpenCustomInput(false);
              }}
            >500</button>

            <button className={`mx-2 px-3 text-md text-red-600 
            font-semibold py-1 border-[3px] border-red-600 rounded-md
            ${selectedButton === 4 ? "bg-red-600 text-white " : ""}
            transition duration-300 ease-in-out
            `}
              onClick={() => {
                const buttonValue = 4

                if (!openCustomInput) {
                  setSelectedButton(buttonValue)
                  setInputValue("")

                } else {
                  bulkItemHandler(1, 1)
                  setSelectedButton(1);
                }
                setOpenCustomInput(!openCustomInput)
              }}
            >custom</button>
          </section>
          <section className={`my-4 flex items-center transition-all duration-700 
           ease-in-out max-h-0 ${openCustomInput ? "max-h-[200px]" : "max-h-0"}
          `}>

            <div className={` ${openCustomInput ? "block" : "hidden"}`}>
              <input
                ref={bulkRef}
                className=" focus:outline-none
             focus:shadow-[0px_0px_2px_3px_rgba(0,100,247,0.4)]
              focus:border-blue-400
              border-slate-300
               border-2 text-xl px-2 py-1
                rounded-md mr-4"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                }}
              />
              <button className="px-4 py-[7px] rounded-md bg-blue-600 text-white font-semibold"
                onClick={() => {

                  const bulkValue = parseInt(inputValue);
                  const buttonValue = 4
                  bulkItemHandler(buttonValue, bulkValue)
                }}

              >Convert</button>
            </div>

          </section>

          <hr />

          {/* description section  */}
          <section>

            <div className=" md:my-2">
              <div className="flex items-center my-1 cursor-pointer w-fit
               hover:bg-slate-200/50 px-2 py-1 rounded-md transition 
               duration-200 ease-in-out"
                onClick={() => {
                  setOpenDescription(!openDescription)
                }}
              >
                <h3 className="font-semibold text-xl">Description </h3>
                <span className="mx-5">
                  {openDescription ?
                    <FaChevronUp />
                    :
                    <FaChevronDown />
                  }
                </span>
              </div>
              <p className={`text-[15px] flex-wrap leading-5 
              overflow-hidden transition-all duration-300
              max-h-0 ${openDescription ? "max-h-[800px]" : "max-h-0"} 
              `}>{product?.Description}</p>
            </div>

            <hr />
            <div className=" md:my-2">
              <div className="flex items-center my-1 cursor-pointer w-fit
               hover:bg-slate-200/50 px-2 py-1 rounded-md
            transition duration-300 ease-in-out"

                onClick={() => {
                  setOpenComposition(!openComposition)
                }}
              >
                <h3 className="font-semibold text-xl">Composition </h3>
                <span className="mx-5">
                  {openComposition ?
                    <FaChevronUp />
                    :
                    <FaChevronDown />
                  }
                </span>
              </div>
              <p className={`text-[15px] flex-wrap leading-5 
            overflow-hidden transition-all duration-300 max-h-0
            ${openComposition ? "max-h-[800px]" : "max-h-0"} `}>
                {product?.Composition}
              </p>
            </div>

          </section>
          <hr />

          {/* //Button section */}

          <section className="mt-10 flex
           justify-between min-w-[200px]
            max-w-[300px]">
            <button className=" border-2
             hover:bg-slate-200/70 px-3
              py-2 bg-slate-100 rounded-sm
               text-xl font-semibold transition 
               duration-300 ease-in-out text-slate-500">Buy Now</button>
            <button className=" border-2
             hover:bg-green-500/70 px-3
              py-2 bg-green-500 rounded-sm 
              text-xl text-white font-semibold
                transition duration-300
                 ease-in-out">Add to Cart</button>
          </section>


        </div>
      </div>
      <ContentWrapper>
        <Suggestion_Cart productArray={productArray} />
      </ContentWrapper>

    </div>
  )
}

export default ProductPage