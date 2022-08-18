import React from "react";
import { BsSearch } from "react-icons/bs";
import ViewCategory from "../../components/Forum/ViewCategory";

const Forum = () => {
  const categories = [
    {
      id: 1,
      coverPicture: "https://files.hardwicke.co.uk/wp-content/uploads/2018/08/09112906/shutterstock_674581165.jpg",
      name: "Architecture",
      description:
        "Every man's work, whether it be literature, or music or pictures or architecture or anything else, is always a portrait of himself.",
      date: "2 years, 10 months ago",
    },
    {
      id: 2,
      coverPicture: "https://pbs.twimg.com/media/D70GvKCX4AEcbAt?format=jpg&name=4096x4096",
      name: "Mobile Application",
      description: "A mobile application also referred to as a mobile app or simply an app is a computer program",
      date: "2 years, 10 months ago",
    },
    {
      id: 3,
      coverPicture: "https://pbs.twimg.com/media/Dwh8vcpWwAAuxCD?format=jpg&name=4096x4096",
      name: "Ask Anything Random Here",
      description: "Hey everyone! This forum will be focused on community engagement by getting or providing",
      date: "2 years, 10 months ago",
    },
    {
      id: 4,
      coverPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0CWQT0mgk0HqzUIjFQfxKqtco5IJiB_waVg&usqp=CAU",
      name: "Business Meet",
      description: "In essence, a business meeting is a gathering of two or more people to discuss ideas, goals and objectives",
      date: "2 years, 10 months ago",
    },
    {
      id: 5,
      coverPicture: "https://www.fcmtravel.com/sites/default/files/styles/large/public/Flight-flying-sunset_0.jpg?itok=Tl3rYwR-",
      name: "Aviation Leaders",
      description: "",
      date: "2 years, 10 months ago",
    },
    {
      id: 6,
      coverPicture: "https://mkb-amsterdam.nl/wp-content/uploads/2022/05/diggity-marketing-SB0WARG16HI-unsplash.jpg",
      name: "Digital Marketing",
      description: "Digital marketing is the marketing of products or services using digital technologies, mainly on the",
      date: "2 years, 10 months ago",
    },
  ];

  return (
    <>
      <div className="w-full">
        <div className="w-full bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78]">
          <div className="text-white py-20">
            <p className="text-3xl text-center pb-6">Community Forums</p>
            <div className="flex justify-center">
              <p className="mb-2 text-center pb-6 text-lg w-[30%] font-light">
                Find answers, ask questions, and connect with our community around the world.
              </p>
            </div>
            <div className="flex justify-center">
              <label className="relative text-white focus-within:text-white block">
                <BsSearch size={"24px"} className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  className="form-input w-[40rem] h-14 border-[0.20px] appearance-none bg-white/[.20] border-white pl-12 text-white placeholder:text-white placeholder:font-light focus:outline-none rounded-lg"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="py-5">
          <ViewCategory data={categories} />
        </div>
      </div>
    </>
  );
};

export default Forum;
