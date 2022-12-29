import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

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
  );
};

InputBlog.propTypes = {
  fn: PropTypes.func,
  editData: PropTypes.string,
};

export default InputBlog;
