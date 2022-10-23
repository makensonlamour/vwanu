import React, { useState, createContext, useMemo } from "react";

export const ImageBlogContext = createContext();

// eslint-disable-next-line react/prop-types
export const ImageBlogContextProvider = ({ children }) => {
  const [imageUpload, setImageUpload] = useState([]);

  const addImage = (objectImg) => {
    if (objectImg && Object.keys(objectImg).length > 0) {
      setImageUpload((oldFiles) => [...oldFiles, objectImg]);
    }
  };

  const resetImageList = () => {
    setImageUpload([]);
  };

  const value = useMemo(
    () => ({
      addImage,
      resetImageList,
      imageUpload,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageUpload]
  );
  return <ImageBlogContext.Provider value={value}>{children}</ImageBlogContext.Provider>;
};
