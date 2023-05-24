import Header from "../components/partials/Header";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

function ContraEntrega() {
  const navigate = useNavigate();
  const regresar = () => {
    navigate(-1);
  };
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-row items-center">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill
              className="text-4xl ml-10 mt-[25px]"
              color="D1AC00"
            />
          </NavLink>

          <div className="flex flex-row">
            <h1 className="mt-6 font-ralewayFont font-semibold text-4xl ml-16">
              Contra Entrega
            </h1>
            <img
              src="/src/images/contra-entrega.png"
              alt="contra entrega"
              className="h-[45px] w-[45px] mt-5 ml-5"
            />
          </div>

          <div className="mr-16 mt-6 ml-auto">
            <Link to="/">
              <AiFillHome color="004643" className="text-4xl" />
            </Link>
          </div>
        </section>

        <section className="bg-[#D1AC00] rounded-[5px] flex flex-row items-center justify-center text-center space-x-[40px] h-auto w-[1100px]">
          <section className="bg-white">
            <p>Resumen de compra</p>
          </section>
          <section className="bg-white">
            <h2>Lugares de entrega</h2>
          </section>
        </section>
      </main>
    </>
  );
}

export default ContraEntrega;
