// import Landing from './components/Landing/LandingPage'
// import Chat from './components/Chat/Chat'
// import { Switch, Route } from 'react-router-dom'
import React, { useState, useRef } from "react";
// import io from 'socket.io-client'

// import { Peer } from "peerjs";

function Test() {
  const videoGrid = useRef();
  // const [peer, setPeer] = useState(null);
  const [friendId] = useState(null);
  const [stream, setStream] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [call] = useState(false);

  // useEffect(() => {

  // const idx = window.location.href.lastIndexOf("/");
  // const iandother = window.location.href.substring(idx).split("/")[1];
  // const i = iandother.split("?")[0];
  // const o = iandother.split("?")[1];
  // setFriendId(o);
  // console.log({ i });
  // var peer = new Peer(i, { host: "/", port: 3003 });
  // setPeer(peer);

  // peer.on("call", (call) => {
  //   setCall(call);
  //   setIncomingCall(true);
  //   const video = document.createElement("video");
  //   call.on("stream", (userVideoStream) => {
  //     addVideoStream(video, userVideoStream);
  //   });
  // });
  // setUpVideo((stream) => {
  //   setStream(stream)
  //   console.log('stream')
  //   console.log(stream)
  //   addVideoStream(myVideo, stream)
  //   if (i === '454') {
  //     console.log('calling', o)
  //     connectToNewUser(o, stream, peer)
  //   }
  //   peer.on('call', (call) => {
  //     console.log('call ')
  //     call.answer()
  //     const video = document.createElement('video')
  //     call.on('stream', (userVideoStream) => {
  //       addVideoStream(video, userVideoStream)
  //     })
  //   })
  // })

  // peer.on("open", function (id) {
  //   console.log("connection opened on ", id);
  // });
  // }, []);

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGrid.current.append(video);
  }

  function connectToNewUser(userId, stream, peer) {
    console.log({ userId });
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });
  }

  const setUpVideo = (cb) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia(
      {
        video: true,
        audio: true,
      },
      cb
    );
  };
  const makeCall = () => {
    const myVideo = document.createElement("video");
    myVideo.muted = true;

    setUpVideo((stream) => {
      setStream(stream);
      addVideoStream(myVideo, stream);

      console.log("calling", friendId);
      connectToNewUser(friendId, stream, null);
    });
    //setStream
    console.log(stream);
  };

  const answerCall = () => {
    const myVideo = document.createElement("video");
    myVideo.muted = true;

    setUpVideo((stream) => {
      call.answer(stream);
      addVideoStream(myVideo, stream);
    });

    setIncomingCall(false);
  };

  const denyCall = () => {
    console.log("deny call");
    setIncomingCall(false);
    console.log(call);
  };
  return (
    <div>
      <div style={{ display: incomingCall ? "flex" : "none" }}>
        <button onClick={() => answerCall()}>Answer</button>
        <button onClick={() => denyCall()}>Deny {friendId}</button>
      </div>
      <button onClick={makeCall}>call {friendId}</button>
      <div className="video-grid" ref={videoGrid}></div>
    </div>
  );
}

export default Test;
