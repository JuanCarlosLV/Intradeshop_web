import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChromePicker } from "react-color";
import { agregarProducto, subirImagen } from "../../services/Producto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function AddProducto() {
  const navigateMisProductos = useNavigate();
  const [statePicker, setStatePicker] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    precio: "",
    cantidad: [],
    categoria: "Playeras",
    descripcion: "",
    color: "",
    talla: [],
    imagen: [],
  });
  const tallasCategoria = {
    Playeras: ["CH", "M", "G", "SM", "MG", "UNITALLA"],
    Blusas: ["CH", "M", "G", "SM", "MG", "UNITALLA"],
    Abrigos: ["CH", "M", "G", "SM", "MG", "UNITALLA"],
    Vestidos: ["CH", "M", "G", "SM", "MG", "UNITALLA"],
    Pantalones: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    Shorts: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    Accesorios: ["UNITALLA"],
    Zapatos: ["9", "10", "11", "12", "12.5", "13", "14", "15", "16", "17", "18", "18.5", "19", "20", "20.5", "21", "21.5", "22", "23", "24", "25", "26", "27", "27.5", "28", "28.5", "29", "29.5", "30", "30.5", "31", "31.5", "32", "32.5", "33", "33.5", "34",],
    RopaInterior: ["CopaA", "CopaB", "CopaC", "CopaD", "XS", "S", "M", "L", "XL", "XXL", "XXXL",],
  };

  const handleShowPicker = () => {
    setStatePicker(true);
  };
  const handleClosePicker = () => {
    setStatePicker(false);
  };
  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await agregarProducto(
      formValues.nombre,
      formValues.precio,
      formValues.cantidad,
      formValues.categoria,
      formValues.descripcion,
      formValues.color,
      formValues.talla
    );
    navigateMisProductos("/mis-productos");
    subirImagen(formValues.imagen);
  };
  const handleImagenChange = (evt) => {
    const files = Array.from(evt.target.files).slice(0,5);
    setFormValues((prevValues) => ({
      ...prevValues,
      imagen: prevValues.imagen.concat(files),
    }));
  };
  const handleColorChange = (color) => {
    setFormValues({
      ...formValues,
      color: color.hex,
    });
  };
  const handleTallaChange = (evt) => {
    const { value, checked } = evt.target;
    setFormValues((prevValues) => {
      if (checked) {
        return {
          ...prevValues,
          talla: [...prevValues.talla, value],
          cantidad: [...prevValues.cantidad, 0],
        };
      } else {
        const index = prevValues.talla.indexOf(value);
        const newTallas = [...prevValues.talla];
        newTallas.splice(index, 1);
        const newCantidades = [...prevValues.cantidad];
        newCantidades.splice(index, 1);
        return {
          ...prevValues,
          talla: newTallas,
          cantidad: newCantidades,
        };
      }
    })
  }
  const handleCantidadChange = (index, evt) => {
    const { value } = evt.target;
    setFormValues((prevValues) => {
      const newCantidad = [...prevValues.cantidad];
      newCantidad[index] = Number(value);
      return {
        ...prevValues,
        cantidad: newCantidad,
      }
    })
  }
  return (
    <>
      <div className="">
        <div className="flex justify-between my-4">
          <a href="/mis-productos">
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
                multiple
                onChange={handleImagenChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <select
                id="categoria"
                name="categoria"
                value={formValues.categoria}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              >
                <option value="Playeras">Playeras</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Abrigos">Abrigos</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Vestidos">Vestidos</option>
                <option value="Blusas">Blusas</option>
                <option value="Accesorios">Accesorios</option>
                <option value="RopaInterior">Ropa interior</option>
                <option value="Shorts">Shorts</option>
              </select>
              <div className="flex flex-wrap -m-0.5">
                {tallasCategoria[formValues.categoria].map((talla,index) => (
                  <div key={talla} className="w-1/4 p-1">
                    <input
                      type="checkbox"
                      id={talla}
                      name={talla}
                      value={talla}
                      checked={formValues.talla.includes(talla)}
                      onChange={handleTallaChange}
                    />
                    <label htmlFor={talla}>{talla}</label>
                    {formValues.talla.includes(talla) && (
                      <input type="number" name="cantidad" placeholder={`Cantidad de ${talla}`} value={formValues.cantidad[index]} onChange={(evt) => handleCantidadChange(index, evt)} />
                    )}
                  </div>
                ))}
              </div>

              <input
                id="descripcion"
                name="descripcion"
                placeholder="Breve descripcion del producto"
                value={formValues.descripcion}
                onChange={handleInputChange}
                className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
              />

              <div className="py-2 m-1">
                <span
                  className="rounded-md border bg-[#004643] py-3 px-4 text-base font-medium text-white outline-none focus:border-[#004643] focus:ring-2 focus:ring-[#004643]  hover:bg-black"
                  onMouseEnter={handleShowPicker}
                  onClick={handleClosePicker}
                >
                  Color
                </span>
                {statePicker && (
                  <ChromePicker
                    id="color"
                    name="color"
                    color={formValues.color}
                    onChangeComplete={handleColorChange}
                    className="m-8"
                  />
                )}
              </div>
              <div className="px-70 py-2">
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
