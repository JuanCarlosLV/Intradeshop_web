import Header from "./partials/HeaderLogin";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useState } from "react";
import { registroNegociante, subirLogo } from "../services/Negocio";
import { NavLink, useNavigate } from "react-router-dom";

function RegistroNegociante() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nombreNegocio: "",
    numeroTelefono: "",
    correoElectronicoNegocio: "",
    direccion: "",
    descripcion: "",
    logotipo: [],
    nombreNegociante: "",
    nombreUsuario: "",
    correoElectronico: "",
    contraseña: "",
    contraseñaConfirmada: "",
  });

  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleLogoChange = (evt) => {
    setFormValues({
      ...formValues,
      logotipo: evt.target.files[0],
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formValues.contraseña !== formValues.contraseñaConfirmada) {
      alert("Las contraseñas no coindicen");
    }

    const { error } = await registroNegociante(
      formValues.nombreNegocio,
      formValues.numeroTelefono,
      formValues.correoElectronicoNegocio,
      formValues.direccion,
      formValues.descripcion,
      formValues.nombreNegociante,
      formValues.nombreUsuario,
      formValues.correoElectronico,
      formValues.contraseña
    );

    if (error) {
      alert(error.message);
    } else {
      subirLogo(formValues.logotipo)
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="">
        <div className="flex flex-wrap justify-center content-center mt-5 mr-20 ">
          <NavLink to="/seleccion-registro">
            <BsFillArrowLeftCircleFill
              className="text-4xl ml-10"
              color={"D1AC00"}
            />
          </NavLink>

          <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
            Registro de Cuenta de Negocio
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="  flex flex-wrap justify-center content-center">
            <div className="w-3/6 ml-20 mt-10">
              <h1 className="font-ralewayFont font-semibold text-2xl">
                Datos del Negocio
              </h1>
              <hr className="border-black border-y-2 mb-5 mt-2"></hr>
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold ">
                Nombre de Negocio
              </label>
              <input
                type="text"
                name="nombreNegocio"
                value={formValues.nombreNegocio}
                onChange={handleInputChange}
                placeholder="Nombre de Negocio"
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Contacto Teléfonico
              </label>
              <input
                type="text"
                name="numeroTelefono"
                value={formValues.numeroTelefono}
                onChange={handleInputChange}
                placeholder="Numero de Teléfono"
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Correo Electrónico del Negocio
              </label>
              <input
                type="email"
                name="correoElectronicoNegocio"
                value={formValues.correoElectronicoNegocio}
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>

              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Direccion de negocio o entrega
              </label>
              <input
                type="text"
                name="direccion"
                value={formValues.direccion}
                onChange={handleInputChange}
                placeholder="Dirección de entrega"
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>

              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Descripcion de Negocio
              </label>
              <input
                type="text"
                name="descripcion"
                value={formValues.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción de negocio"
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>

              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Logotipo del Negocio
              </label>
              <input
                type="file"
                name="logotipo"
                onChange={handleLogoChange}
                className="w-full rounded-md border  bg-white py-3 px-6  font-semibold text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] font-ralewayFont "
              ></input>

              <div>
                <h1 className="font-ralewayFont font-semibold text-2xl mt-5">
                  Datos del Negociante
                </h1>
                <hr className="border-black border-y-2 mb-5 mt-2"></hr>
                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                  Nombre del Negociante
                </label>
                <input
                  type="text"
                  name="nombreNegociante"
                  value={formValues.nombreNegociante}
                  onChange={handleInputChange}
                  placeholder="Nombre del negociante"
                  className="w-full rounded-md border  bg-white py-3 px-6  font-semibold text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] font-ralewayFont "
                ></input>

                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="nombreUsuario"
                  value={formValues.nombreUsuario}
                  onChange={handleInputChange}
                  placeholder="Nombre de usuario"
                  className="w-full rounded-md border  bg-white py-3 px-6  font-semibold text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] font-ralewayFont "
                ></input>

                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="correoElectronico"
                  value={formValues.correoElectronico}
                  onChange={handleInputChange}
                  placeholder="Nombre de usuario"
                  className="w-full rounded-md border  bg-white py-3 px-6  font-semibold text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] font-ralewayFont "
                ></input>

                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="contraseña"
                  value={formValues.contraseña}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full rounded-md border  bg-white py-3 px-6  font-semibold text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] font-ralewayFont "
                ></input>
                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="contraseñaConfirmada"
                  value={formValues.contraseñaConfirmada}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full rounded-md border  bg-white py-3 px-6  font-semibold text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] font-ralewayFont "
                ></input>
              </div>

              <div className="px-96 ml-48 py-2 ">
                <button
                  type="submit"
                  className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8"
                >
                  Registrar
                </button>
              </div>
            </div>

            <div className=" ml-auto mr-10 mt-10 rounded-r-md">
              <img
                className="mt-60"
                src="/src/images/logoIntradeshop.png"
              ></img>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistroNegociante;
