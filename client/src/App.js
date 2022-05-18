import React from "react";
import { SidebarProvider } from "./context/BottomMenuContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// import { getToken } from "./helpers";
// import io from "socket.io-client";
// import useSocketContext from "./hooks/useSocketcontext";
// Custom dependencies

import { SocketContextProvider } from "./context/SocketContext";
import Views from "./layouts/Views.js";

const App = () => {
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
        <SidebarProvider>
          <SocketContextProvider>
            <Views />
          </SocketContextProvider>
          <ReactQueryDevtools />
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
