import { Provider } from "react-redux";

// Custom dependencies
import { store } from "./store";
//import Routes from "layouts/Routes.js";
import Views from "./layouts/Views";

const App = () => {
  return (
    <Provider store={store}>
      <Views />
    </Provider>
  );
};

export default App;
