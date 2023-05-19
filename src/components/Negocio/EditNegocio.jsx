import { useEffect, useState } from "react";
import { getInfoNegocio, editarInfoNegocio } from "../../services/Negocio";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
      <div className="flex justify-between my-4">
        <a href="/home-negociante">
          <BsFillArrowLeftCircleFill
            className="text-4xl mt-2 ml-10"
            color={"D1AC00"}
          />
        </a>
        <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
          Modificar información de tienda
        </h1>
      </div>
      <div className="top-1 left-60 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto p-4 ml-60">
        <form onSubmit={handleShowModal} className="max-w-lg">
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
          <div className="px-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
              Modificar
            </button>
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
