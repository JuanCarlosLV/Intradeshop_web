import { useEffect, useState } from "react";
import { getAllPedidos } from "../../services/Negocio";
import { useNavigate } from "react-router-dom";


function GetListPedido() {
    const [pedidos, setPedidos] = useState([]);
    const navigateDetail = useNavigate();
    useEffect(() => {
        async function showPedidos() {
            const data = await getAllPedidos();
            setPedidos(data)
        }
        showPedidos();
    }, [])
    const handleNavigateDetalle = (idPedido) => {
        navigateDetail(`/mis-pedidos/detalle/${idPedido}`);
    }
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg top-40 mx-auto max-w-4xl mt-5 mb-8  float-right mr-60">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="w-full text-xs text-gray-700 uppercase bg-[#D1AC00] dark:bg-gray-700 dark:text-gray-500 font-medium font-ralewayFont">
                        <tr>
                            <th scope="col" className="px-10 py-4 text-base text-center">
                                id
                            </th>
                            <th scope="col" className="px-10 py-4 text-base text-center">
                                fecha
                            </th>
                            <th scope="col" className="px-10 py-4 text-base text-center">
                                total
                            </th>
                            <th scope="col" className="px-10 py-4 text-base text-center">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido, index) => (
                            <tr key={index} className="bg-gray-100 border-b dark:bg-white-800 dark:border-gray-700">
                                <td className="px-10 py-4 text-base text-center font-medium font-ralewayFont">
                                    {pedido.id_compra}
                                </td>
                                <td className="px-10 py-4 text-base text-center font-medium font-ralewayFont">
                                    {pedido.fecha_c}
                                </td>
                                <td className="px-10 py-4 text-base text-center font-medium font-ralewayFont">
                                    {pedido.total_compra}
                                </td>
                                <td className="px-10 py-4 text-base text-center font-medium font-ralewayFont">
                                    <button onClick={() => handleNavigateDetalle(pedido.id_compra)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-4 py-2 text-base">Detalle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GetListPedido;