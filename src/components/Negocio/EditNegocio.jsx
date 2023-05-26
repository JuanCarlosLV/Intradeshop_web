import { useEffect, useState } from "react";
import { getInfoNegocio, editarInfoNegocio, editarImgLogo, eliminarImgBucket } from "../../services/Negocio";
import { BsFillArrowLeftCircleFill, BsFillImageFill } from "react-icons/bs";
import { useNavigate, NavLink } from "react-router-dom";
import ConfirmacionAction from "../Modales/ConfirmacionAction";

function EditNegocio() {
  const navigatePrincipalDealer = useNavigate();
  const [stateModal, setStateModal] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    nombre: "",
    correo: "",
    direccion: "",
    descripcion: "",
    telefono: "",
    logo: "",
  });
  const [stateEditImg, setEditImg] = useState(false);
  useEffect(() => {
    async function getInfo() {
      const data = await getInfoNegocio();
      setFormValues({
        id: data.idNegocio,
        nombre: data.nomNegocio,
        correo: data.correoElectronico,
        direccion: data.direccion,
        descripcion: data.descripcion,
        telefono: data.telContacto,
        logo: data.logo,
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
      [evt.target.name]: evt.target.value,
    });
  };
  const handleEditar = async (evt) => {
    evt.preventDefault();
    if (stateEditImg) {
      await eliminarImgBucket();
      await editarImgLogo(formValues.logo, formValues.id);
      await editarInfoNegocio(
        formValues.nombre,
        formValues.correo,
        formValues.direccion,
        formValues.descripcion,
        formValues.telefono,
      );
    } else {
      await editarInfoNegocio(
        formValues.nombre,
        formValues.correo,
        formValues.direccion,
        formValues.descripcion,
        formValues.telefono,
      );
    }
    navigatePrincipalDealer("/home-negociante");
  };
  const handleEditImg = (evt) => {
    evt.preventDefault();
    setEditImg(true);
  }
  const handleImageChange = (evt) => {
    const file = evt.target.files[0]
    setFormValues({
      ...formValues,
      logo: file
    })
  }
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
              {stateEditImg && (
                <input type="file" id="logo" name="logo" accept=".jpeg .png .jpg" onChange={handleImageChange}></input>
              )}
              <div className="px-96 ml-40 py-2">
                <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
                  Modificar
                </button>
              </div>
            </div>
            <div className="mt-20 ml-40 w-auto h-auto rounded-r-md shadow-lg">
              <img src={formValues.logo} alt={formValues.nombre} className="w-80 h-80 object-cover bg-center rounded-r-md rounded-md" />
              {!stateEditImg && (
                <button onClick={handleEditImg} className="hover:bg-black rounded-md bg-[#004643] py-3 px-5  font-semibold text-white font-ralewayFont m-8">
                  <BsFillImageFill />
                </button>
              )}
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
