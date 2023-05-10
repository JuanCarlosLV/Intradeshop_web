import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";
import { agregarProducto } from "../../services/Producto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../supabase/connection";

function AddProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("");
  const [talla, setTalla] = useState("");
  const [image, setImage] = useState([]);

  const navigateMisProducts = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    agregarProducto(
      nombre,
      precio,
      cantidad,
      categoria,
      descripcion,
      color,
      talla
    );
    const imgName = `${uuidv4}-${image.name}`;
    const { data, error } = supabase.storage
      .from("Products")
      .upload(imgName, image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;
    const imgUrl = data.path;
    console.log(imgUrl);
    navigateMisProducts("/misproductos");
  };
  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between my-4">
          <a href="/misproductos">
            <BsFillArrowLeftCircleFill
              className="text-4xl mt-2 ml-10"
              color={"D1AC00"}
            />
          </a>
          <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
            Agregar producto
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="  flex flex-row">
            <div className="w-3/6 ml-20 mt-10 mb-52">
              <input
                id="nombre"
                placeholder="Nombre del producto"
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />
              <input
                id="precio"
                placeholder="Precio del producto"
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />
              <input
                type="file"
                id="imagen"
                placeholder="Nombre del producto"
                onChange={handleFileSelect}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />
              <input
                id="cantidad"
                placeholder="Cantidad del producto"
                onChange={(e) => setCantidad(e.target.value)}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <select
                id="categoria"
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              >
                <option value="Camisas">Camisas</option>
                <option value="Playera">Playera</option>
                <option value="Pantalon">Pantalon</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Bolsos">Bolsos</option>
              </select>

              <input
                id="descripcion"
                placeholder="Breve descripcion del producto"
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <input
                id="talla"
                placeholder="Talla del producto"
                onChange={(e) => setTalla(e.target.value)}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <SketchPicker
                color={color}
                onChangeComplete={(e) => setColor(e.hex)}
              />

              <div className="px-96 ml-48 py-2">
                <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProducto;
