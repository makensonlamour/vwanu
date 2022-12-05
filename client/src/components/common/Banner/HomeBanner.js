import React, { useState, useEffect } from "react";

const HomeBanner = () => {
  const data = [
    {
      title: "Welcome to Vwanu",
      body: "Vwanu is a social media 100% haitian",
      src: "https://placeimg.com/820/360/any",
    },
    {
      title: "Build your community",
      body: "Build your community accross Vwanu for the best experience",
      src: "https://placeimg.com/820/360/nature",
    },
    {
      title: "Create your projects",
      body: "Vwanu is proud to help you with your community projects",
      src: "https://placeimg.com/820/360/tech",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const len = data?.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <>
      <div className="carousel">
        {data?.length > 0 &&
          data?.map((slide, idx) => {
            return (
              <div
                key={idx}
                id={`slide${idx + 1}`}
                style={{ backgroundImage: `url(${slide?.src})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                className={`${
                  activeIndex === idx ? " " : "hidden"
                } w-full h-[25vh] lg:h-[40vh] bg-white lg:max-h-[320px] rounded-lg lg:rounded-xl carousel-item`}
              >
                <div className="bg-black/40 h-full w-full rounded-xl p-0 flex items-center">
                  {/* <div className="cursor-pointer flex justify-end items-center rounded-tr-xl p-2"> */}
                  {/* <p className="flex bg-white hover:bg-primary hover:text-white rounded-full justify-center text-lg w-6 h-6 items-center align-middle text-center">
                      x
                    </p> */}
                  {/* </div> */}
                  <div className="w-full">
                    <p className="w-full text-center font-bold text-3xl pb-6 text-white align-middle">{slide?.title}</p>
                    <p className="w-full text-center text-lg font-light text-white">{slide?.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomeBanner;
