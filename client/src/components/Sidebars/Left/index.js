//core components
import { NavLink } from "react-router-dom";
import { FcNews, FcGallery, FcFolder } from "react-icons/fc";

//data
import { ItemSidebarLeft } from "../../../data/ItemSidebarLeft";

const SidebarLeft = () => {
  let activeStyle = {
    textDecoration: "none",
  };
  return (
    <>
      <div className="h-screen fixed overflow-scroll">
        <ul class="menu w-64 p-3 border bg-base-100 box h-auto">
          {ItemSidebarLeft.map((item, index) => {
            return (
              <>
                <li
                  index={index}
                  className="menu-title text-base-500 font-bold py-2"
                >
                  {item.menuTitle}
                </li>
                {item.menuItems.map((it, idx) => {
                  return (
                    <li index={idx}>
                      <NavLink
                        to={it.link}
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        {it.icon}
                        {it.title}
                      </NavLink>
                    </li>
                  );
                })}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SidebarLeft;
