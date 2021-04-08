import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import UserHome from "./components/UserHome";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route path="/user/:id/home" render={(props) => <UserHome {...props} />} />
          <Route path="/user/:id/profile" render={(props) => <UserProfile {...props} />} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
