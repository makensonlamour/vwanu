/*eslint-disable*/
import React, { useState, useEffect, useContext, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";
import callRing from "../assets/sounds/phonecall.mp3";
import { Howl } from "howler";
import { useQueryClient } from "react-query";

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
import client from "../features/feathers/index";
import { MessageContext } from "../context/MessageContext";
import { useListConversation } from "../features/chat/messageSlice";

const Views = () => {
  const queryClient = useQueryClient();
  const user = useAuthContext();
  const [calling, setCalling] = useState(false);
  const [incoming, setIncoming] = useState(true);
  const [peer, setPeer] = useState(null);
  const me = user?.user?.id + "vwanu";
  const sound = new Howl({
    src: [callRing],
  });
  const newMessageRef = useRef(null);

  const { data: listConversation } = useListConversation(
    ["user", "conversation", "all"],
    user?.user?.id !== "undefined" ? true : false,
    user?.user?.id
  );

  const onCreatedListener = (message) => {
    sound.play();
    window.document.title = `You have a new message || Vwanu`;
    queryClient.invalidateQueries(["user", "conversation", "all"]);
    queryClient.invalidateQueries(["message", message?.ConversationId]);
  };

  const onPatchedListener = (message) => {
    queryClient.invalidateQueries(["user", "conversation", "all"]);
    queryClient.invalidateQueries(["message", message?.ConversationId]);
  };

  const messageService = client.service("message");

  const messageFn = async () => {
    console.log("messsageFn fired");
    messageService.on("created", onCreatedListener);
    messageService.on("patched", onPatchedListener);
  };

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

  const { countUnreadMessageConversation } = useContext(MessageContext);

  useEffect(() => {
    messageFn();
    ConnectPeer();
  }, []);

  useEffect(() => {
    countUnreadMessageConversation(listConversation?.data);
  }, [listConversation?.data]);

  return (
    <>
      <button
        ref={newMessageRef}
        onClick={() => {
          console.log("audio played");
        }}
        className="hidden"
      ></button>
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
