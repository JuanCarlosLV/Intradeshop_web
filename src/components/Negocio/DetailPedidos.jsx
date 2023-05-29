import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetallePedido, cambioEstadoPedido } from "../../services/Negocio";
import { NavLink } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function DetailPedidos() {
    const { id } = useParams();
    const [pedidos, setPedidos] = useState([]);
    const [dataPedido, setDataPedido] = useState({
        idCompra: "",
        nomCliente: "",
        correoCliente: "",
        estadoCompra: "",
        fecha: "",
        totalCompra: "",
    })
    useEffect(() => {
        async function getDetail() {
            const data = await getDetallePedido(id);
            setPedidos(data);

            if (data.length > 0) {
                setDataPedido({
                    idCompra: data[0].id_compra,
                    nomCliente: data[0].nom_cliente,
                    correoCliente: data[0].correo_cliente,
                    estadoCompra: data[0].status_compra,
                    fecha: data[0].fecha_c,
                    totalCompra: data[0].total_compra
                });
            }
        }
        getDetail();
    }, [id])
    const handleStatusPedido = async () => {
        await cambioEstadoPedido(id);
    }
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
                        <div>
                            <div className="flex justify-start item-start space-y-2 flex-col">
                                <label className="text-3xl dark:text-white lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800 font-ralewayFont">Pedido # {dataPedido.idCompra}</label>
                                <p className=" dark:text-gray-300 text-1xl leading-6 text-gray-600 font-ralewayFont font-bold mt-2"> Fecha compra: {dataPedido.fecha}</p>
                                <p className=" dark:text-gray-300 text-1xl leading-6 text-gray-600 font-ralewayFont font-bold">Estado del pedido: {dataPedido.estadoCompra}</p>
                                <p className=" dark:text-gray-300 text-1xl leading-6 text-gray-600 font-ralewayFont font-bold">Nombre cliente: {dataPedido.nomCliente}</p>
                                <p className=" dark:text-gray-300 text-1xl leading-6 text-gray-600 font-ralewayFont font-bold">Correo cliente: {dataPedido.correoCliente}</p>
                            </div>

                            {pedidos.map((pedido, index) => (
                                <div key={index} className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                            <img className="w-full hidden md:block" src={pedido.imagen_product} alt={pedido.nom_product}></img>
                                        </div>
                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800 font-ralewayFont">{pedido.nom_product}</h3>
                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                    <p className="text-1xl dark:text-white leading-none text-gray-800 font-ralewayFont">Id producto: {pedido.id_product}</p>
                                                    <p className="text-1xl dark:text-white leading-none text-gray-800 font-ralewayFont">Talla: {pedido.talla_product} </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                <p className="text-base dark:text-white xl:text-lg leading-6 px-4 font-ralewayFont">$ {pedido.precio_product}</p>
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800 font-ralewayFont px-4">{pedido.cantidad_product} </p>
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800 font-ralewayFont px-4">{pedido.subtotal_product} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col justify-start items-start dark:bg-[#004643] bg-[#004643] px-2 py-2 md:py-2 md:p-2 xl:p-4 w-full rounded-md">
                                <h3 className="text-base dark:text-white xl:text-3xl leading-6 text-white font-ralewayFont px-4">Total: {dataPedido.totalCompra} </h3>
                            </div>
                            <div className="px-60 ml-40 py-2">
                                <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8" onClick={handleStatusPedido}>Entregado</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DetailPedidos;