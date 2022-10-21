/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./select.module.css";

const CustomSelect = ({ multiple, value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) return;
      // eslint-disable-next-line default-case
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, highlightedIndex, options]);

  return (
    /*
      styles.container
    */
    <>
      {" "}
      <label className="mt-4 text-sm font-[500] text-secondary">{label}</label>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={
          "relative flex outline-none w-full min-h-[2em] scrollbar mt-1 gap-[0.5em] items-center bg-placeholder-color rounded-xl px-2 py-3 focus:border-secondary focus:border"
        }
      >
        <span className={`!text-secondary font-[500] !text-sm ${styles.value}`}>
          {multiple
            ? value?.map((v) => (
                <button
                  key={v?.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className={styles["option-badge"]}
                >
                  {v?.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        {/* <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button> */}
        {/* <div className={styles.divider}></div> */}
        <div className={styles.caret}></div>
        <ul className={`scrollbar !text-sm ${styles.options} ${isOpen ? styles.show : ""}`}>
          {options?.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`!text-secondary ${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${
                index === highlightedIndex ? styles.highlighted : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

CustomSelect.propTypes = {
  multiple: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
  options: PropTypes.any,
  label: PropTypes.string,
};

export default CustomSelect;
