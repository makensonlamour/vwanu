import SidebarLeft from "../Sidebars/Left/index";
import SidebarRight from "../Sidebars/Right/index";

const Container = () => {
  return (
    <>
      <div class="flex flex-row">
        <div class="basis-1/5 mr-5">
          <SidebarLeft />
        </div>
        <div class="basis-3/5 drawer drawer-mobile h-auto mr-5 px-10">
          <div class="text-center">Main center</div>
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
