import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

const InputBlog = ({ fn, editData = "" }) => {
  const [value, setValue] = useState("");

  const toolbarOptions = {
    container: [
      [
        { header: [1, 2, 3, 4, 5, 6, false] },
        "bold",
        "italic",
        "underline",
        "strike",
        { color: [] },
        { background: [] },
        "emoji",
        "blockquote",
        "code-block",
      ], // toggled buttons
      [{ align: [] }, { indent: "-1" }, { indent: "+1" }], // superscript/subscript
      [{ list: "ordered" }, { list: "bullet" }], // outdent/indent
      ["image", "video"],
      ["clean"], // remove formatting button
    ],
  };

  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    setValue(editData);
  }, [editData]);

  return (
    <ReactQuill
      placeholder="Type to write a blog..."
      className="h-fit"
      theme="snow"
      value={value}
      modules={modules}
      onChange={(value) => {
        setValue(value);
        fn(value);
      }}
    />
  );
};

InputBlog.propTypes = {
  fn: PropTypes.func,
  editData: PropTypes.string,
};

export default InputBlog;
