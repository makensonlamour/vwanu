/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
// import { ImageBlogContext } from "../../../../context/imageBlogContext";

// import Quill from "quill";
// import ImageResize from "quill-image-resize-module-react";

// ReactQuill.register("modules/imageResize", ImageResize);

const InputBlog = ({ fn, editData = "" }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(editData);
  }, [editData]);

  return (
    <>
      <EditorToolbar toolbarId={"t1"} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(value) => {
          setValue(value);
          fn(value);
        }}
        placeholder={"Write something awesome..."}
        modules={modules("t1")}
        formats={formats}
      />
    </>
    // <ReactQuill
    //   ref={quillRef}
    //   placeholder="Type to write a blog..."
    //   className="h-fit"
    //   theme="snow"
    //   value={value}
    //   modules={modules}
    //   onChange={(value) => {
    //     setValue(value);
    //     fn(value);
    //   }}
    // />
  );
};

InputBlog.propTypes = {
  fn: PropTypes.func,
  editData: PropTypes.string,
};

export default InputBlog;
