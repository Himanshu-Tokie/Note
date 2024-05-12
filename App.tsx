import { Provider } from "react-redux";
import AuthNavigation from "./src/Navigation/AuthNavigation";
import { store } from "./src/store";

export default function App(){
  return(
      <Provider store={store}>
      <AuthNavigation></AuthNavigation>
      </Provider>
  )
}