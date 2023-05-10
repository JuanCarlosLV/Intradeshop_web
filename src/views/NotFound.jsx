import {VscArrowLeft  } from "react-icons/vsc";


function NotFound() {
  return (
    <>
      <div class="bg-[#F6BE9A] w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-[#004643]">
            404
          </p>
          <p class="text-2xl md:text-3xl lg:text-5xl font-bold font-ralewayFont tracking-wider text-black mt-4">
            PAGINA NO ENCONTRADA
          </p>
          <p class="text-gray-500 mt-4 pb-4 border-b-2 text-center font-ralewayFont">
            Lo sentimos pero la página que estabas buscando no existe :/
          </p>
          <a
            href="/"
            className="flex items-center space-x-2 bg-[#D1AC00] hover:bg-[#d1ab0098] hover:text-white text-[#004643] px-4 py-2 mt-6 rounded text-xl font-ralewayFont"
            title="Return Home"
          >
            <VscArrowLeft className="text-3xl"/>
            
            <span>Regresar al Home</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default NotFound;
