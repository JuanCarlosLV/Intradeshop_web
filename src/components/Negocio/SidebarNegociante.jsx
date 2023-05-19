
function SidebarNegociante() {
  return (
    <>
      <div className="">
          <aside
            id="sidebar-multi-level-sidebar"
            className="absolute top left-0 z-40 w-64 h-screen"
            aria-label="Sidebar"
          >
            <div class="h-full px-3 py-4 overflow-y-auto bg-[#D1AC00] dark:bg-gray-800">
              <ul class="space-y-10 ">
                <li>
                  <a
                    href="mis-pedidos"
                    className="flex items-center p-10 font-ralewayFont font-semibold text-2xl text-black min-w-max hover:bg-white -ml-5 -mt-5 -mr-20 hover:text-[#004643]"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">Mis pedidos</span>
                  </a>
                </li>

                <li>
                  <a
                    href="mis-productos"
                    className="flex items-center p-10 font-ralewayFont font-semibold text-2xl text-black min-w-max hover:bg-white -ml-5 -mt-5 -mr-20 hover:text-[#004643]"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Mis productos
                    </span>
                  </a>
                </li>
                <li >
                  <a
                    href="mis-ventas"
                    className="flex items-center p-10 font-ralewayFont font-semibold text-2xl text-black min-w-max hover:bg-white -ml-5 -mt-5 -mr-20 hover:text-[#004643]"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black hover:text-[#004643] "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Mis ventas
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
      </div>
    </>
  );
}

export default SidebarNegociante;
