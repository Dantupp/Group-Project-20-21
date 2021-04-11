import React, { useState, useContext } from 'react';
import { Container, Form, Input, Button, Hero, Breadcrumb, ErrorMessage, Row, Col, Panel } from 'nhsuk-react-components';
import axios from "axios";
import { Link } from "wouter";
import { UserContext } from '../UserContext';
import Cookies from "js-cookie"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useContext(UserContext);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let loginUser = {
      identifier: email,
      password: password
    }

    axios.post(process.env.REACT_APP_SERVER_URI + "/auth/local", loginUser, { withCredentials: true })
      .then(res => {
        Cookies.set("shouldBeLoggedIn", true)
        setLoginError("");
        setUser({
          authed: true,
          data: res.data.user
        });
      })
      .catch(error => {
        if (error.response) {
          if(error.response.data.message[0].messages === undefined){
            setLoginError(error.response.data.message);
          }
          else {
            setLoginError(error.response.data.message[0].messages[0].message);  // it needs to be this ugly
          }
        } else {
          setLoginError("Something went wrong.");
        }
      })
  }

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Login</Hero.Heading>
        <Hero.Text>Access your personal workbook here.</Hero.Text>
      </Hero>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/login">Login</Breadcrumb.Item>
      </Breadcrumb>
      <Container style={{marginTop: "1em"}}>
        { loginError !==("") ? <ErrorMessage>{loginError}</ErrorMessage> : <></> }
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col width="one-third">
              <Panel>
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
                <Input
                  id="login-password"
                  name="password"
                  value={password}
                  label="Password"
                  type="password"
                  required
                  width={10}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Panel>
            </Col>
          </Row>
          <Button>
            Login
          </Button>
        </Form>
        <Link to="/forgot-password">Forgot Password</Link>
      </Container>
    </React.Fragment>
  )
}

export default Login;
