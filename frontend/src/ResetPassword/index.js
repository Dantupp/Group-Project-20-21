import React, {useState} from 'react';
import { Form, Input, Button, Breadcrumb, Container, ErrorMessage } from 'nhsuk-react-components';
import { Link } from "wouter";
import axios from 'axios';
import { useLocation } from "wouter";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setLocation] = useLocation()
  const [changePassError, setChangePassError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const urlCode = new URLSearchParams(window.location.search);
    var code = urlCode.get('code');
    console.log(code);

    let updateUser = {
      code: code,
      password: password,
      passwordConfirmation: confirmPassword
    }

    axios.post(process.env.REACT_APP_SERVER_URI + "/auth/reset-password", updateUser)
    .then(() => {
      setChangePassError("");
      setLocation('/');
    })
    .catch(error => {
      console.log(error.response);
      setChangePassError(error.response.data.message[0].messages[0].message);
    })
  }

  return (
    <React.Fragment>
        <Breadcrumb>
            <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item asElement={Link} to="/profile">Profile</Breadcrumb.Item>
        </Breadcrumb>

        <Container style={{marginTop: "1em"}}>
            { changePassError !==("") ? <ErrorMessage>{changePassError}</ErrorMessage> : <></> }
            <h2>Reset password</h2>

            <Form onSubmit={handleSubmit}>
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
                Reset password
            </Button>
            </Form>
        </Container>
    </React.Fragment>
  );
}

export default UpdatePassword
