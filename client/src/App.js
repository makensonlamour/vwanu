import React from "react";
//import { Provider } from "react-redux";
import { SidebarProvider } from "./context/BottomMenuContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Custom dependencies
//import { store } from "./store";
//import { store } from "./hooks/store";
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
      <SidebarProvider>
        <Views />
        <ReactQueryDevtools />
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default App;
