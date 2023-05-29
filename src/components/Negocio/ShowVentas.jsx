import { useEffect, useState } from "react"
import { getListVentas } from "../../services/Negocio";


function ShowVentas() {
    const [ventas, setVentas] = useState([]);
    useEffect(() => {
        async function getVentas() {
            const data = await getListVentas();
            setVentas(data)
        }
        getVentas();
    }, [])
    return (
        <>
            {ventas.map((venta, index) => (
                <div key={index} className="relative grid grid-flow-row gap-8 xl:grid-cols-3 mb-5 mr-[50px] ml-[400px] bg-[#004643] mt-5 rounded">
                    <div className="flex-none w-52 relative">
                        <img src={venta.imagen_product} alt={venta.id_compra} className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
                    </div>
                    <div className="flex-auto p-10">
                        <div className="flex flex-wrap items-baseline ">
                            <h1 className="w-full flex-none text-2xl leading-none text-white font-ralewayFont ">Pedido: {venta.id_compra}</h1>
                            <div className="flex-auto text-lg font-medium text-white">
                                <p className="font-ralewayFont text-lg">{venta.fecha_c}</p>
                            </div>
                            <div className="text-xs leading-6 uppercase text-white">
                                <p className="font-ralewayFont text-2xl"> $ {venta.total_compra}</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-auto flex space-x-4 pr-4">
                                <p className="font-ralewayFont text-lg text-white">{venta.nom_cliente}</p>
                                <p className="font-ralewayFont text-lg text-white">{venta.correo_cliente}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ShowVentas