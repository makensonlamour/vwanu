import Navbar from "../Navbars/index";
import SidebarLeft from "../Sidebars/Left/index";
import SidebarRight from "../Sidebars/Right/index";
import ProtectedRoutes from "../../layouts/ProtectedRoutes/index";
import Views from "../../layouts/Views";

const Container = () => {
  return (
    <>
      <Navbar />
      <div class="flex flex-row">
        <div class="basis-1/5 mr-5">
          <SidebarLeft />
        </div>
        <div class="basis-3/5 drawer drawer-mobile h-auto mr-5 px-10">
          <Views />
        </div>
        <div class="basis-1/5 mr-5">
          {" "}
          <div className="">
            <SidebarRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
