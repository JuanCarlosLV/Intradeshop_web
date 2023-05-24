import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetallePedido } from "../../services/Negocio";
import { NavLink } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
function DetailPedidos() {
    const { id } = useParams();
    const [pedidos, setPedidos] = useState([]);
    const [idCompra, setIdCompra] = useState("");
    const [nomCliente, setNomCliente] = useState("");
    const [correoCliente, setCorreoCliente] = useState("");
    const [estadoCompra, setEstadoCompra] = useState("");
    const [fecha, setFecha] = useState();
    useEffect(() => {
        async function getDetail() {
            const data = await getDetallePedido(id);
            setPedidos(data);

            if (data.length > 0) {
                setIdCompra(data[0].id_compra);
                setFecha(data[0].fecha_c);
                setNomCliente(data[0].nom_cliente);
                setCorreoCliente(data[0].correo_cliente);
                setEstadoCompra(data[0].status_compra);
            }
        }
        getDetail();
    }, [id])
    return (
        <>
            <div>
                <div className="flex items-center  mt-5 mr-20">
                    <NavLink to="/mis-productos">
                        <BsFillArrowLeftCircleFill
                            className="text-4xl mt-2 ml-10"
                            color={"D1AC00"}
                        />
                    </NavLink>

                    <h1 className="font-ralewayFont font-bold text-4xl text-white ml-20 mr-auto bg-[#004643]  border-[#004643] focus:border-[#004643] py-2 px-60 rounded-md">
                        Detalle del pedido
                    </h1>
                </div>
                <div className="flex flex-row">
                    <div className="w-3/6 ml-40 mt-10">
                        {pedidos.length > 0 ? (
                            <div>
                                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">Id Pedido</label>
                                <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium my-1" >{idCompra}</p>
                                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">Nombre cliente</label>
                                <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium my-1">{nomCliente}</p>
                                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">Correo cliente</label>
                                <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium my-1">{correoCliente}</p>
                                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">Fecha compra </label>
                                <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium my-1">{fecha}</p>
                                <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">Estado del pedido</label>
                                <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium my-1">{estadoCompra}</p>
                                <br></br>
                                {pedidos.map((pedido, index) => (
                                    <div key={index}>
                                        <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium my-1">Id producto: {pedido.id_product}</p>
                                        <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium">Nombre producto: {pedido.nom_product}</p>
                                        <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium ">Subtotal: {pedido.subtotal_product}</p>
                                        <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium ">Talla: {pedido.talla_product} </p>
                                        <p className="mb-3 block text-2xl text-left font-ralewayFont font-medium">Cantidad: {pedido.cantidad_product} </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Cargando datos del pedido...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPedidos;