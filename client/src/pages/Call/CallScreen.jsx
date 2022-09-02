/*import React, { useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import {
  BsFillMicMuteFill,
  BsFillMicFill,
  BsFillCameraVideoOffFill,
  BsFillCameraVideoFill,
  BsFillVolumeUpFill,
  BsVolumeDownFill,
} from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";

const CallScreen = () => {
  const user = useOutletContext();
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [video, setVideo] = useState(false);
  const ringing = false;
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("caller"));
  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center items-center mt-16">
          <img className="border border-gray-200 mask mask-squircle w-28 h-28" src={user?.profilePicture?.original} alt="_" />
        </div>
        <div classsName="py-10">
          <p className="text-center pb-1 pt-4 text-lg font-semibold">{user?.firstName + " " + user?.lastName}</p>
          <p className="text-center py-2">{ringing ? "Ringing..." : "0:00"}</p>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setMute(!mute)}
            className="mr-2 mask mask-squircle border bg-gray-300 p-4 hover:text-secondary hover:bg-gray-300"
          >
            {mute ? <BsFillMicFill className="" size={"28px"} /> : <BsFillMicMuteFill className="" size={"28px"} />}
          </button>
          <button
            onClick={() => setSpeaker(!speaker)}
            className="mr-2 mask mask-squircle border bg-gray-300 p-4 hover:text-secondary hover:bg-gray-300"
          >
            {speaker ? <BsFillVolumeUpFill className="" size={"28px"} /> : <BsVolumeDownFill className="" size={"28px"} />}
          </button>
          <button
            onClick={() => setVideo(!video)}
            className="mask mask-squircle border bg-gray-300 p-4 hover:text-secondary hover:bg-gray-300"
          >
            {video ? <BsFillCameraVideoFill className="" size={"28px"} /> : <BsFillCameraVideoOffFill className="" size={"28px"} />}
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={() => alert("Call End")} className="mask mask-squircle border p-4 text-white bg-red-700 hover:bg-red-500">
            <MdCallEnd className="" size={"32px"} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CallScreen;
*/
/*eslint-disable */
// import Landing from './components/Landing/LandingPage'
// import Chat from './components/Chat/Chat'
// import { Switch, Route } from 'react-router-dom'
import React, { useEffect, useState, useRef } from "react";
// import io from 'socket.io-client'

import { Peer } from "peerjs";
import { useSearchParams } from "react-router-dom";

function CallScreen() {
  const videoGrid = useRef();
  const [peer, setPeer] = useState(null);
  const [friendId, setFriendId] = useState(null);
  const [stream, setStream] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [call, setCall] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // const idx = window.location.href.lastIndexOf("/");
    // const iandother = window.location.href.substring(idx).split("/")[1];
    // const i = iandother.split("?")[0];
    // const o = iandother.split("?")[1];
    const i = searchParams.get("me");
    const o = searchParams.get("caller");
    setFriendId(o);
    console.log({ i }, { o });
    var peer = new Peer(i);
    setPeer(peer);

    peer.on("call", (call) => {
      console.log("This user is being called...");
      setCall(call);
      setIncomingCall(true);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
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

    peer.on("open", function (id) {
      console.log("connection opened on ", id);
    });
  }, []);

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGrid.current.append(video);
  }

  function connectToNewUser(userId, stream, peer) {
    let conn = peer.connect(userId);

    peer.on("connection", (connection) => {
      console.log(conn, connection);
      conn = connection;
    });
    console.log({ peer });
    console.log("stream:", stream);
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      console.log("on stream");
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
      connectToNewUser(friendId, stream, peer);
    });
    //setStream
    console.log(stream);
  };

  const answerCall = () => {
    console.log("answer call");

    let conn = peer.connect(o);

    peer.on("connection", (connection) => {
      console.log(conn, connection);
      conn = connection;
    });

    const myVideo = document.createElement("video");
    myVideo.muted = true;

    setUpVideo((stream) => {
      console.log("inside setup video, respond call");
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
      <div>
        <button onClick={() => answerCall()}>Answer</button>
        <button onClick={() => denyCall()}>Deny {friendId}</button>
      </div>
      <button onClick={makeCall}>call {friendId}</button>
      <div className="video-grid" ref={videoGrid}></div>
    </div>
  );
}

export default CallScreen;
