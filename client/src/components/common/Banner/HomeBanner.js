import React from "react";

const HomeBanner = () => {
  const data = {
    title: "Welcome to Vwanu",
    body: "Vwanu is a social media 100% haitian",
    src: "https://www.fillmurray.com/820/360",
  };
  return (
    <div
      style={{ backgroundImage: `url(${data?.src})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className={` w-full h-[25vh] lg:h-[40vh] bg-white lg:max-h-[320px] rounded-lg lg:rounded-xl`}
    >
      <div className="bg-black/40 h-full w-full rounded-xl p-0 flex-none items-center flex-wrap">
        <div className="cursor-pointer flex justify-end items-center rounded-tr-xl p-2">
          <p className="flex bg-white hover:bg-primary hover:text-white rounded-full justify-center text-lg w-6 h-6 items-center align-middle text-center">
            x
          </p>
        </div>
        <p className="text-center font-bold text-3xl pb-6 text-white">{data?.title}</p>
        <p className="text-center text-lg font-light text-white">{data?.body}</p>
      </div>
    </div>
  );
};

export default HomeBanner;
