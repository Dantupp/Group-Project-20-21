import React, { useState } from "react";
import { Breadcrumb, Container, Hero, Form, Input, Button, ErrorMessage, Row, Col, Panel, Checkboxes, Fieldset } from 'nhsuk-react-components';
import axios from "axios";
import { Link, useLocation } from "wouter";

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAndConds, setTermsAndConds] = useState(false);
  const [dataAgreement, setDataAgreement] = useState(false);
  const [registerError, setRegisterError] = useState("")
  const [, setLocation] = useLocation()

  const handleSubmit = (event) => {
    event.preventDefault();
    let newUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      termsAndConds: termsAndConds,
      dataAgreement: dataAgreement,
      notifications_frequency: {frequency: "each_day", time_of_day: "morning"}
    }

    axios.post(process.env.REACT_APP_SERVER_URI + "/auth/local/register", newUser, { withCredentials: true })
      .then(res => {
        setRegisterError("");
        setLocation('/confirmation');
      })
      .catch(error => {
        setRegisterError(error.response.data.message[0].messages[0].message)
      })
  }

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Register</Hero.Heading>
        <Hero.Text>Register to have access to your personal workbook.</Hero.Text>
      </Hero>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/register">
          Register
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container style={{marginTop: "1em"}}>
        {registerError !==("") ? <ErrorMessage>{registerError}</ErrorMessage> : <></>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col width="one-half"><Panel style={{marginBottom: "10px"}}>
              <Input
                id="register-email"
                name="email"
                value={email}
                label="Email"
                autoComplete="email"
                type="email"
                required
                width={10}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                id="register-password"
                name="password"
                label="Password"
                value={password}
                type="password"
                autoComplete="new-password"
                required
                width={10}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Input
                id="confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                type="password"
                autoComplete="new-password"
                required
                width={10}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Panel></Col>
            <Col width="one-half">
              <Panel>
                <Row>
                  <Col width="full">
                    <Fieldset>
                      <Fieldset.Legend>Privacy agreements</Fieldset.Legend>
                    <Checkboxes>
                      <Checkboxes.Box
                        id="termsAndConds"
                        name="termsAndConds"
                        checked={termsAndConds}
                        required
                        type="checkbox"
                        onChange={(event) => setTermsAndConds(event.target.checked)}
                      >Agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and conditions</a></Checkboxes.Box>
                      <Checkboxes.Box
                        id="dataAgreement"
                        name="dataAgreement"
                        checked={dataAgreement}
                        required
                        type="checkbox"
                        onChange = {(event) => {setDataAgreement(event.target.checked)}}
                      >Agree to the <a href="/data-agreement" target="_blank" rel="noopener noreferrer">Data agreement</a></Checkboxes.Box>
                    </Checkboxes>
                    </Fieldset>
                  </Col>
                </Row>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col width="full">
              <Panel style={{marginTop: "10px", marginBottom: "10px", textAlign: "justify"}}>
                 <b>Email reminders are activated by default.</b> You will get a daily morning reminder about your workbook progress. You will be able to change the frequency of your reminders from you profile settings.
              </Panel>
            </Col>
          </Row>
          <Button>
            Register
          </Button>
        </Form>
      </Container>
  </React.Fragment>
  )
}

export default Register;
