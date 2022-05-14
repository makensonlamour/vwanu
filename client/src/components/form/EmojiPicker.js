import React from "react";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";

const EmojiPicker = ({ onSelect }) => {
  return (
    <Picker
      set="apple"
      enableFrequentEmojiSort
      onSelect={onSelect}
      theme="light"
      showPreview={false}
      showSkinTones={true}
      emojiTooltip
      stickySearch={true}
      defaultSkin={1}
      color="#0F8FF3"
    />
  );
};

EmojiPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default EmojiPicker;
