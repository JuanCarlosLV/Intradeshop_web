import Sidebar from "./SidebarAdmin";
import Header from "../Administrador/HeaderAdministrador";
import CardProfile from "../Administrador/CardProfile";
import BarraBusqueda from "./BarraBusqueda";
import CardTiendas from "../partials/CardTienda";
function HomeAdministrador() {
  return (
    <>
    
      <div className="relative">
        <Header />
        <div className="fixed">
          <Sidebar/>
        </div>
        <CardProfile />
        <div className="items-center mt-6 ml-72 mr-[1000px]">
          <h1 className="font-ralewayFont text-[20px] text-[#004643]">
            Tiendas Asocidas
          </h1>
          <hr className="border-[#D1AC00] border-y-2"></hr>
        </div>

        <div className="ml-[170px] items-center">
          <BarraBusqueda />
        </div>

        <div>
          <CardTiendas />
          <CardTiendas />
          <CardTiendas />
          <CardTiendas />
          <CardTiendas />
        </div>
      </div>
    </>
  );
}

export default HomeAdministrador;
