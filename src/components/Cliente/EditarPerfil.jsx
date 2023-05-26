import Header from "../partials/Header";
import {NavLink, useNavigate} from 'react-router-dom'
import { BsArrowLeftCircleFill } from "react-icons/bs";

function EditarPerfil() {

    const navigate = useNavigate();

    const regresar = ()=>{
        navigate(-1);
    }
  return (
    <>
      <Header />

      <main className="flex flex-col">
        <section className="flex flex-row">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill
              className="text-4xl ml-10 mt-[35px]"
              color="D1AC00"
            />
          </NavLink>
          <section className="flex flex-row bg-[#004643] mt-5 rounded-[5px] items-center justify-center ml-[100px] w-[1000px] h-[70px]">
            <h3 className="text-white font-ralewayFont font-semibold">EDITAR PERFIL</h3>
          </section>
        </section>
      </main>
    </>
  );
}

export default EditarPerfil;
