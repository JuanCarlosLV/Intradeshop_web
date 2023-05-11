import HeaderBase from "./partials/Header";
import BarraBusqueda from "./partials/BarraBusqueda";
import Carousel from "./partials/CarruselCategorias";
import { supabase } from "../supabase/connection";
import { useEffect, useState } from "react";

function Home() {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("");
  const [productsSearch, setProductsSearch] = useState([]);
  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
      setUsername(session.user.email);
    });
  }, []);

  return (
    <>
      <HeaderBase />
      <form onSubmit>
        <BarraBusqueda />
      </form>

      <div>
        <h1 className="font-ralewayFont font-semibold text-[#004643] text-3xl mb-4 ml-10">
          Categorias
        </h1>
        <Carousel nombreTienda="trade" />
      </div>
      <div>
        <h1 className="font-ralewayFont font-semibold text-[#004643] text-3xl mt-5 ml-10">
          Tendencias
        </h1>

        {/* listado de los productos recien subidos */}
      </div>
    </>
  );
}

export default Home;
