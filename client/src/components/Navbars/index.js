import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <>
      <div class="flex flex-row bg-blue-500 navbar mb-2 shadow-lg px-4 text-neutral-content">
        <div class="basis-1/5">
          <span className="text-lg font-bold">VWANU</span>
        </div>
        <div class="basis-1/2">
          <div className="form-control w-full ml-auto">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost w-full"
            />
          </div>
        </div>
        <div class="grow justify-end">
          {" "}
          <ul class="menu menu-horizontal flex-row justify-between">
            <li>
              <Link to="">
                <FaUserPlus size="24px" />
              </Link>
            </li>
            <li>
              <Link to="">
                <IoMdChatbubbles size="24px" />
              </Link>
            </li>
            <li>
              <Link to="">
                <IoNotificationsOutline size="24px" />
              </Link>
            </li>
          </ul>
          <div className="avatar online">
            <div className="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
