import React, {useState, useContext} from 'react';
import {
  Form,
  Input,
  Button,
  Breadcrumb,
  Container,
  ErrorMessage
} from 'nhsuk-react-components';
import { Link, useLocation } from "wouter";
import { UserContext } from '../../UserContext';
import axios from 'axios';

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [, setLocation] = useLocation()
  const [changePassError, setChangePassError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let updateUser = {
      password: password,
      confirmPassword: confirmPassword,
      currentPassword: currentPassword
    }

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/users/" + user.data._id,
      updateUser,
      {
        withCredentials: true
      })
      .then(res => {
        setChangePassError("");
        setUser({
          authed: true,
          data: res.data
        })
        setLocation('/profile/change-password/confirmation');
      })
      .catch(error => {
        console.log(error.response);
        setChangePassError(error.response.data.data[0].messages[0].message);
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
        <Breadcrumb.Item asElement={Link} to="/profile/change-password">
          Change password
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em"}}>
        { changePassError !==("") ? <ErrorMessage>{changePassError}</ErrorMessage> : <></> }
        <h2>Change password</h2>

        <Form onSubmit={handleSubmit}>
          <Input
            id="password"
            label="Current password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            required
            width={10}
            onChange={event => setCurrentPassword(event.target.value)}
          />
          <Input
            id="new-password"
            label="New password"
            type="password"
            autoComplete="new-password"
            value={password}
            required
            onChange={event => setPassword(event.target.value)}
            width={10}
          />
          <Input
            id="confirm-password"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            required
            onChange={event => setConfirmPassword(event.target.value)}
            width={10}
          />
          <Button>
            Change password
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default UpdatePassword
