import React from "react";
import { Quill } from "react-quill";
import PropTypes from "prop-types";
import imgLoading from "../../../../assets/images/writing-loading.gif";
import { uploadImage } from "../../../media/mediaSlice";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not

// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "Inter", "lucida"];
Quill.register(Font, true);

// global variable
// let quillObj = {};

// function to upload image
function imageHandler() {
  const input = document.createElement("input");

  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();

    formData.append("original", file);

    // save current cursor state
    const range = this.quill.getSelection(true);

    // insert temporary loading placeholder image
    this.quill.insertEmbed(range.index, "image", imgLoading);

    // move cursor to right side of image (easier to continue typing)
    this.quill.setSelection(range.index + 1);

    //   upload image to server
    const res = await uploadImage(formData);

    // save image object to clear cloud after

    // remove placeholder image
    this.quill.deleteText(range.index, 1);

    //   Insert upload image
    this.quill.insertEmbed(range.index, "image", res?.data?.original);
  };
}

// Modules object for setting up the Quill editor
export const modules = (props) => ({
  toolbar: {
    container: "#" + props,
    handlers: {
      image: imageHandler,
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  // "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = ({ toolbarId }) => {
  return (
    <>
      {toolbarId !== undefined && (
        <div id={toolbarId}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            {/* <select className="ql-font">
              <option value="arial"> Arial </option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="Inter" selected>
                Inter
              </option>
              <option value="lucida">Lucida</option>
            </select> */}
            <select className="ql-size">
              <option value="extra-small">Extra Small</option>
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
            <select className="ql-header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
              <option value="" selected>
                Normal
              </option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
          </span>
          <span className="ql-formats">
            <select className="ql-align">
              <option></option>
              <option value="center"></option>
              <option value="right"></option>
              <option value="justify" selected></option>
            </select>
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};

QuillToolbar.propTypes = { toolbarId: PropTypes.string };

export default QuillToolbar;
