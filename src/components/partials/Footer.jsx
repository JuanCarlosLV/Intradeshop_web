import React from "react";
import { Link } from "react-router-dom";
/*BsFacebook
BsInstagram
SiGmail */
function Footer() {
  return (
    <>
      <section className="bg-[#004643] w-full h-[200px]  flex flex-row  items-center justify-between">
        <div className="ml-3">
          <img
            src="/src/images/logoIntradeshop.png"
            alt="logo de intradeshop"
            title="intradeshop"
            className="h-[150px] w-[150px]"
          />
        </div>

        <article className="font-ralewayFont font-bold">
          <h2 className="text-[40px] text-white">INTRADESHOP</h2>
        </article>
        <article className="font-ralewayFont flex flex-col">
          <h2 className="text-[30px] text-white">Acerca de Nosotros</h2>
          <Link>Nosotros</Link>
          <Link>Terminos y condiciones</Link>
          <Link>Privacidad</Link>
        </article>
        <article className="font-ralewayFont flex flex-col">
          <h2 className="text-[30px] text-white">Redes Sociales</h2>
        </article>
      </section>
    </>
  );
}

export default Footer;
