import { useEffect, useRef, useState } from "react";
import ConfirmacionAction from "../Modales/ConfirmacionAction";
import {
  enviarCorreo,
  getInfoBussinessAdmin,
  darDeBajaNegocio,
} from "../../services/Negocio";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";

function UnsubscribeNegocio() {

  const { id } = useParams();
  const form = useRef();
  const [stateModal, setStateModal] = useState(false);
  const [negocioData, setNegocioData] = useState({
    bussinessname: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    async function getInfoNegocio() {
      const data = await getInfoBussinessAdmin(id);
      setNegocioData({
        bussinessname: data[0].nomNegocio,
        email: data[0].correoElectronico,
      });
    }
    getInfoNegocio();
  }, [])
  const handleShowModal = (evt) => {
    evt.preventDefault();
    setStateModal(true);
  };
  const handleCloseModal = (evt) => {
    evt.preventDefault();
    setStateModal(false);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    enviarCorreo(form.current);
    darDeBajaNegocio(id);
  };

  return (
    <>
      <div>
        <form ref={form} onSubmit={handleShowModal}>
          <div className="flex justify-between my-4">
            <NavLink to="/home-administrador">
              <BsFillArrowLeftCircleFill
                className="text-4xl mt-2 ml-10"
                color={"D1AC00"}
              />
            </NavLink>
            <h1 className="font-ralewayFont font-bold text-3xl text-white ml-20 mr-auto bg-[#004643]  border-[#004643] focus:border-[#004643] py-2 px-60 rounded-md">
              Dar baja tienda
            </h1>
          </div>

          <div className="flex flex-row">
            <div className="w-3/6 ml-40 mt-10">
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Nombre
              </label>
              <input
                name="bussinessname"
                value={negocioData.bussinessname}
                className="w-full rounded-md border-none bg-transparent py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md focus:ring-2 focus:ring-[#004643] m-1 appearance-none"
              />
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Email
              </label>
              <input
                name="email"
                value={negocioData.email}
                className="w-full rounded-md border-none bg-transparent py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md focus:ring-2 focus:ring-[#004643] m-1 appearance-none"
              />
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Motivo de la baja
              </label>
              <textarea
                name="message"
                placeholder="Escribe el motivo de la baja al negocio"
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></textarea>
              <div className="px-96 ml-40 py-2">
                <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </form >
        <ConfirmacionAction
          mostrarModal={stateModal}
          titulo="Baja a tienda"
          cuerpo="¿Estás seguro de dar de baja al negocio?"
          cancelar={handleCloseModal}
          confirmar={handleSubmit}
        />
      </div >

    </>
  );
}
export default UnsubscribeNegocio;
