import { AppRoutes } from "./Routes/AppRoutes";
import "./scss/style.scss";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
