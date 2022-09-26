import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material/";
import { useId } from "@mantine/hooks";
import { useGetReaction } from "../reactionSlice";
import Loader from "../../../components/common/Loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "15px",
};

const ViewModalLike = ({ postId, amountOfReactions, label }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: listReactions,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetReaction(["reactions", "all"], postId !== undefined ? true : false, "Post", postId);

  const queryClient = useQueryClient();
  function reloadPage() {
    queryClient.refetchQueries(["reactions", "all"]);
  }

  const uuid = useId();

  return (
    <div>
      <button style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
        {label}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ paddingBottom: 2, color: "#053dc8" }}>
              {amountOfReactions === 1 ? amountOfReactions + " reaction" : amountOfReactions + " reactions"}
            </Typography>
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
                  classNameContainer={"overflow-y-auto h-[40vh]"}
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

ViewModalLike.propTypes = {
  label: PropTypes.any,
  postId: PropTypes.string.isRequired,
  amountOfReactions: PropTypes.number,
};

export default ViewModalLike;
