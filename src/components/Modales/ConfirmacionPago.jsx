import { GoCheck } from "react-icons/go";

function ConfirmacionPago({ mostrarModal, titulo, cuerpo, cerrar }) {
  return (
    <>
      {mostrarModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Esto es para que se ponga oscuro el fondo y evite que se quite el modal */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 opacity-75"
              aria-hidden="true"
            ></div>
            {/* esto es para posicionar el modal en medio de la pantalla */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-black sm:p-10 sm:pb-10 flex flex-col">
                <div className=" flex flex-row justify-between ">
                  <div>
                    <h3 className="text-3xl leading-6 font-bold font-ralewayFont text-white">
                      {titulo}
                    </h3>
                    <div className="mt-5 text-2xl font-medium font-ralewayFont text-left text-white">
                      {cuerpo}
                    </div>
                  </div>
                  <div className="text-[70px] mr-[30px] mt-[30px] ">
                    <GoCheck color="green" />
                  </div>
                </div>

                <button className="bg-[#004643] font-ralewayFont font-semibold text-white h-[50px] w-[150px] text-center mt-5 ml-auto -mr-2 rounded-[5px] " onClick={cerrar}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ConfirmacionPago;
