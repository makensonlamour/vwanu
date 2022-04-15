import React from "react";
import likePNG from "../assets/images/reactions/like.png";
import lovePNG from "../assets/images/reactions/love.png";
import hahaPNG from "../assets/images/reactions/haha.png";
import wowPNG from "../assets/images/reactions/wow.png";
import sadPNG from "../assets/images/reactions/sad.png";
import angryPNG from "../assets/images/reactions/angry.png";
import carePNG from "../assets/images/reactions/care.png";

const reactions = [
  {
    label: "like",
    node: <img height={32} width={32} src={likePNG} alt="_like" />,
  },

  {
    label: "love",
    node: <img height={32} width={32} src={lovePNG} alt="_love" />,
  },
  {
    label: "care",
    node: <img height={32} width={32} src={carePNG} alt="_care" />,
  },
  {
    label: "haha",
    node: <img height={32} width={32} src={hahaPNG} alt="_haha" />,
  },
  {
    label: "wow",
    node: <img height={32} width={32} src={wowPNG} alt="_wow" />,
  },
  {
    label: "sad",
    node: <img height={32} width={32} src={sadPNG} alt="_sad" />,
  },
  {
    label: "angry",
    node: <img height={32} width={32} src={angryPNG} alt="_angry" />,
  },
];

export default reactions;
