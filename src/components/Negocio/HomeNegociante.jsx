import Header from "./HeaderNegociante";
import Sidebar from "./SidebarNegociante";
import CardProfile from '../Negocio/CardProfile'

function HomeNegociante() {
  return (
    <>
      <Header />
      <Sidebar />
      <CardProfile/>

      <div className="mt-10 mr-10 ml-72 h-10">
        <p className="text-[#004643] font-ralewayFont text-3xl">Pedidos Recientes</p>
        <hr className="border-[#D1AC00] w-full border-y-2 mt-1"></hr>
      </div>

      <div className="bg-[#D1AC00] mt-4 mr-10 ml-72 rounded h-10 flex flex-row items-center space-x-32 font-ralewayFont text-2xl">
        <h1 className="text-white">Id Pedido</h1>
        <h1 className="text-white">Producto</h1>
        <h1 className="text-white">Cantidad</h1>
        <h1 className="text-white">Total Venta</h1>
      </div>
    </>
  );
}

export default HomeNegociante;
