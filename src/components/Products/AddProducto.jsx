import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";
import { agregarProducto, subirImagen } from "../../services/Producto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function AddProducto() {

  const navigateMisProducts = useNavigate();

  const [formValues, setFormValues] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    categoria: "",
    descripcion: "",
    color: "",
    talla: "",
    imagen: [],
  });

  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    agregarProducto(
      formValues.nombre,
      formValues.precio,
      formValues.cantidad,
      formValues.categoria,
      formValues.descripcion,
      formValues.color,
      formValues.talla
    );
    subirImagen(formValues.imagen);
    navigateMisProducts("/mis-productos");
  };

  const handleImagenChange = (evt) => {
    setFormValues({
      ...formValues,
      imagen: evt.target.files[0],
    });
  };
  const handleColorChange = (color) =>{
    setFormValues({
      ...formValues,
      color: color.hex
    })
  }
  
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
                name="nombre"
                placeholder="Nombre del producto"
                value={formValues.nombre}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />
              <input
                id="precio"
                name="precio"
                placeholder="Precio del producto"
                value={formValues.precio}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleImagenChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />
              <input
                id="cantidad"
                name="cantidad"
                placeholder="Cantidad del producto"
                value={formValues.cantidad}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <select
                id="categoria"
                name="categoria"
                value={formValues.categoria}
                onChange={handleInputChange}
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
                name="descripcion"
                placeholder="Breve descripcion del producto"
                value={formValues.descripcion}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <input
                id="talla"
                name="talla"
                placeholder="Talla del producto"
                value={formValues.talla}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <SketchPicker
                id="color"
                name="color"
                color={formValues.color}
                onChangeComplete={handleColorChange}
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
