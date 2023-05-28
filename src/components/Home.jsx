import HeaderBase from "./partials/Header";
import Footer from './partials/Footer'
import BarraBusqueda from "./partials/BarraBusqueda";
import Carousel from "./partials/CarruselCategorias";
import { supabase } from "../supabase/connection";
import { useEffect, useState } from "react";
import CardProducto from "../components/partials/CardProduct";
import { getUltimosProductos } from "../services/Producto";
import { getTipoCuenta } from "../services/Autenticacion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("");
  const [id, setid] = useState("");

  const [lastProducts, setlastProducts] = useState([]);
  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUsername(session.user.email);
      setid(session.user.id);
    });
    
   
    
    async function redireccion() {
      const cuenta = await getTipoCuenta(id);
      if (cuenta === "cliente") {
        navigate("/");
      } else if (cuenta === "negociante") {
        navigate("home-negociante");
      } else if (cuenta === "administrador") {
        navigate("/home-administrador");
      }
    }
    redireccion();

    async function mostrarUltimosProductos() {
      const data = await getUltimosProductos();
      setlastProducts(data);
    }
    mostrarUltimosProductos();
  }, [id, navigate]);

  return (
    <>
      <main className="relative">
        <header>
          <HeaderBase />
        </header>
        <section className="absolute z-50">
          <BarraBusqueda
            placeholder="Buscar por nombre, categoria etc...."
            tipoBusqueda="producto"
          />
        </section>
        <section className="static mt-[140px]">
          <article>
            <h1 className="font-ralewayFont font-semibold text-[#004643] text-3xl mb-4 ml-10">
              Categorias
            </h1>
            <Carousel/>
          </article>

          <header>
            <h1 className="font-ralewayFont font-semibold text-[#004643] text-3xl mt-5 ml-10">
              Productos Recientes
            </h1>
          </header>
          <section className=" ml-[100px] mr-8 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5">
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

          <footer className="mt-[40px]">
            <Footer/>
          </footer>
        </section>
      </main>
    </>
  );
}

export default Home;
