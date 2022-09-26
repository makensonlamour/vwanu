import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { CssBaseline, Box, Typography, SwipeableDrawer } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useGetReaction } from "../reactionSlice";
import Loader from "../../../components/common/Loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { useId } from "@mantine/hooks";

const drawerBleeding = 56;

const Root = styled("div")(() => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ViewDrawerLike = (props) => {
  const { window, label, postId, amountOfReactions } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const {
    data: listReactions,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetReaction(["reactions", "all"], postId !== undefined ? true : false, "Post", postId);

  const queryClient = useQueryClient();
  function reloadPage() {
    // window.location.reload();
    queryClient.refetchQueries(["reactions", "all"]);
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
  const uuid = useId();
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <Box sx={{ textAlign: "center", pt: 1, backgroundColor: "transparent" }}>
        <button className="bg-inherit" onClick={toggleDrawer(true)}>
          {label}
        </button>
      </Box>
      {open ? (
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "#053dc8" }}>
              {amountOfReactions === 1 ? amountOfReactions + " reaction" : amountOfReactions + " reactions"}
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center" }} className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            ) : isError ? (
              <div className="py-5 m-auto text-center px-2">
                {"There was an error while fetching the data. "}{" "}
                <Link
                  style={{
                    color: "#053dc8",
                  }}
                  className="text-secondary hover:text-primary"
                  to={""}
                  onClick={() => reloadPage()}
                >
                  Tap to retry
                </Link>{" "}
              </div>
            ) : listReactions?.pages && listReactions?.pages?.length > 0 ? (
              <ul className="block border-b border-primary" style={{ borderTop: "1px solid #efefef" }}>
                <InfiniteScroll
                  fetchMore={fetchNextPage}
                  isError={isError}
                  isLoading={isLoading}
                  hasNext={hasNextPage}
                  refetch={() => queryClient.invalidateQueries(["reactions", "all"])}
                  container={true}
                  classNameContainer={"overflow-y-auto h-[80vh]"}
                  loader={
                    <div className="flex justify-center py-5">
                      <Loader color="black" />
                    </div>
                  }
                  errorRender={
                    <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                      {"There was an error while fetching the data. "}{" "}
                      <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["reactions", "all"])}>
                        Tap to retry
                      </Link>
                    </div>
                  }
                >
                  {listReactions?.pages.map((page) => {
                    return page?.data?.data?.map((reaction, idx) => {
                      return (
                        <Link
                          to={"../../profile/" + reaction?.User?.id}
                          key={`${uuid}-${idx}`}
                          style={{ display: "flex", justifyContent: "between", padding: "5px", borderBottom: "1px solid #efefef" }}
                        >
                          {/* <div style={{ marginRight: "20px", alignItems: "center" }}>{reaction?.conte} </div> */}
                          <div style={{ marginRight: "20px", alignItems: "center" }}>
                            <img
                              width="48px"
                              height="48px"
                              className="mask mask-squircle"
                              src={reaction?.User?.profilePicture}
                              alt="_profile"
                            />
                          </div>
                          <div style={{ alignItems: "center" }}>
                            <span>{reaction?.User?.firstName + " " + reaction?.User?.lastName}</span>
                          </div>
                        </Link>
                      );
                    });
                  })}
                </InfiniteScroll>
              </ul>
            ) : null}
          </StyledBox>
        </SwipeableDrawer>
      ) : null}
    </Root>
  );
};

ViewDrawerLike.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  label: PropTypes.any,
  postId: PropTypes.string.isRequired,
  amountOfReactions: PropTypes.number,
};

export default ViewDrawerLike;
