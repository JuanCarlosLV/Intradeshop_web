import { VscSearch } from "react-icons/vsc";

function BarraBusqueda() {
  return (
    <>
      <div className=" mb-10 mt-8 ">
        <form>
          <div className="flex flex-row items-center">
            <VscSearch
              className="text-3xl  ml-[135px] mr-auto block absolute "
              color="#004643"
            />
            <input
              type="text"
              name="barrabusqueda"
              
              placeholder="Buscar tienda por nombre"
              className="px-14  text-[#004643] text-xl w-[1200px] h-[50px] rounded-2xl border-b-[6px]  border-[#004643] focus:border-[#004643] focus:outline-none focus:ring-1 focus:ring-[#004643] font-ralewayFont   ml-[120px]"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default BarraBusqueda;
