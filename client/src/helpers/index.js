/*eslint-disable*/
import React from "react";
import cryptoRandomString from "crypto-random-string";
import jwtDecode from "jwt-decode";
import _ from "lodash";
import PreviewUrl from "../components/common/PreviewUrl";

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

export function assignDataMedia(obj) {
  if (obj?.length === 0) return [];
  const array = [];

  console.log(obj);

  obj?.map((item) => {
    if (
      item?.original.endsWith(".mp4") ||
      item?.original.endsWith(".avi") ||
      item?.original.endsWith(".mov") ||
      item?.original.endsWith(".wmv") ||
      item?.original.endsWith(".flv") ||
      item?.original.endsWith(".f4v") ||
      item?.original.endsWith(".swf") ||
      item?.original.endsWith(".mkv") ||
      item?.original.endsWith(".webm") ||
      item?.original.endsWith(".html5") ||
      item?.original.endsWith(".mpeg-2") ||
      item?.original.endsWith(".avchd") ||
      item?.original.endsWith(".ogv") ||
      item?.original.endsWith(".m3u8") ||
      item?.original.endsWith(".mpd") ||
      item?.original.endsWith(".m4v")
    ) {
      return;
    } else {
      return array?.push({ ...item });
    }
  });

  return array;
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
  if (obj?.length === 0) return [];
  const array = [];

  obj?.map((item) => {
    return array?.push({ id: item?.id, value: item?.id, label: item?.name, name: item?.name });
  });

  return array;
}

export function assignValueCountries(obj) {
  if (obj === undefined || obj?.length === 0) return;
  const array = [];

  // eslint-disable-next-line array-callback-return
  obj?.map((item) => {
    return array?.push({ id: item?.id, value: item?.id, label: item?.name, ...item });
  });

  return array;
}

export function assignValueStates(obj) {
  if (obj?.length === 0) return;
  const array = [];

  obj?.pages?.map((page) => {
    // eslint-disable-next-line array-callback-return
    return page?.data?.data?.map((item) => {
      return array?.push({ id: item?.id, value: item?.state_code, name: item?.name, label: item?.name, ...item });
    });
  });

  return array;
}

//assign value for interest
export function assignCommunityMember(obj, types) {
  if (obj === undefined || obj?.pages === undefined || obj?.pages[0]?.data?.total === 0) return;
  const array = [];

  obj?.pages?.map((page) => {
    // eslint-disable-next-line array-callback-return
    return page?.data?.data?.map((item) => {
      if (item?.CommunityRole?.name === types) {
        return array?.push({
          id: item?.id,
          CommunityId: item?.CommunityId,
          CommunityRole: item?.CommunityRole,
          CommunityRoleId: item?.CommunityRoleId,
          User: item?.User,
          UserId: item?.UserId,
          banned: item?.banned,
          bannedDate: item?.bannedDate,
          canInvite: item?.canInvite,
          canMessageInGroup: item?.canMessageInGroup,
          canPost: item?.canPost,
          canUploadDoc: item?.canUploadDoc,
          canUploadPhoto: item?.canUploadPhoto,
          canUploadVideo: item?.canUploadVideo,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
        });
      }
    });
  });

  return array;
}

export function isMember(listMembers, data) {
  let memb = listMembers?.filter((member) => member?.UserId === data?.id);
  return memb?.length === 0 ? false : true;
}

export function isInvitation(listMembers, data) {
  let memb = listMembers?.filter((member) => member?.CommunityId === data?.id);
  console.log("isInvite", memb);

  return memb?.length === 0 ? false : true;
}

export function isInvitationReceive(listMembers, data) {
  let memb = listMembers?.filter((member) => member?.hostId === data?.id);

  return memb?.length === 0 ? true : false;
}

export function generateArrayLink(text = "") {
  if (!text) return "";
  let arrayLinks = [];
  text.split("\n").map((txt) => {
    return txt.split(" ").map((str) => {
      if (str.startsWith("https")) {
        return arrayLinks.push(str);
      } else if (str.startsWith("www.")) {
        return arrayLinks.push("https://" + str);
      } else {
        return;
      }
    });
  });

  return arrayLinks;
}

export function transformHashtagAndLink(strText, preview = false, originalType = "public") {
  if (originalType === "Blogs") {
    strText = strText.replace(/(<([^>]+)>)/gi, "");
    strText = strText.length > 100 ? strText.substring(0, 100) + "..." : strText;
  }

  strText = strText.split(" ").map((str) => {
    if (str.startsWith("https")) {
      if (preview) {
        return <PreviewUrl url={str} />;
      } else {
        return (
          <a
            key={cryptoRandomString({ length: 10 })}
            rel="noopener noreferrer"
            target="_blank"
            href={`${str}`}
            className="text-primary hover:text-secondary"
          >
            {str}
          </a>
        );
      }
    } else if (str.startsWith("#")) {
      return (
        <span key={cryptoRandomString({ length: 10 })} className="font-bold">
          {str}
        </span>
      );
    } else if (str.startsWith("www.")) {
      if (preview) {
        return <PreviewUrl url={"https://" + str} />;
      } else {
        return (
          <a
            key={cryptoRandomString({ length: 10 })}
            rel="noopener noreferrer"
            target="_blank"
            href={`https://${str}`}
            className="text-primary hover:text-secondary"
          >
            {str}
          </a>
        );
      }
    } else {
      return str + " ";
    }
  });

  return strText;

  // if (hasMedia || arrayLinks?.length === 0) {
  //   return strText;
  // } else if (arrayLinks?.length > 0) {
  //   console.log(strText + " " + <PreviewUrl url={arrayLinks[0]} />);
  //   return strText + " " + <PreviewUrl url={arrayLinks[0]} />;
  // } else {
  //   return strText;
  // }
}
