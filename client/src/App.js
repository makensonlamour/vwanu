import React from "react";
import { Provider } from "react-redux";

// Custom dependencies
//import { store } from "./store";
import { store } from "./hooks/store";
import Views from "./layouts/Views.js";

const App = () => {
  return (
    <Provider store={store}>
      <Views />
    </Provider>
  );
};

export default App;
