import { useEffect, useState } from "react";
import { getInfoNegocio, editarInfoNegocio } from "../../services/Negocio";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate, NavLink } from "react-router-dom";
import ConfirmacionAction from "../Modales/ConfirmacionAction";

function EditNegocio() {
  const navigatePrincipalDealer = useNavigate();
  const logo = "logo";
  //const idDealer = "e2b5cb16-d834-4cee-b6d9-90aea4af67ae";
  const [stateModal, setStateModal] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    descripcion: "",
    telefono: "",
  });
  useEffect(() => {
    async function getInfo() {
      const data = await getInfoNegocio();
      setFormValues({
        nombre: data.nomNegocio,
        correo: data.correoElectronico,
        direccion: data.direccion,
        descripcion: data.descripcion,
        telefono: data.telContacto,
      });
    }
    getInfo();
  }, []);
  const handleShowModal = (evt) => {
    evt.preventDefault();
    setStateModal(true);
  };
  const handleCloseModal = () => {
    setStateModal(false);
  };
  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.value,
    });
  };
  const handleEditar = (evt) => {
    evt.preventDefault();
    editarInfoNegocio(
      formValues.nombre,
      formValues.correo,
      formValues.direccion,
      formValues.descripcion,
      formValues.telefono,
      logo
    );
    navigatePrincipalDealer("/home-negociante");
  };

  return (
    <>
      <div>
        <form onSubmit={handleShowModal} >

          <div className="flex items-center  mt-5 mr-20 ">
            <NavLink to="/home-negociante">
              <BsFillArrowLeftCircleFill
                className="text-4xl mt-2 ml-10"
                color={"D1AC00"}
              />
            </NavLink>
            <h1 className="font-ralewayFont font-bold text-4xl text-white ml-20 mr-auto bg-[#004643]  border-[#004643] focus:border-[#004643] py-2 px-60 rounded-md">
              Modificar información negocio
            </h1>
          </div>

          <div className="flex flex-row">
            <div className="w-3/6 ml-40 mt-10">
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                value={formValues.nombre}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
              />
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Correo electrónico
              </label>
              <input
                id="correo"
                name="correo"
                value={formValues.correo}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
              />
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Dirección
              </label>
              <input
                id="direccion"
                name="direccion"
                value={formValues.direccion}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
              />
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Descripción
              </label>
              <input
                id="descripcion"
                name="descripcion"
                value={formValues.descripcion}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
              />
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                value={formValues.telefono}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
              />

              <div className="px-96 ml-40 py-2">
                <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
                  Modificar
                </button>
              </div>
            </div>
          </div>
        </form>

        <ConfirmacionAction
          mostrarModal={stateModal}
          titulo="Editar negocio"
          cuerpo="¿Estás seguro de modificar los datos del negocio?"
          cancelar={handleCloseModal}
          confirmar={handleEditar}
        />
      </div>
    </>
  );
}
export default EditNegocio;
