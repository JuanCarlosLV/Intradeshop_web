import { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Playeras",
    img: "/src/images/categoriasImagenes/categoriaCamisa.png",
  },
  {
    id: 2,
    name: "Pantalones",
    img: "/src/images/categoriasImagenes/categoriaPantalones.png",
  },
  {
    id: 3,
    name: "Abrigos",
    img: "/src/images/categoriasImagenes/categoriaAbrigos.png",
  },
  {
    id: 4,
    name: "Zapatos",
    img: "/src/images/categoriasImagenes/categoriaZapatos.png",
  },
  {
    id: 5,
    name: "Vestidos",
    img: "/src/images/categoriasImagenes/categoriaVestidos.png",
  },
  {
    id: 6,
    name: "Blusas",
    img: "/src/images/categoriasImagenes/categoriaBlusas.png",
  },
  {
    id: 7,
    name: "Accesorios",
    img: "/src/images/categoriasImagenes/categoriaAccesorios.png",
  },
  {
    id: 8,
    name: "Ropa interior",
    img: "/src/images/categoriasImagenes/categoriaRopaInterior.png",
  },
  {
    id: 9,
    name: "Shorts",
    img: "/src/images/categoriasImagenes/categoriaShorts.png",
  },
];
function CarruselCategorias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  function handlePrevClick() {
    setCurrentIndex(currentIndex - 1);
  }

  function handleNextClick() {
    setCurrentIndex(currentIndex + 1);
  }
  return (
    <>
      <div className="">
        <div className="container flex flex-row justify-between mx-auto p-4">
          <button
            className="mb-16 mr-5 rounded-full disabled:text-gray-500 text-[#004643]"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <IoIosArrowDropleftCircle className="text-5xl" />
          </button>
          <div className="carousel flex ml-10 ">
            {categories
              .slice(currentIndex, currentIndex + 5)
              .map((category) => (
                <Link
                  to={`/categoria-products/${category.name}`}
                  
                  key={category.id}
                  className="carousel-item flex flex-col items-center  mr-[50px] font-ralewayFont rounded-3xl transform overflow-hidden  bg-[#F6BE9A]  shadow-2xl duration-100 hover:scale-105 hover:shadow-lg "
                >
                  <div className="mt-2 ">
                    <img
                      src={category.img}
                      className="mr-2 ml-2 w-[200px] h-[200px]"
                    ></img>
                  </div>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                </Link>
              ))}
          </div>

          <button
            className="mb-20 m-5 rounded-full disabled:text-gray-500 text-[#004643]"
            onClick={handleNextClick}
            disabled={currentIndex >= categories.length - 5}
          >
            <IoIosArrowDroprightCircle
              aria-disabled="black"
              className="text-5xl  "
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default CarruselCategorias;
