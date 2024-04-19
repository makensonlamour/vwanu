import React, { useEffect, useRef } from "react";
import { SidebarProvider } from "./context/BottomMenuContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Custom dependencies
import Views from "./layouts/Views.js";
import useAuthContext from "./hooks/useAuthContext";
import useCall from "./hooks/useCall";
import { checkInactivity, handleStorageChange } from "./helpers";
import { handleUserActivity } from "./helpers/index";

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

  // useEffect(() => {
  //   function handleUnload(event) {
  //     event.preventDefault();
  //     console.log("about to exit");
  //     return (event.returnValue = "");
  //   }

  //   window.addEventListener("beforeunload", handleUnload, { capture: true });
  // }, []);

  const inactivityTimeoutRef = useRef(null);

  // handle remember me when closed the browser or after 30 minutes of inactivity
  useEffect(() => {
    handleStorageChange();

    handleUserActivity(inactivityTimeoutRef);

    checkInactivity();

    // Add event listeners
    window.addEventListener("beforeunload", handleStorageChange, { capture: true });
    window.addEventListener("visibilitychange", handleStorageChange);
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    // Check for inactivity periodically
    const inactivityInterval = setInterval(checkInactivity, 60000); // Check every minute

    return () => {
      // Clean up event listeners and interval
      // window.removeEventListener("beforeunload", handleStorageChange, { capture: true });
      window.removeEventListener("visibilitychange", handleStorageChange);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      clearInterval(inactivityInterval);
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, []);

  // useEffect(() => {
  //   const rememberMe = localStorage.getItem("rememberMe") === "true";
  //   if (!rememberMe && !localStorage.getItem("lastActiveTime")) {
  //     // Set the last active time if rememberMe is not set and lastActiveTime is not already set
  //     // localStorage.setItem("lastActiveTime", Date.now());
  //     console.log("windows reload");
  //   }
  // }, []);

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
