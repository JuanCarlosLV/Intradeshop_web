import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HeaderLogin from "./partials/HeaderLogin";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { getTipoCuenta, iniciarSesion } from "../services/Autenticacion";
import { supabase } from "../supabase/connection";
function Login() {
  const navigate = useNavigate();
  const [idUser, setidUser] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
      setidUser(session.user.id);
    });
  }, []);

  const redireccion = async (dato) => {
   
    /*if (data == "cliente") {
      navigate("/");
    } else if (data === "negociante") {
      navigate("home-negociante");
    } else if (data === "administrador") {
      navigate("home-administrador");
    } else {
      alert("error");
    }*/
  };

  const [formValues, setFormValues] = useState({
    correoElectronico: "",
    contraseña: "",
  });

  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const data = await iniciarSesion(
      formValues.correoElectronico,
      formValues.contraseña
    );
    const cuenta = await getTipoCuenta(idUser);
    console.log("id: "+ idUser)
    console.log("tipo cliente:"+ cuenta)
    if(cuenta==="cliente"){
      navigate("/")
    }
    if(cuenta==="negociante"){
      navigate("/home-negociante")
    }
    if(cuenta==="administrador"){
      navigate("/home-administrador")
    }
   
  };

  return (
    <>
      <HeaderLogin />

      <div className="mt-5 flex">
        <a href="/">
          <BsArrowLeftCircleFill
            className="text-4xl ml-10 mt-3 "
            color="D1AC00"
          />
        </a>

        <h1 className="text-4xl mt-5 font-bold font-ralewayFont text-center mr-auto ml-auto">
          INICIAR SESIÓN
        </h1>
      </div>

      <div className="flex flex-wrap mt-5 content-center justify-center ">
        <div className="flex">
          <div className="flex flex-wrap content-center justify-center rounded-l-md">
            <div className="w-96">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label class="mb-2 block text-2xl font-ralewayFont font-semibold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="correoElectronico"
                    placeholder="Correo electrónico"
                    value={formValues.correoElectronico}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border border-[#004643] focus:border-[#004643] focus:outline-none focus:ring-1 focus:ring-[#004643] py-2 px-3 text-black font-ralewayFont"
                  />
                </div>

                <div className="mb-3 mt-7">
                  <label className="mb-2 block text-2xl font-semibold font-ralewayFont">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="contraseña"
                    value={formValues.contraseña}
                    onChange={handleInputChange}
                    placeholder="*******"
                    className="block w-full rounded-md border border-[#004643] focus:border-[#004643] focus:outline-none focus:ring-1 focus:ring-[#004643] py-2 px-3 text-black"
                  />
                </div>

                <div className="mb-3 flex flex-wrap content-center">
                  <NavLink
                    to="/recuperar-contraseña"
                    className="text font-semibold font-ralewayFont text-[#D1AC00]"
                  >
                    ¿Se te olvidó la contraseña?
                  </NavLink>
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="mb-1.5 text-xl block w-full text-center text-white font-ralewayFont font-semibold bg-[#004643] hover:bg-black px-2 h-12 py-1.5 rounded-md"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
             

              <div className="text-center">
                <span className="text-x text-black font-ralewayFont font-semibold">
                  No tienes una cuenta?
                </span>
                <NavLink
                  to="/seleccion-registro"
                  className="text-x ml-3 font-semibold font-ralewayFont text-[#004643] hover:text-black"
                >
                  Registrate
                </NavLink>
              </div>
            </div>
          </div>

          <div className=" ml-24 content-center justify-center rounded-r-md">
            <img
              className="w-auto h-auto bg-center bg-no-repeat bg-cover rounded-r-md"
              src="src\images\logoIntradeshop.png"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
