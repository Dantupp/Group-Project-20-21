import React from 'react';
import { Hero, Breadcrumb, Container, CareCard } from "nhsuk-react-components";
import { Link } from "wouter";

function Contact() {

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Contact</Hero.Heading>
        <Hero.Text>Ask general queries, report issues or give feedback.</Hero.Text>
      </Hero>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/contact">
          Contact
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <CareCard type="non-urgent">
          <CareCard.Heading>Members of the public, patients, and their representatives should contact the website's administrator</CareCard.Heading>
          <CareCard.Content>
            <b style={{ fontSize: '20px' }}>Dr Lisa Ballard</b>
            <p><b>Email: </b><a href="mailto:l.ballard@soton.ac.uk">l.ballard@soton.ac.uk</a></p>
            <p>DHealthPsy</p>
            <p>Health  Psychologist and Wellcome Trust  Research  Fellow, Clinical  Ethics  and  Law  (CELS)</p>
            <p>Centre  for Cancer Immunology, University of Southampton, Southampton General Hospital</p>

          </CareCard.Content>
        </CareCard>
      </Container>

    </React.Fragment>
  )

}

export default Contact
