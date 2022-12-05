import React, { useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Popover } from "@mui/material";
import PropTypes from "prop-types";

const gf = new GiphyFetch("1NKsL7nfFy3yykoAeKvKPM842621uqPL");

const BoxGif = ({ setSelectedGif, label }) => {
  const [keyword, setKeyword] = useDebouncedState("", 200);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fetchGifs = (offset) => gf.search(keyword, { offset, limit: 10 });
  const fetchTrends = (offset) => gf.trending({ offset, limit: 10 });

  return (
    <>
      {/* <img src={selectedGif} width="480" height="446" alt="_" className="" allowFullScreen /> */}
      <button
        onClick={handleClick}
        className=" text-primary hover:text-secondary inline-flex justify-center px-1 py-2  rounded-lg cursor-pointer"
      >
        {label}
      </button>
      <Popover
        className="my-2"
        style={{ marginTop: "10px", marginBottom: "10px", padding: "20px", height: "70vh" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ height: "100vh" }} className="my-5">
          <input
            onChange={(e) => setKeyword(e?.target?.value)}
            style={{
              width: "95%",
              paddingLeft: "8px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderWidth: "1px",
              borderColor: "rgb(209 213 219)",
              borderRadius: "5px",
              margin: "12px 12px 12px 12px",
              position: "sticky",
              top: "0",
              outlineWidth: "0px",
            }}
            className="w-full mb-2 outline-0 py-2 px-4 border border-gray-300"
            placeholder={"Search a gif"}
          />
          <div style={{ overscrollBehavior: "auto" }} className="overscroll-auto h-[50vh]">
            <Grid
              width={400}
              height={50}
              columns={2}
              gutter={6}
              fetchGifs={keyword === "" ? fetchTrends : fetchGifs}
              key={keyword}
              hideAttribution={true}
              noLink={true}
              onGifClick={(e) => {
                setSelectedGif(e.images.original.url);
                handleClose();
              }}
            />
          </div>
        </div>
      </Popover>
    </>
  );
};

BoxGif.propTypes = {
  setSelectedGif: PropTypes.func,
  label: PropTypes.element,
};

export default BoxGif;
