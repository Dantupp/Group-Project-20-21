import React, { useContext } from 'react';
import { Breadcrumb, Button, Container, WarningCallout, InsetText } from "nhsuk-react-components";
import { Link } from "wouter";
import axios from "axios";
import {UserContext} from "../../UserContext";
import {useLocation} from 'wouter';
import Cookies from "js-cookie";

function Delete() {
  const [user, setUser] = useContext(UserContext);
  const [, setLocation] = useLocation()

  const handleDeleteFull = (event) => {
    event.preventDefault();
    axios.delete(process.env.REACT_APP_SERVER_URI + "/users/" + user.data._id, {
      withCredentials: true
    })
      .then(res => {
        Cookies.remove("shouldBeLoggedIn");
        setUser({
          authed: false,
          data: null
        })
        setLocation('/profile/delete/confirmation');
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleDeleteAnon = (event) => {
    event.preventDefault();
    axios.delete(process.env.REACT_APP_SERVER_URI + "/users/" + user.data._id + "/anonymizedDestroy", {withCredentials: true})
      .then(res => {
        Cookies.remove("shouldBeLoggedIn");
        setUser({
          authed: false,
          data: null
        })
        setLocation('/profile/delete/confirmation');
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/profile">
          Profile
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/profile/delete">
          Delete
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em"}}>
        <InsetText>
            <p>
              Are you sure you want to delete your account? You have got 2 options for account deletion:
            </p>
        </InsetText>

        <WarningCallout label="Full deletion">
          <p>
            To access the workbook again after your account deletion, you will have to create a new account. All your data will be fully deleted.
          </p>
          <Button secondary onClick={handleDeleteFull}>Full deletion</Button>
        </WarningCallout>

        <WarningCallout label="Anonymization deletion">
          <p>
            Your data will be anonymized.
            <br/>
            This way, we will be able to continue analyzing your progress through the workbook, without the risk of somebody tracing anything back to you.
          </p>
          <Button secondary onClick={handleDeleteAnon}>Delete by anonymizatin</Button>
        </WarningCallout>

      </Container>
    </React.Fragment>
  );
}

export default Delete
