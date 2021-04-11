import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Container } from "nhsuk-react-components";
import SyncLoader from "react-spinners/SyncLoader";
import { UserContext } from '../UserContext';
import { useLocation } from "wouter";
import Cookies from "js-cookie";

function Logout() {
  const [, setLocation] = useLocation()
  const [, setUser] = useContext(UserContext);
  const [logoutStatus, setLogoutStatus] = useState("no-request");

  useEffect( () => {
    if (logoutStatus === "no-request") {
      setLogoutStatus("in-progress");
      axios.post(process.env.REACT_APP_SERVER_URI + "/logout", {}, {
        withCredentials: true
      }).then(res => {
        Cookies.remove("shouldBeLoggedIn");
        setUser({
          authed: false,
          data: null
        });
        setLocation('/');
      }).catch(error => {
        console.log(error.response);
        setUser({
          authed: false,
          data: null
        });
      })
    }
  }, [setUser, logoutStatus, setLocation])

  return (
    <Container style={{marginTop: "1em", marginBottom: "1em"}}>
      <h1>Logging out...</h1>
      <SyncLoader />
    </Container>
  )
}

export default Logout;
