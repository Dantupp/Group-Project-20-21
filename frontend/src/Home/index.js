import React from "react";
import { Container, Hero, Row, Col, Panel } from 'nhsuk-react-components';
import { Link } from "wouter";
import { UserContext } from '../UserContext';

function Home() {
    return (

        <UserContext.Consumer>
            {([user]) => (


    <React.Fragment>
      <Hero>
        <Hero.Heading>Genetic Test Result Sharing</Hero.Heading>
        <Hero.Text>Helping you understand the importance of sharing your genetic test results with your relatives.</Hero.Text>
      </Hero>
      <Container style={{marginTop: "1em"}}>
        <Row>
                  <Col width="full">
                      <h1 style={{ marginTop: '20px' }}>Welcome to Genetic Test Result Sharing!</h1>
                      <h3 style={{ textAlign: "justify" }}>Have you been identified with a genetic disorder and been adviced by your health professional to share this test result with your relatives?</h3>
                      <h3>Are you unaware of how this test result could affect them?</h3>
                      <h3>Are you afraid to share this test result with them?</h3>
                      <h3>You cannot find the best circumstances to do so?</h3>

                      <Panel label="About this website">
                          <h3 style={{ textAlign: "justify" }}>The purpose of this website is to inform patients identified to have a genetic disorder of the importance of sharing their genetic test results with their relatives. The patients are guided through the process of sharing genetic diagnosis with potentially affected relatives.</h3>
                          <h3 style={{ textAlign: "justify" }}>As part of this educational experience, the patients have to complete an interactive workbook*.</h3>
                          <p>*For a tailored user experience, we will ask for the patient's gender and identified genetic disease.</p>
                      </Panel>

                      {
                          user.authed ?
                              <h3></h3>
                          :
                              <h3><Link to="/register">Register</Link> or <Link to="/login">Log in</Link> to access the workbook.</h3>
                      }

          </Col>
        </Row>
      </Container>
    </React.Fragment>
            )}
        </UserContext.Consumer>
    );
}

export default Home;