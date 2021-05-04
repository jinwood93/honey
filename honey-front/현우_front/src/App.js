import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import First from "./components/First";
import Code from "./components/Code";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/combine";
import Subinformation from "./components/Subinformation";
import PasswordChange from "./components/PasswordChange";
import Mainpage from "./components/Mainpage";

let store = createStore(rootReducer);

function App() {
  console.log("app렌더링");
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <Route path="/" exact component={First}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/code" exact component={Code}></Route>
            <Route
              path="/subinformation"
              exact
              component={Subinformation}
            ></Route>
            <Route
              path="/passwordchange"
              exact
              component={PasswordChange}
            ></Route>
            <Route path="/mainpage" exact component={Mainpage}></Route>
          </Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
