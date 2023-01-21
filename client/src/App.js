import React from "react";
import { SidebarProvider } from "./context/BottomMenuContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Custom dependencies
import Views from "./layouts/Views.js";
import useAuthContext from "./hooks/useAuthContext";

import { addVideoStream, answerCall } from "./lib/makecall";
const App = () => {
  const { authIsReady, peer, onCall, call, incomingCall, dispatch, Types } = useAuthContext();

  peer?.on("call", (call) => {
    console.log("incomming call");
    dispatch({ type: Types.USER_INCOMING_CALL, payload: call });

    call.on("stream", (userVideoStream) => {
      console.log("On Call at the moment");
      const video = document.createElement("video");
      video.muted = true;
      dispatch({ type: Types.USER_ON_CALL, payload: true });
      addVideoStream(video, userVideoStream);
    });
  });
  peer?.on("open", function (id) {
    console.log("Connection established with peer network for id:", id);
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <>
          <div className={`bg-black h-100 p-2 ${incomingCall ? "" : "hidden"}`}>
            <div className="flex justify-between ">
              <p>Incomning call...</p>
              <div className="">
                <button className="btn btn-primary rounded-full mr-2" onClick={() => answerCall(call)}>
                  Answer
                </button>
                <button className="btn btn-danger rounded-full">Reject</button>
              </div>
            </div>
            <div id="video-grid">Yes baby {onCall.toString()}</div>
          </div>
          {authIsReady && (
            <SidebarProvider>
              <Views />
              <ReactQueryDevtools />
            </SidebarProvider>
          )}
        </>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
