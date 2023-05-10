import { useEffect, useState } from "react";
import {
  enviarCorreo,
  getInfoNegocio,
  getIdDealer,
  darDeBajaNegocio,
} from "../../services/Negocio";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

//este se obtendra del useParams;
const idBussiness = 1;

function UnsubscribeNegocio() {
  const [negocio, setNegocio] = useState("");

  useEffect(() => {
    async function getInfo() {
      //se obtiene desde la funcion de get id
      const idDealer = await getIdDealer(idBussiness);
      const data = await getInfoNegocio(idDealer);
      setNegocio(data);
    }
    getInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    enviarCorreo(form);
    darDeBajaNegocio(idBussiness);
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
          Dar de baja tienda
        </h1>
      </div>
      <div className="top-1 left-60 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto p-4 ml-60">
        <form onSubmit={(e) => handleSubmit(e)} className="max-w-lg">
          <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
            Nombre
          </label>
          <input
            placeholder="Nombre"
            name="bussinessname"
            value={negocio.nomNegocio}
            className="w-full rounded-md border-none bg-transparent py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md focus:ring-2 focus:ring-[#004643] m-1 appearance-none"
          />
          <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={negocio.correoElectronico}
            className="w-full rounded-md border-none bg-transparent py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md focus:ring-2 focus:ring-[#004643] m-1 appearance-none"
          />
          <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
            Motivo de la baja
          </label>
          <textarea
            name="message"
            placeholder="Escribe el motivo de la baja al negocio"
            className="w-full rounded-md border-none bg-transparent py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md focus:ring-2 focus:ring-[#004643] m-1 appearance-none"
          ></textarea>
          <div className="px-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default UnsubscribeNegocio;
