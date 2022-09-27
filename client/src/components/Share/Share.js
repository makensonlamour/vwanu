import * as React from "react";
import PropTypes from "prop-types";
import { Backdrop, Box, Modal, Fade } from "@mui/material/";
import SocialMediaShare from "../common/SocialMediaShare";

export const url = process.env.REACT_APP_API_URL || "http://localhost:3000";

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

const Share = ({ post, label }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <button
        onClick={handleOpen}
        className="text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
      >
        {/* <RiShareForwardLine size={"24px"} className="inline text-white bg-g-one p-1 mask mask-squircle" /> */}
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
            <div className="block border-primary">
              <SocialMediaShare
                className={"m-1"}
                style={{ padding: "2px" }}
                title={post?.postText}
                quote={post?.postText}
                url={`${url}/post/${post?.id}`}
                image={""}
                hashtag={`#vwanu #haitian_social_media #post #social #haiti`}
                description={post?.postText}
                imageUrl={""}
                caption={post?.postText}
                media={""}
                summary={post?.postText}
                source={"Vwanu"}
                hashtags={["vwanu", "haitian_social_media", "post", "social", "haiti"]}
                subject={`${post?.postText}`}
                body={`${post?.postText}`}
                via={"Vwanu"}
                tags={["vwanu", "haitian_social_media", " blog", "social", "haiti"]}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

Share.propTypes = {
  label: PropTypes.any,
  post: PropTypes.object,
};

export default Share;
