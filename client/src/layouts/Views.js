/*eslint-disable*/
import React, { useEffect, useContext } from "react";
import cryptoRandomString from "crypto-random-string";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";
import messageRing from "../assets/sounds/messageNotif.mp3";
import { Howl } from "howler";
import { useQueryClient } from "react-query";
import Peer from "peerjs";
//Container
import LayoutUser from "./LayoutUser/index";
import LayoutPublic from "./LayoutPublic/index";
import LayoutAuth from "./LayoutAuth/index";
import LayoutCall from "./LayoutCall/index";

//Core components
import NotFound from "../pages/NotFound/index";
import useAuthContext from "../hooks/useAuthContext";
import ReceivedDialog from "../pages/Call/components/ReceivedDialog";
import client from "../features/feathers/index";
import { MessageContext } from "../context/MessageContext";
import { useListConversation } from "../features/chat/messageSlice";

import useCall from "../hooks/useCall";

const Views = () => {
  const { incomingCall, peer, onNewCAllRequest, onCallPatched } = useCall();
  const queryClient = useQueryClient();
  const user = useAuthContext();
  const sound = new Howl({
    src: [messageRing],
  });

  const { data: listConversation } = useListConversation(
    ["user", "conversation", "all"],
    user?.user?.id !== undefined ? true : false,
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
    messageService.on("created", onCreatedListener);
    messageService.on("patched", onPatchedListener);
  };

  //online user
  const onUpdatedOnlineListener = () => {
    queryClient.invalidateQueries(["user", "online"]);
  };
  const onPatchedOnlineListener = () => {
    queryClient.invalidateQueries(["user", "online"]);
  };

  const userService = client.service("users");
  const callService = client.service("call");

  const onlineFn = async () => {
    userService.on("updated", onUpdatedOnlineListener);
    userService.on("patched", onPatchedOnlineListener);
  };

  //friend request

  const requestService = client.service("users");

  const requestFn = async () => {
    requestService.on("updated", onUpdatedRequestListener);
    requestService.on("created", onCreatedRequestListener);
    requestService.on("deleted", onDeletedRequestListener);
    requestService.on("patched", onPatchedRequestListener);
  };

  const onUpdatedRequestListener = () => {
    queryClient.invalidateQueries(["user", "request"]);
    queryClient.invalidateQueries(["user", "friend"]);
    queryClient.invalidateQueries(["user", "received"]);
  };
  const onPatchedRequestListener = () => {
    queryClient.invalidateQueries(["user", "request"]);
    queryClient.invalidateQueries(["user", "friend"]);
    queryClient.invalidateQueries(["user", "received"]);
  };

  const onDeletedRequestListener = () => {
    queryClient.invalidateQueries(["user", "request"]);
    queryClient.invalidateQueries(["user", "friend"]);
    queryClient.invalidateQueries(["user", "received"]);
  };
  const onCreatedRequestListener = () => {
    queryClient.invalidateQueries(["user", "request"]);
    queryClient.invalidateQueries(["user", "friend"]);
    queryClient.invalidateQueries(["user", "received"]);
  };

  const { countUnreadMessageConversation } = useContext(MessageContext);

  useEffect(() => {
    messageFn();
    onlineFn();
    callService.on("created", onNewCAllRequest);
    callService.on("patched", onCallPatched);
    console.log("connection ddd");
    console.log(peer);
    return () => {
      callService.off("created", onNewCAllRequest);
      callService.off("patched", onCallPatched);
    };
  }, [user]);

  useEffect(() => {
    countUnreadMessageConversation(listConversation);
  }, [listConversation]);

  return (
    <>
      {incomingCall && (
        <>
          <ReceivedDialog open={incomingCall} caller={{}} />
        </>
      )}
      <div className="mx-auto bg-placeholder-color">
        <Routes>
          !user?
          <Route key={cryptoRandomString({ length: 10 })} element={<LayoutPublic />}>
            {routes.map((route) => {
              return route.access === role.PUBLIC ? (
                <Route key={cryptoRandomString({ length: 10 })} path={route.path} element={<route.element exact={true} />} />
              ) : null;
            })}
          </Route>
          :
          <>
            <Route key={cryptoRandomString({ length: 10 })} path="/" element={<LayoutUser />}>
              {routes.map((route) => {
                return route.access === role.USER ? (
                  <Route key={cryptoRandomString({ length: 10 })} path={route.path} element={<route.element />} exact={true} />
                ) : null;
              })}
            </Route>
            <Route key={cryptoRandomString({ length: 10 })} path="/" element={<LayoutAuth />}>
              {routes.map((route) => {
                return route.access === role.AUTH ? (
                  <Route key={cryptoRandomString({ length: 10 })} path={route.path} element={<route.element />} exact={true} />
                ) : null;
              })}
            </Route>
            <Route key={cryptoRandomString({ length: 10 })} path="/" element={<LayoutCall />}>
              {routes.map((route) => {
                return route.access === role.CALL ? (
                  <Route key={cryptoRandomString({ length: 10 })} path={route.path} element={<route.element />} exact={true} />
                ) : null;
              })}
            </Route>
            <Route key={cryptoRandomString({ length: 10 })} path="*" element={<NotFound />} />
          </>
        </Routes>
      </div>
    </>
  );
};

export default Views;
