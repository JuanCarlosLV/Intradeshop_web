import { NavLink } from "react-router-dom";

function CardProfile() {
  return (
    <>
      <div className="mt-5 ml-72 mr-10 text-center ml-2/6 bg-[#004643] rounded-lg h-28 flex ">
        <div className="  ml-12 mr-20 mb-2 mt-2 h-auto w-40 ">
            <img className="w-32 h-24" src="src\images\logoIntradeshop.png"></img>
        </div>

        <div className=" -ml-5 mt-8">
            <h1 className="font-ralewayFont  text-4xl text-white">HOLA</h1>
        </div>
        <div className=" mt-10 mr-20 ml-auto ">
            <NavLink to="/editar-negocio" className="text-[#D1AC00] font-ralewayFont text-2xl">Editar</NavLink>
        </div>
      </div>
    </>
  );
}

export default CardProfile;
