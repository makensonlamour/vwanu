import isNill from "lodash/isNil";
import { useEffect, useState, useRef } from "react";
// core components
import client from "../features/feathers";
import loadMedia from "../lib/loadMedia";
import useCallContext from "./useCallContext";
import appendStreamToPage from "../lib/appendStreamToPage";
import { CALL_STATUS, CALL_DETAILS } from "../lib/callConstants";

const useCall = () => {
  const callService = client.service("call");
  const [isCancelled, setCancel] = useState(false);

  // context
  const callContext = useCallContext();
  const { dispatch, Types, peer, call } = callContext;
  // ref
  const myVideoRef = useRef();
  const userVideoRef = useRef();

  callService.on("created", (call) => {
    console.log("call created", call);
    dispatch({ type: Types.USER_INCOMING_CALL, payload: call });
  });
  callService.on("patched", (call) => {
    console.log("\n\ncall updated", call);
    const options = call.type === "video" ? { video: true, audio: true } : { audio: true, muted: true };
    switch (call.details) {
      case CALL_DETAILS.RESPONDING:
        if (call.status === CALL_STATUS.CONNECTED) return;
        loadMedia(
          options,
          (stream) => {
            const media = options.video ? document.createElement("video") : document.createElement("audio");
            appendStreamToPage(media, stream, console.log);
            console.log("added media");
            connectToPeer(call.receiverId, stream, options.video);
          },
          (e) => {
            console.log(e.message || "error loading media to initiate call");
          }
        );
        break;
      default:
        throw new Error("Unknown call status");
    }
  });

  /**
   * this function is used to connect two peers and pass the stream among the
   *
   * @returns void
   * @param {string} userId
   * @param {STREAM} stream
  //  * @param {boolean} videoCall | video | audio stream options
   */
  const connectToPeer = (userId, stream, videoCall = false) => {
    if (isCancelled) return;
    console.log("Connecting to", videoCall);
    if (isNill(stream)) throw new Error("No Audio or video stream set");
    const outGoingCall = peer.call(userId, stream);
    dispatch({ type: Types.USER_OUTGOING_CALL, payload: outGoingCall });
    dispatch({ type: Types.OUTGOING_CALL_INITIALIZED, payload: { outGoingCall, userId } });

    const media = videoCall ? document.createElement("video") : document.createElement("audio");
    outGoingCall.on("stream", (userStream) => {
      dispatch({ type: Types.CALL_STARTED, payload: { call, userId } });

      appendStreamToPage(media, userStream, console.log);
    });
    outGoingCall.on("close", () => {
      // send request to backend to close the call
      dispatch({ type: Types.CALL_ENDED, payload: { call, userId } });
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
    await callService.patch(call.id, { status: CALL_STATUS.ANSWERED, callDetails: CALL_DETAILS.RESPONDING });
    dispatch({ type: Types.INCOMING_CALL_ACCEPTED });
  };
  const denyCall = (onCallClose) => {
    call.close();
    onCallClose();
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
      await callService.create({ receiverId, type });
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
    myVideoRef,
    userVideoRef,
  };
};

export default useCall;
