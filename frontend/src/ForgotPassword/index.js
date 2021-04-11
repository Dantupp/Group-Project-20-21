import React, { useState } from 'react';
import { Container, Form, Input, Button, Hero, Breadcrumb, ErrorMessage } from 'nhsuk-react-components';
import axios from "axios";
import { Link } from "wouter";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      identifier: email
    }

    axios.post(process.env.REACT_APP_SERVER_URI + "/auth/forgot-password", user)
    .then(() => {
      setSubmitted(true);
      console.log(submitted);
    })
    .catch(error => {
      console.log(error.response.data.message);
      setError(error.response.data.message[0].messages[0].message);
    })
  }

  return (
  <React.Fragment>
    <Hero>
      <Hero.Heading>Forgotten Password</Hero.Heading>
      <Hero.Text>Enter you email to reset your password.</Hero.Text>
    </Hero>
    <Breadcrumb>
      <Breadcrumb.Item asElement={Link} to="/">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item asElement={Link} to="/login">
        Login
      </Breadcrumb.Item>
      <Breadcrumb.Item asElement={Link} to="/forgot-password">
        Forgot Password
      </Breadcrumb.Item>
    </Breadcrumb>
    <Container style={{marginTop: "1em"}}>
      {submitted !==("") ? <p>An email has been sent to the address given</p> :
        <div>
          { Error !==("") ? <ErrorMessage>{Error}</ErrorMessage> : <></> }
          <Form onSubmit={handleSubmit}>
            <Input
              id="login-email"
              name="email"
              value={email}
              autoComplete="username"
              label="Email"
              type="email"
              required
              width={10}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button>
              Reset Password
            </Button>
          </Form>
        </div>
      }
    </Container>
  </React.Fragment>
  )
}

export default ForgotPassword;