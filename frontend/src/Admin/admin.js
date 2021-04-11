import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Hero
} from 'nhsuk-react-components';
import { Link } from "wouter";

function AdminComponent() {
  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Admin Area</Hero.Heading>
        <Hero.Text>Add, remove or edit workbooks. View analytics. Modify Diseases.</Hero.Text>
      </Hero>

      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin">Admin</Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{ marginTop: "2em" }}>
        <Row>
          <Col width="full">
            <Link to="/admin/editor">
              <Button style={{marginRight: "1em"}}>Editor</Button>
            </Link>
            <Link to="/admin/analytics">
              <Button style={{marginRight: "1em"}}>Analytics</Button>
            </Link>
            <Link to="/admin/diseases">
              <Button style={{marginRight: "1em"}}>Diseases</Button>
            </Link>
            <Link to="/admin/genders">
              <Button>Genders</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AdminComponent;
