import { Provider } from "react-redux";

// Custom dependencies
import { store } from "./store";
import Routes from "layouts/Routes.js";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
