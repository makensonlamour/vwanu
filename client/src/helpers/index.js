// import React from "react";
import jwtDecode from "jwt-decode";
import _ from "lodash";

export function decoder(token) {
  if (!token) return {};
  return jwtDecode(token);
}

export function isExpired(token) {
  if (!token) return true;
  const decoded = decoder(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function deleteToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

//calculate scrolling page
export function getYPosition() {
  window.addEventListener("scroll", () => {
    const yPosition = window.scrollY;
    return yPosition;
  });
}

// calculate number of content in an arrayObject
export function likeArray(arrayObject, reactions) {
  if (arrayObject.length === 0) return;
  const array = [];
  // eslint-disable-next-line array-callback-return
  arrayObject.map((item) => {
    _.find(reactions, (reaction) => {
      if (reaction.label === item.content) {
        return array.push(
          _.merge(item, { label: reaction.label, node: reaction.node, by: item?.User?.firstName + " " + item?.User?.lastName })
        );
      }
    });
  });

  return array;
}
