import { NavLink } from "react-router-dom";
import { HiBuildingStorefront } from "react-icons/hi2";



function SidebarAdmin() {
  return (
    <>
      <div className="bg-black ">
          <aside
            id="sidebar-multi-level-sidebar"
            className="top-0 left-0 z-40 w-60 h-screen"
            aria-label="Sidebar"
          >
            <div class="h-full px-3 py-4 overflow-y-auto bg-[#D1AC00] dark:bg-gray-800">
              <ul class="space-y-10 ">
                <li>
                  <NavLink
                    to="tiendas"
                    className="flex items-center p-10 font-ralewayFont font-semibold text-2xl text-black min-w-max hover:bg-white -ml-5 -mt-5 -mr-20 hover:text-[#004643]"
                  >
                   <HiBuildingStorefront/>
                    <span className="ml-3">Tiendas</span>
                  </NavLink>
                </li>

              </ul>
            </div>
          </aside>
      </div>
    </>
  );
}

export default SidebarAdmin;
