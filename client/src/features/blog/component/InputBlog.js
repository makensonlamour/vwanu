import React from "react";
import PropTypes from "prop-types";
import {
  Plate,
  createAlignPlugin,
  createPlugins,
  HeadingToolbar,
  AlignToolbarButton,
  BlockToolbarButton,
  getPluginType,
  usePlateEditorRef,
  ELEMENT_PARAGRAPH,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_BLOCKQUOTE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  createBasicElementsPlugin,
  createSoftBreakPlugin,
  createResetNodePlugin,
  createExitBreakPlugin,
  createParagraphPlugin,
  createHeadingPlugin,
  createIndentPlugin,
  createIndentListPlugin,
  createBasicMarksPlugin,
  ToolbarButton,
  MarkToolbarButton,
  StyledElement,
  toggleIndentList,
  withProps,
  indent,
  outdentList,
  serializeHtml,
  createPlateEditor,
} from "@udecode/plate";
import { PLUGINS } from "./plugins";
import "material-icons/iconfont/material-icons.css";
import { CONFIG } from "./config";

const AlignToolbarButtons = () => {
  return (
    <>
      <AlignToolbarButton value="left" icon={<span className="material-icons-outlined">format_align_left</span>} />
      <AlignToolbarButton value="center" icon={<span className="material-icons-outlined">format_align_center</span>} />
      <AlignToolbarButton value="right" icon={<span className="material-icons-outlined">format_align_right</span>} />
      <AlignToolbarButton value="justify" icon={<span className="material-icons-outlined">format_align_justify</span>} />
    </>
  );
};

const BasicElementToolbarButtons = () => {
  const editor = usePlateEditorRef();
  return (
    <>
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H1)} icon={<span className="material-icons">looks_one</span>} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H2)} icon={<span className="material-icons">looks_two</span>} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H3)} icon={<span className="material-icons">looks_3</span>} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H4)} icon={<span className="material-icons">looks_4</span>} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H5)} icon={<span className="material-icons">looks_5</span>} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H6)} icon={<span className="material-icons">looks_6</span>} />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_BLOCKQUOTE)} icon={<span className="material-icons">format_quote</span>} />
    </>
  );
};

const IndentToolbarButtons = () => {
  const editor = usePlateEditorRef();

  return (
    <>
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          toggleIndentList(editor, {
            listStyleType: "disc",
          });
        }}
        icon={<span className="material-icons">format_list_bulleted</span>}
      />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          toggleIndentList(editor, {
            listStyleType: "decimal",
          });
        }}
        icon={<span className="material-icons">format_list_numbered</span>}
      />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          outdentList(editor);
        }}
        icon={<span className="material-icons">format_indent_increase</span>}
      />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          indent(editor);
        }}
        icon={<span className="material-icons">format_indent_decrease</span>}
      />
    </>
  );
};

const BasicMarkToolbarButtons = () => {
  const editor = usePlateEditorRef();

  return (
    <>
      <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<span className="material-icons">format_bold</span>} />
      <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<span className="material-icons">format_italic</span>} />
      <MarkToolbarButton type={getPluginType(editor, MARK_UNDERLINE)} icon={<span className="material-icons">format_underlined</span>} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_STRIKETHROUGH)}
        icon={<span className="material-icons">format_strikethrough</span>}
      />
      <MarkToolbarButton type={getPluginType(editor, MARK_CODE)} icon={<span className="material-icons">code</span>} />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPluginType(editor, MARK_SUBSCRIPT)}
        icon={<span className="material-icons">superscript</span>}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_SUBSCRIPT)}
        clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        icon={<span className="material-icons">subscript</span>}
      />
    </>
  );
};

const InputBlog = ({ fn }) => {
  const editableProps = {
    placeholder: "Write the blog text here...",
  };

  const initialValue = [
    {
      type: "p",
      children: [
        {
          text: "",
        },
      ],
    },
  ];

  const plugins = createPlugins(
    [
      ...PLUGINS.basicNodes,
      ...PLUGINS.basicElements,
      createBasicElementsPlugin(),
      createResetNodePlugin(CONFIG.resetBlockType),
      createSoftBreakPlugin(CONFIG.softBreak),
      createExitBreakPlugin(CONFIG.exitBreak),
      createBasicMarksPlugin(),
      createAlignPlugin({
        inject: {
          props: {
            validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
          },
        },
      }),
      createParagraphPlugin({
        component: withProps(StyledElement, {
          as: "div",
          styles: {
            root: {
              margin: 0,
              padding: "4px 0",
            },
          },
        }),
      }),
      createHeadingPlugin(),
      createIndentPlugin({
        inject: {
          props: {
            validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1],
          },
        },
      }),
      createIndentListPlugin({
        inject: {
          props: {
            validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1],
          },
        },
      }),
    ],
    {
      components: CONFIG.components,
    }
  );

  const editor = createPlateEditor({
    plugins: plugins,
    components: CONFIG.components,
  });

  return (
    <>
      <div>
        <HeadingToolbar>
          <BasicMarkToolbarButtons />
          <AlignToolbarButtons />
          <BasicElementToolbarButtons />
          <IndentToolbarButtons />
        </HeadingToolbar>
        <Plate
          editableProps={editableProps}
          initialValue={initialValue}
          plugins={plugins}
          onChange={(newValue) => {
            const htmlText = serializeHtml(editor, {
              nodes: newValue,
            });
            fn(htmlText);
          }}
        />
      </div>
    </>
  );
};

InputBlog.propTypes = {
  fn: PropTypes.func,
};

export default InputBlog;
