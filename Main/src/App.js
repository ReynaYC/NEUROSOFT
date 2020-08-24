import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

import Navbar from "./components/Navbar.component";
import SurveyList from "./components/survey-list.component";
// import ViewEditSurvey from "./components/viewEdit-survey.component";
import NewSurvey from "./components/new-survey.component";
import CreateUser from "./components/Auth/Create-user.component";
import Login from "./components/Auth/Login.component";
import Home from "./components/Home.component";
import About from "./components/About.component";
import DocUserPage from "./components/Dashboards/DocUserPage.component";
import PaUserPage from "./components/Dashboards/PaUserPage.component";

import UserContext from "./context/UserContext";
// import index from "./components/index";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);




  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <Router>
      
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/docdash" component = {DocUserPage} />
        <Route path="/padash" component = {PaUserPage} />
        {/* <Route path="/viewEdit/:id" component={ViewEditSurvey} /> */}
        <Route path="/newSurvey/:id" component={NewSurvey} />
        <Route path="/register" component={CreateUser} />
        <Route path="/login" component={Login} />
      </div>
      
    </Router>
    </UserContext.Provider>
  );
}

export default App;
