import { IoIosWarning } from "react-icons/io";

function ConfirmacionAction({
  mostrarModal,
  titulo,
  cuerpo,
  cancelar,
  confirmar,
}) {
  return (
    <>
      {mostrarModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Esto es para que se ponga oscuro el fondo y evite que se quite el modal */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 opacity-75"
              aria-hidden="true"
            >     
            </div>
            {/* esto es para posicionar el modal en medio de la pantalla */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
            </span>

            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-[#D1AC00] px-4 pt-5 pb-4 sm:p-20 sm:pb-10">
                <div className=" flex flex-row justify-between ">
                  <div className="text-[70px] mr-[30px] -ml-10">
                    <IoIosWarning color="white" />
                  </div>
                  <div>
                    <h3 className="text-3xl leading-6 font-bold font-ralewayFont text-gray-900">
                      {titulo}
                    </h3>
                    <div className="mt-5 text-2xl font-medium font-ralewayFont text-left">
                      {cuerpo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#D1AC00] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmar}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#004643] text-base font-bold font-ralewayFont text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004643] sm:ml-4 sm:w-auto sm:text-md"
                >
                  Aceptar
                </button>
                <button
                  onClick={cancelar}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-bold font-ralewayFont text-[#004643] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-4 sm:w-auto sm:text-md h-10"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ConfirmacionEliminacion;
