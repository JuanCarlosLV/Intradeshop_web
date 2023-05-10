import HeaderLogin from "./partials/HeaderLogin";
import {NavLink} from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function SeleccionarTipoRegistro() {
  return (
    <>
      <HeaderLogin />
      <div>
        <div className="flex flex-wrap  mt-5 mr-20 ">
          <NavLink to="/login">
            <BsFillArrowLeftCircleFill
              className="text-4xl ml-10"
              color={"D1AC00"}
            />
          </NavLink>

          <h1 className="font-ralewayFont font-bold text-4xl text-center mt-2 ml-auto mr-auto">
            CREAR CUENTA
          </h1>
        </div>
        <div className="align-middle">
          <h2 className="text-2xl text-center font-ralewayFont font-semibold mt-20 ml-auto ">
            Elije tipo de cuenta a crear
          </h2>
        </div>

        <div className="text-center mt-5">
          <NavLink
            to="/registro-cliente"
            type="button"
            className="hover:bg-black rounded-md bg-[#D1AC00] py-5 px-28  font-semibold text-white text-xl  font-ralewayFont m-8"
          >
            Cuenta Personal
          </NavLink>
          <br></br>
          <NavLink
            to="/registro-negocio"
            type="button"
            className="hover:bg-black rounded-md bg-[#D1AC00] py-5 px-28  font-semibold text-white text-xl font-ralewayFont mt-4"
          >
            Cuenta Negocio
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default SeleccionarTipoRegistro;
