import React, { useState, useEffect } from "react";
import InputBlog from "../../features/blog/component/lexical/InputBlog";
import toast, { Toaster } from "react-hot-toast";
import { useGetInterestList } from "../../features/interest/interestSlice";
import { useCreateBlog, useUpdateBlog } from "../../features/blog/blogSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { assignValue } from "./../../helpers/index";
import InputCover from "../../features/blog/component/InputCover";
import ListBlogUser from "../../features/blog/component/ListBlogsUser";

const AddBlog = () => {
  const blogSuccess = () =>
    toast.success("Blog created successfully!", {
      position: "top-center",
    });

  const blogError = () =>
    toast.error("Sorry. Error on creating Blog!", {
      position: "top-center",
    });

  const animatedComponents = makeAnimated();
  const [text, setText] = useState(null);
  const [cover, setCover] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [interest, setInterest] = useState([]);

  const [editData, setEditData] = useState({});

  const createBlog = useCreateBlog(["blog", "create"], undefined, undefined);
  const updateBlog = useUpdateBlog(["blog", "update"], editData?.id, undefined, undefined);
  const { data: interestList } = useGetInterestList(["interest", "all"], true);

  const handleSubmit = async (publish) => {
    if (!text && !blogTitle) {
      alert("Please enter a blog title and a blog text to continue");
      return;
    }

    let formData = new FormData();
    try {
      interest?.forEach((item) => {
        return formData.append("interests", item?.label);
      });
      formData.append("blogText", text);
      formData.append("blogTitle", blogTitle);
      if (cover[0] !== undefined) {
        formData.append("coverPicture", cover[0]);
      }

      formData.append("publish", publish);
      let result = "";
      if (Object.keys(editData).length !== 0) {
        // formData.append("id", editData?.id);
        result = await updateBlog.mutateAsync(formData);
      } else {
        result = await createBlog.mutateAsync(formData);
      }

      blogSuccess();
      setText(null);
      setCover([]);
      setBlogTitle(null);
      setInterest([]);
      window.location.href = "../../blogs/" + result?.data?.id;
    } catch (e) {
      console.log(e);
      blogError();
    }
  };

  const options = assignValue(interestList?.data);

  useEffect(() => {
    setBlogTitle(editData?.blogTitle);
    setInterest(assignValue(editData?.Interests));
  }, [editData]);

  return (
    <>
      <Toaster />
      <div className=" my-6 mx-2 lg:mx-0 bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="text-lg md:text-3xl font-semibold">Create New Blog</h4>
        <div className="lg:flex lg:justify-between">
          <div className="mt-5 lg:mt-10 w-[100%] lg:w-2/3 mr-2 ">
            <div className="my-4">
              <p className="text-lg font-semibold pb-3">Cover Picture</p>
              <InputCover editData={editData?.coverPicture} fn={setCover} />
            </div>
            <div className="">
              <label className="text-lg font-semibold">Title</label>
              <input
                type="text"
                name="blogTitle"
                className="mb-2 mt-2 w-full px-3 py-2 text-md text-black rounded-lg border border-gray-300"
                placeholder="Add a title to your blog"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
            <div className="my-2">
              <p className="text-lg font-semibold">Category</p>
              <Select
                placeholder={"Select the category..."}
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={options}
                isMulti
                name="interest"
                value={interest}
                onChange={(values) => {
                  setInterest(values);
                }}
              />
            </div>
            <label className="text-lg font-semibold">Blog Text</label>
            <div className="my-4 bg-white w-full py-5 rounded-lg overflow-y">
              <InputBlog fn={setText} editData={editData?.blogText} />
              {/* <InputBlog editData={editData?.blogText} fn={setText} /> */}
            </div>
            <div className="flex mt-4 justify-end mb-5 lg:mb-0">
              {Object.keys(editData).length !== 0 && (
                <button onClick={() => setEditData([])} className="mr-2 bg-white border border-gray-300 px-4 py-1 rounded-lg">
                  Cancel Edit
                </button>
              )}
              <button onClick={() => handleSubmit(false)} className="mr-2 bg-white border border-gray-300 px-4 py-1 rounded-lg">
                Save Draft
              </button>
              <button onClick={() => handleSubmit(true)} className="ml-2 px-4 py-1 bg-primary text-white rounded-lg">
                Publish
              </button>
            </div>
          </div>
          <div className="slate-align-center p-4 w-[100%] lg:w-1/3 lg:ml-2 rounded-xl border border-gray-200">
            <ListBlogUser setEditData={setEditData} textInput={text} editData={editData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
