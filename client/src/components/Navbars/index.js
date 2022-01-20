const Navbar = () => {
  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-blue-500 text-neutral-content">
        <div className="flex-1 hidden px-2 mx-2 lg:flex">
          <span className="text-lg font-bold">VWANU</span>
        </div>
        <div className="flex-1 lg:flex-none">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>
        <div className="flex-none"></div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-none">
          <div className="avatar">
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
