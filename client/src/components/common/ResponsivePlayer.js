import React from "react";
import ReactPlayer from "react-player";
import "./responsive-player.css";
import { PropTypes } from "prop-types";

const ResponsivePlayer = ({ url, autoplay = false, muted = true, volume = 1 }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        height="100%"
        controls={true}
        playing={autoplay}
        muted={muted}
        volume={volume}
        playsinline={true}
        pip={true}
      />
    </div>
  );
};

ResponsivePlayer.propTypes = {
  url: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
};

export default ResponsivePlayer;
