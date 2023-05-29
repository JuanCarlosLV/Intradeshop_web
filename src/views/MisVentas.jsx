import HeaderNegociante from "../components/Negocio/HeaderNegociante";
import ShowVentas from "../components/Negocio/ShowVentas";
import SidebarNegociante from "../components/Negocio/SidebarNegociante";

function MisVentas() {
    return (
        <>
            <HeaderNegociante />
            <SidebarNegociante/>
            <ShowVentas/>
        </>
    )
}

export default MisVentas