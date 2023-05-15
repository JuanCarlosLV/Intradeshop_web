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
    navigateMisProductos("/mis-productos");
    subirImagen(formValues.imagen);
  };
  const handleImagenChange = (evt) => {
    setFormValues({
      ...formValues,
      imagen: evt.target.files[0],
    });
  };
  const handleColorChange = (color) => {
    setFormValues({
      ...formValues,
      color: color.hex,
    });
  };
  const handleShowPicker = () => {
    setStatePicker(true);
  };
  const handleClosePicker = () => {
    setStatePicker(false);
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

              { (formValues.categoria === "Playeras" || formValues.categoria === "Blusas" || formValues.categoria === "Abrigos" || formValues.categoria === "Vestidos") &&(
                <div className="space-x-4">
                  <input type="radio" id="talla" name="talla" value="CH" onChange={handleInputChange}/>CH
                  <input type="radio" id="talla" name="talla" value="M" onChange={handleInputChange}/>M
                  <input type="radio" id="talla" name="talla" value="G" onChange={handleInputChange}/>G
                  <input type="radio" id="talla" name="talla" value="SM" onChange={handleInputChange}/>SM
                  <input type="radio" id="talla" name="talla" value="MG" onChange={handleInputChange}/>MG
                  <input type="radio" id="talla" name="talla" value="UNITALLA" onChange={handleInputChange}/>UNITALLA
                </div>
              )}
              { (formValues.categoria === "Pantalones" || formValues.categoria === "Shorts") && (
                <div className="space-x-4">
                  <input type="radio" id="talla" name="talla" value="XS" onChange={handleInputChange}/>XS
                  <input type="radio" id="talla" name="talla" value="S" onChange={handleInputChange}/>S
                  <input type="radio" id="talla" name="talla" value="M" onChange={handleInputChange}/>M
                  <input type="radio" id="talla" name="talla" value="L" onChange={handleInputChange}/>L
                  <input type="radio" id="talla" name="talla" value="XL" onChange={handleInputChange}/>XL
                  <input type="radio" id="talla" name="talla" value="2XL" onChange={handleInputChange}/>2XL
                  <input type="radio" id="talla" name="talla" value="3XL" onChange={handleInputChange}/>3XL
                  <input type="radio" id="talla" name="talla" value="4XL" onChange={handleInputChange}/>4XL
                </div>
              )}
              { (formValues.categoria === "Zapatos") &&(
                <div className="space-x-1">
                   <input type="radio" id="talla" name="talla" value="9" onChange={handleInputChange}/>9
                   <input type="radio" id="talla" name="talla" value="10" onChange={handleInputChange}/>10
                   <input type="radio" id="talla" name="talla" value="11" onChange={handleInputChange}/>11
                   <input type="radio" id="talla" name="talla" value="12" onChange={handleInputChange}/>12
                   <input type="radio" id="talla" name="talla" value="12.5" onChange={handleInputChange}/>12.5
                   <input type="radio" id="talla" name="talla" value="13" onChange={handleInputChange}/>13
                   <input type="radio" id="talla" name="talla" value="14" onChange={handleInputChange}/>14
                   <input type="radio" id="talla" name="talla" value="15" onChange={handleInputChange}/>15
                   <input type="radio" id="talla" name="talla" value="15.5" onChange={handleInputChange}/>15.5
                   <input type="radio" id="talla" name="talla" value="16" onChange={handleInputChange}/>16
                   <input type="radio" id="talla" name="talla" value="17" onChange={handleInputChange}/>17
                   <input type="radio" id="talla" name="talla" value="18" onChange={handleInputChange}/>18
                   <input type="radio" id="talla" name="talla" value="18.5" onChange={handleInputChange}/>18.5
                   <input type="radio" id="talla" name="talla" value="19" onChange={handleInputChange}/>19
                   <input type="radio" id="talla" name="talla" value="20" onChange={handleInputChange}/>20
                   <input type="radio" id="talla" name="talla" value="20.5" onChange={handleInputChange}/>20.5
                   <input type="radio" id="talla" name="talla" value="21" onChange={handleInputChange}/>21
                   <input type="radio" id="talla" name="talla" value="21.5" onChange={handleInputChange}/>21.5
                   <input type="radio" id="talla" name="talla" value="22" onChange={handleInputChange}/>22
                   <input type="radio" id="talla" name="talla" value="23" onChange={handleInputChange}/>23
                   <input type="radio" id="talla" name="talla" value="24" onChange={handleInputChange}/>24
                   <input type="radio" id="talla" name="talla" value="25" onChange={handleInputChange}/>25
                   <input type="radio" id="talla" name="talla" value="26" onChange={handleInputChange}/>26
                   <input type="radio" id="talla" name="talla" value="27" onChange={handleInputChange}/>27
                   <input type="radio" id="talla" name="talla" value="27.5" onChange={handleInputChange}/>27.5
                   <input type="radio" id="talla" name="talla" value="28" onChange={handleInputChange}/>28
                   <input type="radio" id="talla" name="talla" value="28.5" onChange={handleInputChange}/>28.5
                   <input type="radio" id="talla" name="talla" value="29" onChange={handleInputChange}/>29
                   <input type="radio" id="talla" name="talla" value="29.5" onChange={handleInputChange}/>29.5
                   <input type="radio" id="talla" name="talla" value="30" onChange={handleInputChange}/>30
                   <input type="radio" id="talla" name="talla" value="30.5" onChange={handleInputChange}/>30.5
                   <input type="radio" id="talla" name="talla" value="31" onChange={handleInputChange}/>31
                   <input type="radio" id="talla" name="talla" value="31.5" onChange={handleInputChange}/>31.5
                   <input type="radio" id="talla" name="talla" value="32" onChange={handleInputChange}/>32
                   <input type="radio" id="talla" name="talla" value="32.5" onChange={handleInputChange}/>32.5
                   <input type="radio" id="talla" name="talla" value="33" onChange={handleInputChange}/>33
                   <input type="radio" id="talla" name="talla" value="33.5" onChange={handleInputChange}/>33.5
                   <input type="radio" id="talla" name="talla" value="34" onChange={handleInputChange}/>34
                </div>
              )}
              {(formValues.categoria === "RopaInterior") && (
                <div className="space-x-4">
                  <input type="radio" id="talla" name="talla" value="A" onChange={handleInputChange}/>Copa A
                  <input type="radio" id="talla" name="talla" value="B" onChange={handleInputChange}/>Copa B
                  <input type="radio" id="talla" name="talla" value="C" onChange={handleInputChange}/>Copa C
                  <input type="radio" id="talla" name="talla" value="D" onChange={handleInputChange}/>Copa D
                  <input type="radio" id="talla" name="talla" value="D" onChange={handleInputChange}/>Copa D
                  <input type="radio" id="talla" name="talla" value="D" onChange={handleInputChange}/>Copa D
                  <input type="radio" id="talla" name="talla" value="XS" onChange={handleInputChange}/>
                  <input type="radio" id="talla" name="talla" value="S" onChange={handleInputChange}/>S
                  <input type="radio" id="talla" name="talla" value="M" onChange={handleInputChange}/>M
                  <input type="radio" id="talla" name="talla" value="L" onChange={handleInputChange}/>L 
                  <input type="radio" id="talla" name="talla" value="XL" onChange={handleInputChange}/>XL
                  <input type="radio" id="talla" name="talla" value="XXL" onChange={handleInputChange}/>XXL
                  <input type="radio" id="talla" name="talla" value="XXXL" onChange={handleInputChange}/>XXXL
                </div>
              )}
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
