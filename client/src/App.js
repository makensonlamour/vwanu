import { Provider } from "react-redux";

// Custom dependencies
import { store } from "./store";
//import Routes from "layouts/Routes.js";
import Login from "./views/Login/index";

const App = () => {
  return (
    <Provider store={store}>
      <Login />
      {/*}   <Routes /> {*/}
    </Provider>
  );
};

export default App;
