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

export function deleteToken(name) {
  localStorage.removeItem(name);
}

export function getToken(name = null) {
  if (name) return localStorage.getItem(name);
  return localStorage.getItem("token");
}

//calculate scrolling page
export function getYPosition() {
  window.addEventListener("scroll", () => {
    const yPosition = window.scrollY;
    return yPosition;
  });
}

// merge like with image like
export function likeArray(arrayObject, reactions) {
  if (arrayObject.length === 0) return;
  const array = [];
  // eslint-disable-next-line array-callback-return
  arrayObject.map((item) => {
    _.find(reactions, (reaction) => {
      if (reaction.label === item.content) {
        return array?.push(
          _.merge(item, { label: reaction.label, node: reaction.node, by: item?.User?.firstName + " " + item?.User?.lastName })
        );
      }
    });
  });

  return array;
}

//check if exist in friends request

export function checkFriendRequest(friendRequest, userId) {
  if (friendRequest?.length === 0) return false;
  if (!userId) return false;

  // eslint-disable-next-line array-callback-return
  const check = _.find(friendRequest, (item) => {
    return item?.id === userId;
  });
  if (check) return true;
  return false;
}

//check if friends list
export function checkFriendList(friends, userId) {
  if (friends?.length === 0) return false;
  if (!userId) return false;

  // eslint-disable-next-line array-callback-return
  const check = _.find(friends, (item) => {
    return item?.id === userId;
  });

  if (check) return true;
  return false;
}

//assign value for interest
export function assignValue(obj) {
  if (obj?.length === 0) return;
  const array = [];

  obj?.map((item) => {
    return array?.push({ value: item?.id, label: item?.name });
  });

  return array;
}
