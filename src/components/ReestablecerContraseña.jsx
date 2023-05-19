import Header from "./partials/HeaderLogin";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

function ReestablecerContraseña() {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="mt-5 flex">
        <NavLink onClick={regresar}>
          <BsArrowLeftCircleFill
            className="text-4xl ml-10 mt-3 "
            color="D1AC00"
          />
        </NavLink>

        <h1 className="text-4xl mt-5 font-bold font-ralewayFont text-center mr-auto ml-auto">
          Reestablecer Contraseña
        </h1>
      </div>

      <form>
        <main className="flex flex-row ">
          <section className="w-3/6 ml-20 mt-10 mb-52">
            



          </section>
          <section className="ml-auto w-auto h-full rounded-r-md">
            <img
              className="w-auto bg-center  rounded-r-md"
              src="/src/images/logoIntradeshop.png"
            ></img>
          </section>
        </main>
      </form>
    </>
  );
}

export default ReestablecerContraseña;
