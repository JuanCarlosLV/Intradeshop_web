import { Route, Routes } from "react-router-dom";
import { supabase } from "../supabase/connection";
import { getTipoCuenta } from "../services/Autenticacion";
import { useState, useEffect } from "react";

// ventanas de redireccion

import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Login from "../views/LoginPage";
import SeleccionRegistro from "../views/SeleccionRegistro";
import RegistroCliente from "../views/RegistroCliente";
import RegistroNegocio from "../views/RegistroNegocio";
import PerfilNegocio from "../views/PerfilNegocio";
import PerfilAdministrador from "../views/PerfilAdministrador";
import PerfilCliente from "../views/PerfilCliente";

import HomeNegociante from "../views/HomeNegociante";
import HomeAdministrador from "../views/HomeAdministrador";
import Carrito from "../views/Carrito";
import Tiendas from "../views/TiendasAsociadas";
import VerTienda from "../views/VerTienda";
import VerProductosCategoria from "../views/VerProductosCategoria";
import DetalleProducto from "../views/DetalleProducto";

import NuevoProducto from "../views/NuevoProducto";
import MisProductos from "../views/MisProductos";
import EliminarProducto from "../views/EliminarProducto";
import EditarProducto from "../views/EditarProducto";
import EditarNegocio from "../views/EditarNegocio";
import DarDeBajaNegocio from "../views/DarDeBajaNegocio";
import ResultadoBusqueda from "../views/ResultadoBusqueda";
import DetallePNegociante from "../views/DetallePNegociante";
import ReestablecerContraseña from "../components/ReestablecerContraseña";

function Rutas() {
  const [session, setSession] = useState(null);
  const [idUser, setidUser] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setidUser(session.user.id);
    });
  }, []);

  const getCuenta = async () => {
    const cuenta = await getTipoCuenta(idUser);
    if (cuenta === "cliente") {
      setTipoCuenta("cliente");
    } else if (cuenta === "administrador") {
      setTipoCuenta("administrador");
    } else if (cuenta === "negociante") setTipoCuenta("negociante");
  };

  return (
    <>
      <Routes>
        <Route path="carrito-compra" element={<Carrito />}></Route>
        <Route
          path="/categoria-products/:nombreCategoria"
          element={<VerProductosCategoria />}
        ></Route>
        <Route
          path="/categoria-products/:nombreCategoria/:idProducto"
          element={<DetalleProducto />}
        ></Route>

        {/* Rutas generales */}
        <Route path="/" element={<Home />}></Route>

        <Route path="*" element={<NotFound />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/reestablecer-contraseña"
          element={<ReestablecerContraseña />}
        ></Route>

        <Route
          path="seleccion-registro"
          element={<SeleccionRegistro />}
        ></Route>
        <Route path="registro-cliente" element={<RegistroCliente />}></Route>
        <Route path="registro-negocio" element={<RegistroNegocio />}></Route>
        <Route path="perfil-negocio:/id" element={<PerfilNegocio />}></Route>

        <Route path="perfil-cliente" element={<PerfilCliente />}></Route>
        <Route path="home-negociante" element={<HomeNegociante />}></Route>

        <Route path="/tiendas-asociadas" element={<Tiendas />}></Route>
        <Route
          path="/producto/:idProducto"
          element={<DetalleProducto />}
        ></Route>

        <Route
          path="tiendas-asociadas/:nombreTienda"
          element={<VerTienda />}
        ></Route>

        <Route path="mis-productos" element={<MisProductos />}></Route>
        <Route
          path="/mis-productos/nuevoproducto"
          element={<NuevoProducto />}
        ></Route>
        <Route
          path="/mis-productos/editar/:id"
          element={<EditarProducto />}
        ></Route>
        <Route
          path="/mis-productos/eliminar/:id"
          element={<EliminarProducto />}
        ></Route>
        <Route
          path="mis-productos/detalle/:id"
          element={<DetallePNegociante />}
        ></Route>
        <Route path="editar-negocio" element={<EditarNegocio />}></Route>
        <Route path="baja-negocio" element={<DarDeBajaNegocio />}></Route>

        <Route
          path="/search/:nombreProducto"
          element={<ResultadoBusqueda />}
        ></Route>
      </Routes>
    </>
  );
}

export default Rutas;
