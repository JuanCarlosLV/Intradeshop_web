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
      <div className="fixed inset-0 flex items-center justify-center ">
        <section className='flex flex-row'>
          
          <div
            className={`bg-${props.color} font-mono font-medium rounded-[5px] flex items-center justify-center h-auto w-1/2 ml-10 p-2`}
          >
            <p className="text-white break-words">{props.mensaje}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default ModalAviso;
