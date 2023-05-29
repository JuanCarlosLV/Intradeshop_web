import Header from "./HeaderNegociante";
import Sidebar from "./SidebarNegociante";
import CardProfile from '../Negocio/CardProfile'
import { useEffect, useState } from "react";
import { getListPediRecientes } from "../../services/Negocio";

function HomeNegociante() {
  const [pedidosRecientes, setPedidoReciente] = useState([]);
  useEffect(() => {
    async function getPedidos() {
      const data = await getListPediRecientes();
      setPedidoReciente(data);
    }
    getPedidos();
  }, [])
  return (
    <>
      <Header />
      <Sidebar />
      <CardProfile />

      <div className="mt-10 mr-10 ml-72 h-10">
        <p className="text-[#004643] font-ralewayFont text-3xl">Pedidos Recientes</p>
        <hr className="border-[#D1AC00] w-full border-y-2 mt-1"></hr>
      </div>

      <div className="bg-[#D1AC00] mt-4 mr-10 ml-72 rounded h-10 flex flex-row items-center space-x-80 font-ralewayFont text-2xl px-1">
        <h1 className="text-white">Id Pedido</h1>
        <h1 className="text-white">Fecha</h1>
        <h1 className="text-white">Total</h1>
      </div>

      {pedidosRecientes.map((pedido, index) =>
        <div key={index} className="bg-gray-400 mt-4 mr-10 ml-72 rounded h-10 flex flex-row items-center space-x-80 font-ralewayFont text-2xl px-10">
          <h1 className="text-white">{pedido.id_compra}</h1>
          <h1 className="text-white">{pedido.fecha_c}</h1>
          <h1 className="text-white">{pedido.total_compra}</h1>
        </div>
      )}
    </>
  );
}

export default HomeNegociante;
