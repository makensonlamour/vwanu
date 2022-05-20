import React from "react";
import { SidebarProvider } from "./context/BottomMenuContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Custom dependencies
import Views from "./layouts/Views.js";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {
  const { authIsReady } = useAuthContext();
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
          {" "}
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
