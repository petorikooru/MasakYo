import { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar({ menuData }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-neutral-900/80 backdrop-blur-md text-white p-4 rounded-2xl">
      <div className="flex items-center bg-neutral-700 rounded-full px-3 py-2 mb-4">
        <Search size={18} className="text-gray-300" />
        <input
          type="text"
          placeholder="Cari resep"
          className="bg-transparent w-full px-2 text-sm text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {menuData.map((menu, idx) => (
          <div key={idx}>
            {menu.submenu ? (
              <button
                onClick={() => toggleMenu(menu.title)}
                className={`flex justify-between items-center w-full text-sm font-semibold ${
                  openMenu === menu.title ? "text-red-400" : "text-gray-200"
                }`}
              >
                {menu.title}
                {openMenu === menu.title ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            ) : (
              <p className="text-sm font-semibold text-gray-200 hover:text-red-400 cursor-pointer">
                {menu.title}
              </p>
            )}

            {openMenu === menu.title && menu.submenu && (
              <ul className="pl-5 mt-2 space-y-1 text-gray-300 text-sm">
                {menu.submenu.map((item, subIdx) => (
                  <li
                    key={subIdx}
                    className={`${item.active ? "text-red-400 font-semibold" : ""}`}
                  >
                    • {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
