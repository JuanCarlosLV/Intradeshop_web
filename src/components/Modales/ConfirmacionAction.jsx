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
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-[#D1AC00] px-4 pt-5 pb-4 sm:p-20 sm:pb-10">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-5 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-black-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6l-6 12h12L12 6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl leading-6 font-bold font-ralewayFont text-gray-900">
                      {titulo}
                    </h3>
                    <div className="mt-5 text-xl font-medium font-ralewayFont">{cuerpo}</div>
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
export default ConfirmacionAction;
