import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const Editor = ({ placeholder }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  useEffect(() => {
    console.log("text", editor.children.length);
  }, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable className="mx-3 mt-3 text-lg font-[400]" placeholder={placeholder} />
    </Slate>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
