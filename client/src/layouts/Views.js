/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";
import callRing from "../assets/sounds/phonecall.mp3";

//Container
import LayoutUser from "./LayoutUser/index";
import LayoutPublic from "./LayoutPublic/index";
import LayoutAuth from "./LayoutAuth/index";
import LayoutCall from "./LayoutCall/index";

//Core components
import NotFound from "../pages/NotFound/index";
import useAuthContext from "../hooks/useAuthContext";
import ReceivedDialog from "../pages/Call/components/ReceivedDialog";
import { Peer } from "peerjs";

const Views = () => {
  const user = useAuthContext();
  const [calling, setCalling] = useState(false);
  const [incoming, setIncoming] = useState(true);
  const [peer, setPeer] = useState(null);
  const me = user?.user?.id + "vwanu";

  function denyCall() {
    console.log("deny call");
    setCalling(false);
    console.log(call);
    setIncomingCall(false);
  }

  function answerCall() {
    console.log("accept call");
    window.open(
      `../../call?me=${me}&caller=1vwanu&isReceiving=true&audio=true&video=false`,
      "MsgWindow",
      "toolbar=no,scrollbars=no,resizable=no,top=0,left=0,width=600,height=600"
    );
    setCalling(false);
    setIncomingCall(false);
  }

  function ConnectPeer() {
    let peer = new Peer(me);
    setPeer(peer);
    peer.on("call", (call) => {
      setCalling(true);
      setIncomingCall(call);
    });

    peer.on("open", function (id) {
      console.log("connection opened on ", id);
    });
  }

  useEffect(() => {
    ConnectPeer();
  }, []);

  return (
    <>
      {calling && (
        <>
          <audio autoplay={true} loop={true}>
            <source src={callRing} type="audio/mp3" />
          </audio>
          <ReceivedDialog denyCall={denyCall} answerCall={answerCall} setIsCalling={setCalling} open={calling} caller={{}} />
        </>
      )}
      <div className="mx-auto bg-placeholder-color">
        <Routes>
          !user?
          <Route key={0} element={<LayoutPublic />}>
            {routes.map((route, idx) => {
              return (
                <>{route.access === role.PUBLIC ? <Route key={idx} path={route.path} element={<route.element exact={true} />} /> : null}</>
              );
            })}
          </Route>
          :
          <>
            <Route key={1} path="/" element={<LayoutUser />}>
              {routes.map((route, idx) => {
                return (
                  <>{route.access === role.USER ? <Route key={idx} path={route.path} element={<route.element />} exact={true} /> : null}</>
                );
              })}
            </Route>
            <Route key={2} path="/" element={<LayoutAuth />}>
              {routes.map((route, idx) => {
                return (
                  <>{route.access === role.AUTH ? <Route key={idx} path={route.path} element={<route.element />} exact={true} /> : null}</>
                );
              })}
            </Route>
            <Route key={1} path="/" element={<LayoutCall />}>
              {routes.map((route, idx) => {
                return (
                  <>{route.access === role.CALL ? <Route key={idx} path={route.path} element={<route.element />} exact={true} /> : null}</>
                );
              })}
            </Route>
            <Route key={3} path="*" element={<NotFound />} />
          </>
        </Routes>
      </div>
    </>
  );
};

export default Views;
