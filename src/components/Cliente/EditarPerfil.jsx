import Header from "../partials/Header";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { modificarDatos, mostrarDatos } from "../../services/Cliente";

function EditarPerfil() {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarContraseñaConfirmada, setMostrarContraseñaConfirmada] =
    useState(false);
  const [formValues, setFormValues] = useState({
    nombreUsuario: "",
    correoElectronico: "",
    contraseña: "",
    contraseñaConfirmada: "",
  });
  const { idcliente } = useParams();
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  const botonMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const botonMostrarContraseñaConfirmada = () => {
    setMostrarContraseñaConfirmada(!mostrarContraseñaConfirmada);
  };

  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    async function obtenerDatos() {
      const data = await mostrarDatos(idcliente);
      setFormValues({
        nombreUsuario: data.nombreUsuario || "",
        correoElectronico: data.correoElectronico || "",
        contraseña: data.contraseña || "",
        contraseñaConfirmada: data.contraseña || "",
      });
    }
    obtenerDatos();
  }, [idcliente]);

  const handleModificarDatos = async (evt) => {
    evt.preventDefault();

    if (formValues.contraseña !== formValues.contraseñaConfirmada) {
      alert("las contraseña no coinciden");
    } else {
      const data = await modificarDatos(
        formValues.nombreUsuario,
        formValues.correoElectronico,
        formValues.contraseña
      );

      if (data) {
        console.log("se modifico");
      } else {
        console.log("no se pudo modificar");
      }
    }
  };
  return (
    <>
      <Header />

      <main className="flex flex-col">
        <section className="flex flex-row">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill
              className="text-[45px] ml-10 mt-[35px]"
              color="D1AC00"
            />
          </NavLink>
          <section className="flex flex-row bg-[#004643] mt-5 rounded-[5px] items-center justify-left ml-[100px] w-[1300px] h-[90px]">
            <h3 className="text-white font-ralewayFont font-semibold text-[37px] ml-5">
              {" "}
              Modificar Cuenta
            </h3>
          </section>
        </section>

        <section className="flex flex-col mt-[30px]  ml-[180px] mr-[225px]">
          <header>
            <p className="text-[30px] font-ralewayFont font-semibold">
              Datos de la Cuenta
            </p>
            <hr className="mt-2 border-black border-[2px] rounded-[2px]"></hr>
          </header>

          <form>
            <div className="flex flex-col w-auto mt-[30px] font ">
              <article className="flex flex-col">
                <label htmlFor="" className="text-[25px] font-semibold mr-10">
                  Nombre usuario
                </label>
                <input
                  type="text"
                  name="nombreUsuario"
                  onChange={handleInputChange}
                  value={formValues.nombreUsuario}
                  className="w-[700px] rounded-md border  bg-white py-3 px-6 text-[18px] mt-4 font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
                />
              </article>

              <article className="flex flex-col">
                <label htmlFor="" className="text-[25px] font-semibold mr-10">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="correoElectronico"
                  onChange={handleInputChange}
                  value={formValues.correoElectronico}
                  className="w-[700px] rounded-md border  bg-white py-3 px-6 text-[18px] mt-4 font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
                />
              </article>
              <article className="flex flex-col ">
                <label htmlFor="" className="text-[25px] font-semibold mr-10">
                  Nueva Contraseña
                </label>
                <input
                  type={mostrarContraseña ? "text" : "password"}
                  name="contraseña"
                  onChange={handleInputChange}
                  value={formValues.contraseña}
                  className="w-[700px] rounded-md border  bg-white py-3 px-6 text-[18px] mt-4 font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] "
                />
                <button
                  type="button"
                  onClick={botonMostrarContraseña}
                  className="transform -translate-y-[40px] ml-[650px] "
                >
                  {mostrarContraseña ? (
                    <IoMdEyeOff className="text-[35px] text-[#004643]" />
                  ) : (
                    <IoMdEye className="text-[35px] text-[#004643]" />
                  )}
                </button>
              </article>
              <article className="flex flex-col -mt-7">
                <label htmlFor="" className="text-[25px] font-semibold mr-10">
                  Confirmar Contraseña
                </label>
                <input
                  type={mostrarContraseñaConfirmada ? "text" : "password"}
                  name="contraseñaConfirmada"
                  onChange={handleInputChange}
                  value={formValues.contraseñaConfirmada}
                  className="w-[700px] rounded-md border  bg-white py-3 px-6 text-[18px] mt-4 font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] pr-12"
                />
                <button
                  type="button"
                  onClick={botonMostrarContraseñaConfirmada}
                  className="transform -translate-y-[40px] ml-[650px] "
                >
                  {mostrarContraseñaConfirmada ? (
                    <IoMdEyeOff className="text-[35px] text-[#004643]" />
                  ) : (
                    <IoMdEye className="text-[35px] text-[#004643]" />
                  )}
                </button>
              </article>
              <article className="justify-end flex">
                <button className="hover:bg-black rounded-md bg-[#004643] font-semibold text-white text-[25px] font-ralewayFont mt-10 mb-4 h-[50px] w-[200px] ">
                  Modificar
                </button>
              </article>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditarPerfil;
