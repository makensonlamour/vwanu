import isNill from "lodash/isNil";
import { useEffect, useState, useRef } from "react";
import { Peer } from "peerjs";
// core components
import client from "../features/feathers";
import loadMedia from "../lib/loadMedia";
import useCallContext from "./useCallContext";
import appendStreamToPage from "../lib/appendStreamToPage";
import { CALL_STATUS, CALL_DETAILS, peerConfiguration } from "../lib/callConstants";
import useAuthContext from "./useAuthContext";

const useCall = () => {
  const { user } = useAuthContext();
  const callService = client.service("call");
  const [isCancelled, setCancel] = useState(false);
  const connectionRef = useRef();

  // context
  const callContext = useCallContext();
  const { dispatch, Types, call, lastActivity, peer, incomingCall, myStreamOn } = callContext;

  const outgoingCallResponded = (call) => {
    const options = call.type === "video" ? { video: true, audio: true } : { audio: true, muted: true };
    if (call.status === CALL_STATUS.CONNECTED || lastActivity === CALL_STATUS.CONNECTED) return;
    console.log("Details", call.details, call.status, lastActivity, CALL_STATUS.CONNECTED);
    if (!myStreamOn)
      loadMedia(
        options,
        (stream) => {
          dispatch({ type: Types.SET_MY_STREAM });
          const media = options.video ? document.createElement("video") : document.createElement("audio");
          appendStreamToPage(media, stream, console.log);
          console.log("added media");
          connectToPeer(call.receiverId, stream, options.video);
        },
        (e) => {
          console.log(e.message || "error loading media to initiate call");
        }
      );
  };

  const onNewCAllRequest = (newCallRequest) => {
    if (incomingCall || call) return;
    dispatch({ type: Types.USER_INCOMING_CALL, payload: newCallRequest });
  };
  const onCallPatched = (updatedCall) => {
    switch (updatedCall.details) {
      case CALL_DETAILS.RESPONDING:
        outgoingCallResponded(updatedCall);
        break;
      case CALL_DETAILS.DENIED:
        dispatch({ type: Types.OUTGOING_CALL_DENIED });
        break;
      case CALL_DETAILS.CANCELLED:
        dispatch({ type: Types.OUTGOING_CALL_CANCELLED });
        break;
      default:
        throw new Error("Unknown call status");
    }
  };

  /**
   * this function is used to connect two peers and pass the stream among the
   *
   * @returns void
   * @param {string} userId
   * @param {STREAM} stream
  //  * @param {boolean} videoCall | video | audio stream options
   */
  const connectToPeer = (userId, stream, videoCall = false) => {
    if (isCancelled || lastActivity === CALL_STATUS.CONNECTED) return;
    if (isNill(stream)) throw new Error("No Audio or video stream set");
    console.log("connecting peer");
    if (!peer) {
      const newPeer = new Peer(user.id, peerConfiguration);
      connectionRef.current = newPeer;
      dispatch({ type: Types.REGISTER_PEER, payload: newPeer });
    }
    console.log("about to connect to peer");
    const p = peer || connectionRef.current;
    const outGoingCall = p?.call(userId, stream);
    console.log("outgoing call", outGoingCall);
    // dispatch({ type: Types.USER_OUTGOING_CALL, payload: outGoingCall });
    // dispatch({ type: Types.OUTGOING_CALL_INITIALIZED, payload: { outGoingCall, userId } });

    outGoingCall.on("stream", (userStream) => {
      const media = videoCall ? document.createElement("video") : document.createElement("audio");
      console.log("user stream", userStream);
      // dispatch({ type: Types.CALL_STARTED, payload: { call, userId } });

      appendStreamToPage(media, userStream, console.log);
    });
    outGoingCall.on("close", () => {
      console.log("call closed");
      // send request to backend to close the call
      // dispatch({ type: Types.CALL_ENDED, payload: { outGoingCall, userId } });
      // remove the media from the page
      // media.remove();
    });
  };

  /***
   *  This function is used to answer a call
   * @param {Object} call | The current call
   *
   * **/
  const answerCall = async () => {
    if (isCancelled) return;
    if (!peer) {
      console.log("peer not registered", user.id);
      const newPeer = new Peer(user.id, peerConfiguration);
      connectionRef.current = newPeer;
      dispatch({ type: Types.REGISTER_PEER, payload: newPeer });
    }
    await callService.patch(call.id, { status: CALL_STATUS.ANSWERED, callDetails: CALL_DETAILS.RESPONDING });
    dispatch({ type: Types.INCOMING_CALL_ACCEPTED });
  };
  const denyCall = async () => {
    if (isCancelled) return;
    await callService.patch(call.id, { status: CALL_STATUS.DENIED, callDetails: CALL_DETAILS.DENIED });
    dispatch({ type: Types.INCOMING_CALL_DENIED });
  };

  /***
   * This function is used to make a call to a friend
   * @param {string} userId
   * @param { { video?: boolean; audio?: boolean; }} options
   * @returns void
   */
  const makeCall = async (receiverId, options, errCb) => {
    const type = options.video ? "video" : "audio";
    try {
      const call = await callService.create({ receiverId, type });
      dispatch({ type: Types.USER_OUTGOING_CALL_REQUESTED, payload: call });
    } catch (error) {
      if (errCb) errCb(error);
    }
  };

  useEffect(() => {
    return () => {
      setCancel(true);
    };
  }, []);

  return {
    ...callContext,
    makeCall,
    answerCall,
    denyCall,
    connectToPeer,
    onNewCAllRequest,
    onCallPatched,
  };
};

export default useCall;
