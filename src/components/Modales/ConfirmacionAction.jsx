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
            <div>
              <div>
                <div>
                  <h3>{titulo}</h3>
                </div>
                <div>
                  <button onClick={confirmar}>Confirmar</button>
                  <button onClick={cancelar}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ConfirmacionAction;
