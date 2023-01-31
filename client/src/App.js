import React from "react";
import { SidebarProvider } from "./context/BottomMenuContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Custom dependencies
import Views from "./layouts/Views.js";
import useAuthContext from "./hooks/useAuthContext";
import useCall from "./hooks/useCall";

const App = () => {
  const { authIsReady } = useAuthContext();
  const { myVideoRef, userVideoRef, call } = useCall();

  // peer?.on("call", (call) => {
  //   console.log("incomming call");
  //   dispatch({ type: Types.USER_INCOMING_CALL, payload: call });

  //   call.on("stream", (userVideoStream) => {
  //     console.log("On Call at the moment");
  //     const video = document.createElement("video");
  //     video.muted = true;
  //     dispatch({ type: Types.USER_ON_CALL, payload: true });
  //     addVideoStream(video, userVideoStream);
  //   });
  // });
  // peer?.on("open", function (id) {
  //   console.log("Connection established with peer network for id:", id);
  // });
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
          <div className={`bg-black h-100 p-2 ${call ? "" : "hidden"}`}>
            <div id="video-grid">
              <video id="local-video" ref={myVideoRef} autoPlay muted loop />
              <video id="remote-video" ref={userVideoRef} autoPlay muted loop />
            </div>
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
