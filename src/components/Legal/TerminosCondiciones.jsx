import { useNavigate, NavLink } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function TerminosCondiciones() {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="flex flex-col">
        <section className="flex flex-row mt-[40px] justify-start items-center">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill className="text-4xl ml-10 " color="D1AC00" />
          </NavLink>

          <h2 className="font-ralewayFont font-bold text-[45px] ml-[250px]">
            Términos y Condiciones de Intradeshop
          </h2>
        </section>

        <article className="flex items-center justify-start text-justify ml-[100px] mr-[100px] mt-4">
          <p className="font-ralewayFont text-[18px] ">Bienvenido/a a Intradeshop. Antes de utilizar nuestra plataforma de compra y venta en línea, te pedimos que leas detenidamente los siguientes Términos y Condiciones. Estos términos establecen los derechos y responsabilidades tanto de los usuarios como de Intradeshop. Al acceder o utilizar nuestra plataforma, aceptas estar sujeto/a a estos términos y condiciones.</p>
        </article>
        <section className=" grid w-[1350px] ml-[100px]  mt-8 ">
          <article class="py-5">
            <details class="group border-b-2 border-[#D1AC00]">
              <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                <span className="text-[23px] ">Plataforma de Compra y Venta</span>
                <span class="transition group-open:rotate-180">
                  <IoIosArrowDropdownCircle
                    color="D1AC00"
                    className="text-[35px]"
                  />
                </span>
              </summary>
              <div className="font-ralewayFont bg-[#FAF4D3] flex justify-center text-justify mt-3 ">
                <p className="text-[15px] px-3 py-2 ">Intradeshop es una plataforma en línea que facilita la conexión entre compradores y vendedores. Actuamos como intermediarios y proveemos un espacio virtual para que los usuarios realicen transacciones comerciales. No somos responsables de las compras, ventas o intercambios de productos entre los usuarios. La responsabilidad y el riesgo relacionados con dichas transacciones recae únicamente en los usuarios involucrados.</p>
              </div>
            </details>
          </article>

          <article class="py-5">
            <details class="group border-b-2 border-[#D1AC00]">
              <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                <span className="text-[23px] ">Registro y cuenta de usuario</span>
                <span class="transition group-open:rotate-180">
                  <IoIosArrowDropdownCircle
                    color="D1AC00"
                    className="text-[35px]"
                  />
                </span>
              </summary>
              <div className="font-ralewayFont bg-[#FAF4D3] flex justify-center text-justify mt-3 ">
                <p className="text-[15px] px-3 py-2 ">Para utilizar Intradeshop, debes crear una cuenta personal. Al registrarte, garantizas que toda la información proporcionada es precisa, completa y actualizada. Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad que ocurra en tu cuenta.</p>
              </div>
            </details>
          </article>

          <article class="py-5">
            <details class="group border-b-2 border-[#D1AC00]">
              <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                <span className="text-[23px] ">Contenido de los Usuarios</span>
                <span class="transition group-open:rotate-180">
                  <IoIosArrowDropdownCircle
                    color="D1AC00"
                    className="text-[35px]"
                  />
                </span>
              </summary>
              <div className="font-ralewayFont bg-[#FAF4D3] flex justify-center text-justify mt-3 ">
                <p className="text-[15px] px-3 py-2 ">Los usuarios son los únicos responsables de la información y contenido que publiquen en Intradeshop. Aceptas no publicar material difamatorio, obsceno, ilegal, que viole derechos de terceros o que sea perjudicial para Intradeshop o para otros usuarios. Intradeshop se reserva el derecho de eliminar o editar cualquier contenido que infrinja estos términos.</p>
              </div>
            </details>
          </article>

          <article class="py-5">
            <details class="group border-b-2 border-[#D1AC00]">
              <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                <span className="text-[23px] ">Limitación de responsabilidad</span>
                <span class="transition group-open:rotate-180">
                  <IoIosArrowDropdownCircle
                    color="D1AC00"
                    className="text-[35px]"
                  />
                </span>
              </summary>
              <div className="font-ralewayFont bg-[#FAF4D3] flex justify-center text-justify mt-3 ">
                <p className="text-[15px] px-3 py-2 ">Intradeshop no se hace responsable de los productos o servicios ofrecidos por los vendedores ni de la conducta de los usuarios en la plataforma. No garantizamos la veracidad, calidad, seguridad o legalidad de los productos anunciados. Los usuarios asumen el riesgo y la responsabilidad de sus transacciones. Intradeshop no será responsable por cualquier pérdida, daño o perjuicio derivado de las transacciones realizadas a través de nuestra plataforma.</p>
              </div>
            </details>
          </article>

          <article class="py-5">
            <details class="group border-b-2 border-[#D1AC00]">
              <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                <span className="text-[23px] ">Fraude y Actividades Ilícitas</span>
                <span class="transition group-open:rotate-180">
                  <IoIosArrowDropdownCircle
                    color="D1AC00"
                    className="text-[35px]"
                  />
                </span>
              </summary>
              <div className="font-ralewayFont bg-[#FAF4D3] flex justify-center text-justify mt-3 ">
                <p className="text-[15px] px-3 py-2 ">Si se sospecha o se detecta un fraude o actividad ilícita en relación con Intradeshop, nos reservamos el derecho de tomar las medidas necesarias para proteger a nuestros usuarios y a la integridad de la plataforma. Nos deslindamos de cualquier responsabilidad derivada de dichas actividades y cooperaremos con las autoridades competentes en su investigación y enjuiciamiento.</p>
              </div>
            </details>
          </article>

          
        </section>
      </main>
    </>
  );
}

export default TerminosCondiciones;
