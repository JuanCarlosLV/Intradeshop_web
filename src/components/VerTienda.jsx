import { AiFillHome } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import Header from "./partials/Header";

function VerTienda(props) {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <main>
        <section className="flex flex-row mt-[20px] ">
          <BsArrowLeftCircleFill
            className="text-4xl ml-10 mt-[25px]"
            color="D1AC00"
            onClick={regresar}
          />

          <div className="bg-[#004643] items-center flex justify-center w-[1200px] h-[150px] rounded-[5px] mr-[60px] ml-[100px]">
            <img src={props.imagenTienda} alt={props.nombreTienda} className=""/>
            <h2 className="text-white text-[25px] font-ralewayFont font-semibold">Tienda</h2>
          </div>

          <NavLink to="/">
            <AiFillHome className="text-[40px] mt-[22px] mr-10 ml-[100px]" color="004643" />
          </NavLink>
        </section>
        <section></section>
        <section></section>
      </main>
    </>
  );
}

export default VerTienda;
