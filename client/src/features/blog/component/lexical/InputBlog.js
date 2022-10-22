/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import Quill from "quill";
// import ImageResize from "quill-image-resize-module-react";

// ReactQuill.register("modules/imageResize", ImageResize);

const InputBlog = ({ fn, editData = "" }) => {
  const [value, setValue] = useState("");
  const quillRef = useRef(null);

  const imageHandler = () => {
    const quill = quillRef.current?.getEditor();
    let range = quill.getSelection();
    let value = prompt("What is the image URL");
    if (value) {
      quill.insertEmbed(range.index, "image", value);
    }
  };

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
      ["link", "image", "video"],
      ["clean"], // remove formatting button
    ],
  };

  const modules = {
    toolbar: {
      toolbarOptions,
      handlers: {
        image: imageHandler,
      },
    },
    // resize image goes here
    // imageResize: {
    //   parchment: ReactQuill.import("parchment"),
    //   modules: ["Resize", "DisplaySize"],
    // },
    // module to upload image goes here

    // imageUploader: {
    // upload: (file) => {
    //   return new Promise((resolve, reject) => {
    //     const formData = new FormData();
    //     formData.append("original", file);
    //     fetch("https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22", {
    //       method: "POST",
    //       body: formData,
    //     })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         console.log(result);
    //         resolve(result.data.url);
    //       })
    //       .catch((error) => {
    //         reject("Upload failed");
    //         console.error("Error:", error);
    //       });
    //   });
    // },
    // },
  };

  useEffect(() => {
    setValue(editData);
  }, [editData]);

  return (
    <ReactQuill
      ref={quillRef}
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
