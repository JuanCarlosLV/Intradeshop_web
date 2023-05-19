import HeaderLogin from "../components/partials/HeaderLogin";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useState } from "react";
import { registroCliente } from "../services/Autenticacion";
import { NavLink, useNavigate} from "react-router-dom";

function RegistroCliente() {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    nombreUsuario: "",
    correoElectronico: "",
    contraseña: "",
    confirmarContraseña: "",
  });


  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formValues.contraseña !== formValues.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const { data, error } = await registroCliente(
      formValues.correoElectronico,
      formValues.contraseña,
      formValues.nombreUsuario
    );
    
    if (error) {
      alert(error.message);
    }else{
      navigate('/login')
    }
    
    
    
  };

  return (
    <>
      <HeaderLogin />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center  mt-5 mr-20 ">
            <NavLink to="/seleccion-registro">
              <BsFillArrowLeftCircleFill
                className="text-4xl ml-10"
                color={"D1AC00"}
              />
            </NavLink>

            <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
              Registro de Cuenta Personal
            </h1>
          </div>

          <div className="  flex flex-row">
            <div className="w-3/6 ml-20 mt-10 ">
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold ">
                Nombre de Usuario
              </label>
              <input
                type="text"
                name="nombreUsuario"
                placeholder="Nombre de usuario"
                value={formValues.nombreUsuario}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correoElectronico"
                placeholder="Correo Electrónico"
                value={formValues.correoElectronico}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>
              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Contraseña
              </label>
              <input
                type="password"
                name="contraseña"
                placeholder="********"
                value={formValues.contraseña}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>

              <label className="mb-3 block text-base text-left font-ralewayFont font-semibold">
                Confirma tu contraseña
              </label>
              <input
                type="password"
                name="confirmarContraseña"
                placeholder="********"
                value={formValues.confirmarContraseña}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]"
              ></input>

              <div className="px-96 ml-48 py-2 ">
                <button
                  
                  className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8"
                >
                  Registrar
                </button>
              </div>
            </div>

            <div className=" ml-auto w-auto h-auto rounded-r-md ">
              <img
                className="w-auto bg-center  rounded-r-md"
                src="/src/images/logoIntradeshop.png"
              ></img>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistroCliente;
