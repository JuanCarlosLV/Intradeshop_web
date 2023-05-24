import GetListPedido from "../components/Negocio/GetListPedido"
import HeaderNegociante from "../components/Negocio/HeaderNegociante";
import SidebarNegociante from "../components/Negocio/SidebarNegociante";
function MisPedidos() {
    return (
        <>
            <HeaderNegociante />
            <SidebarNegociante />
            <GetListPedido />
        </>
    )
}

export default MisPedidos