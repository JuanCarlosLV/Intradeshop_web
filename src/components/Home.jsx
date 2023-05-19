import HeaderBase from "./partials/Header";
import BarraBusqueda from "./partials/BarraBusqueda";
import Carousel from "./partials/CarruselCategorias";
import { supabase } from "../supabase/connection";
import { useEffect, useState } from "react";
import CardProducto from "../components/partials/CardProduct";
import { getUltimosProductos } from "../services/Producto";

function Home() {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("")

  const [lastProducts, setlastProducts] = useState([]);
  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
      setUsername(session.user.email);
    });

    async function mostrarUltimosProductos() {
      const data = await getUltimosProductos();
      setlastProducts(data);
      console.log(data);
    }
    mostrarUltimosProductos();
  }, []);

  return (
    <>
      <div className="relative">
        <div>
          <HeaderBase />
        </div>
        <div className="absolute z-50">
          <BarraBusqueda
            placeholder="Buscar por nombre, categoria etc...."
            tipoBusqueda="producto"
          />
        </div>
        <section className="static mt-[140px]">
          <div>
            <h1 className="font-ralewayFont font-semibold text-[#004643] text-3xl mb-4 ml-10">
              Categorias
            </h1>
            <Carousel nombreTienda="trade" />
          </div>

          <div>
            <h1 className="font-ralewayFont font-semibold text-[#004643] text-3xl mt-5 ml-10">
              Productos Recientes
            </h1>
          </div>
          <section className=" ml-[100px] mr-8 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lastProducts.map((product) => (
              <>
                <div key={product.idProducto}>
                  <CardProducto
                    idProducto={product.idProducto}
                    rutaActual="producto"
                    nombreProducto={product.nomProducto}
                    precio={product.precio}
                    imagenProducto={product.imagen}
                  />
                </div>
              </>
            ))}
          </section>
        </section>
      </div>
    </>
  );
}

export default Home;
