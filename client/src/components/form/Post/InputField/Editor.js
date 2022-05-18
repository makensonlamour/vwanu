import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { createEditor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const Editor = ({ placeholder, fn }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Define a serializing function that takes a value and returns a string.
  const serialize = (value) => {
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map((n) => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join("\n")
    );
  };

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
        if (isAstChange) {
          // Serialize the value
          fn(serialize(value));
        }
      }}
    >
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
  fn: PropTypes.func,
};

export default Editor;
