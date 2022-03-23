import React from "react";
import { Provider } from "react-redux";
import { SidebarProvider } from "./context/BottomMenuContext";

// Custom dependencies
//import { store } from "./store";
import { store } from "./hooks/store";
import Views from "./layouts/Views.js";

const App = () => {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <Views />
      </SidebarProvider>
    </Provider>
  );
};

export default App;
