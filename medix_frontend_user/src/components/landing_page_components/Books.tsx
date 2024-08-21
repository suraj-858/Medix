
import Book1 from "../../assets/Images/books/book1.png";
import Book2 from "../../assets/Images/books/book2.png";
import Sofa from "../../assets/Images/books/sofa.png";
import Bed from "../../assets/Images/books/bed.png";
import galaicha from '../../assets/Images/books/galaicha.png'

import { FaStar } from "react-icons/fa6";

const booksData = [
  {
    id: 1,
    img: Sofa,
    title: "Red Sofa",
    rating: 5.0,
    author: "sold over 400+ units",
  },
  {
    id: 2,
    img: Book2,
    title: "Premium quality chair",
    rating: 4.5,
    author: "Newly lunched products",
  },
  {
    id: 3,
    img: Bed,
    title: "Bed",
    rating: 4.7,
    author: "Double size queen size bed",
  },
  {
    id: 4,
    img: Book1,
    title: "Bar chair",
    rating: 4.4,
    author: "Top of the line chair",
  },
  {
    id: 5,
    img: galaicha,
    title: "Galaicha",
    rating: 4.5,
    author: "Turkish Galaicha",
  },
];

const Books = () => {
  return (
      <div className="mt-14 mb-12">
        <div className="container mx-auto">
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Top Furnishing Items for you
            </p>
            <h1 className="text-3xl font-bold">Top Furnishing Categories</h1>
            <p className="text-xs text-gray-400">
              Here at Gaurisankhar sofa & home decors we deliver top class products with premium services and warranty.
            </p>
          </div>

          {/* Body section */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {/* Card */}
              {booksData.map(({ id, img, title, rating, author }) => (
                <div key={id} className="div space-y-3">
                  <img
                    src={img}
                    alt=""
                    className="h-[220px] w-[200px] object-center object-contain rounded-md "
                  />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-700">{author}</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>{rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="text-center mt-10 cursor-pointer  bg-primary text-white py-1 px-5 rounded-md">
                View All Books
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Books;
