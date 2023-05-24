import {useEffect} from 'react'

function ModalAviso(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.cerrarModal();
    }, 1000);

    return () => clearTimeout(timer);
  }, [props]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <section>
          <div
            className={`bg-${props.color} font-mono font-medium rounded-[5px] flex items-center justify-center h-[40px] w-[300px] ml-10`}
          >
            <p className="text-white">{props.mensaje}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default ModalAviso;
