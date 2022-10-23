import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Select, MenuItem } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CustomSelectMulti({ name, label, options, className, testId, link, isMulti, fn, val, ...otherProps }) {
  return (
    <>
      <div className="form-control mt-3">
        <span className="label-text text-md text-secondary font-semibold">{label}</span>
        <Select
          className={"select w-full " + className}
          placeholder={"Select " + label}
          value={val}
          onChange={(e) => {
            fn(e);
          }}
          MenuProps={MenuProps}
          {...otherProps}
        >
          <MenuItem>{"Not specified"}</MenuItem>
          {options?.length > 0
            ? options?.map((option) => {
                return !_.isEqual(option?.label, "Not Specified") ? (
                  <MenuItem key={option?.id} value={option?.label}>
                    {option?.label}
                  </MenuItem>
                ) : (
                  ""
                );
              })
            : ""}
        </Select>
      </div>
    </>
  );
}

CustomSelectMulti.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  link: PropTypes.string,
  options: PropTypes.any.isRequired,
  isMulti: PropTypes.bool,
  fn: PropTypes.func,
  val: PropTypes.array,
};

export default CustomSelectMulti;
