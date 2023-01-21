import setupCall from "./setUpCall";

export function addVideoStream(video, stream) {
  console.log("video stream", video, stream);
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  const videoGrid = document.getElementById("video-grid");
  videoGrid.append(video);
}

export function connectToNewUser(userId, stream, peer) {
  console.log({ userId });
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    console.log("userVideoStream", userVideoStream);
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
}

export const makeCall = (peer, friendId) => {
  console.log("makeCall initiated");
  const myVideo = document.createElement("video");
  myVideo.muted = true;

  setupCall((stream) => {
    console.log("Video call streaming", stream);
    connectToNewUser(friendId, stream, peer);
  });
  //setStream
};

export const answerCall = (call) => {
  const myVideo = document.createElement("video");
  myVideo.muted = true;

  setupCall((stream) => {
    call.answer(stream);
    addVideoStream(myVideo, stream);
  });
};
