import React from "react";
import PropTypes from "prop-types";

const ParagraphPolicy = ({ heading = "", subHeading = "", description = "", name = "" }) => {
  return (
    <div id={name} className="border border-gray-100">
      {heading && <p className="pb-4 pt-3 font-semibold text-3xl">{heading}</p>}
      {subHeading && <p className="pb-3 pt-2 font-semibold text-lg">{subHeading}</p>}
      {description && (
        <p
          className="py-4 font-normal leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: description || "",
          }}
        />
      )}
    </div>
  );
};

ParagraphPolicy.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
};

export default ParagraphPolicy;
