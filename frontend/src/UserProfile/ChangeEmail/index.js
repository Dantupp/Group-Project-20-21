import React, {useState, useContext} from 'react';
import { Form, Input, Button, Breadcrumb, Container, ErrorMessage } from 'nhsuk-react-components';
import { Link } from "wouter";
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { useLocation } from "wouter";

function UpdateEmail() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [, setLocation] = useLocation()
  const [emailChangeError, setEmailChangeError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let updateUser = {
      email: email,
      confirmEmail: confirmEmail,
      currentPassword: password
    }

    axios.put(process.env.REACT_APP_SERVER_URI + "/users/" + user.data._id, updateUser, {
      withCredentials: true
    })
      .then(res => {
        setEmailChangeError("");
        setUser({
          authed: true,
          data: res.data
        })
        setLocation('/profile/change-email/confirmation');
      })
      .catch(error => {
        console.log(error);
        setEmailChangeError(error.response.data.message[0].messages[0].message);
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
        <Breadcrumb.Item asElement={Link} to="/profile/change-email">
          Change email
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em"}}>
        { emailChangeError !==("") ? <ErrorMessage>{emailChangeError}</ErrorMessage> : <></> }
        <h2>Change email</h2>

        <Form onSubmit={handleSubmit}>
          <Input
            id="current-password"
            label="Current password"
            type="password"
            autoComplete="current-password"
            value={password}
            required
            width={10}
            onChange={event => setPassword(event.target.value)}
          />
          <Input
            id="new-email"
            label="New email"
            autoComplete="email"
            value={email}
            required
            type="email"
            width={10}
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            id="confirmEmail"
            label="Confirm email"
            autoComplete="email"
            value={confirmEmail}
            required
            type="email"
            width={10}
            onChange={event => setConfirmEmail(event.target.value)}
          />
          <Button>
            Change email
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default UpdateEmail
