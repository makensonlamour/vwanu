import { Provider } from "react-redux";

// Custom dependencies
import { store } from "./store";
//import Routes from "layouts/Routes.js";
import Views from "./layouts/Views";
import Container from "./components/container/index";

const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;
