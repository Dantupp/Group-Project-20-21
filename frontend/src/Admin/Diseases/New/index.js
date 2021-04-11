import {
  Breadcrumb,
  Container,
  Form,
  Button,
  Input
} from 'nhsuk-react-components';
import { Link, useLocation } from 'wouter';
import React, { useState } from 'react'
import axios from "axios"

function NewDisease(props) {
  const [formDiseaseName, setFormDiseaseName] = useState("");
  const [formMessage, setFormMessage] = useState();
  const [, setLocation] = useLocation()

  const handleNewDiseaseSubmit = (event) => {
    event.preventDefault()

    axios.post(
      process.env.REACT_APP_SERVER_URI + "/diseases",
      {
        name: formDiseaseName
      },
      { withCredentials: true }
    ).then(res => {
      setFormMessage("Disease added.")
      props.getDiseases()
      setLocation("/admin/diseases")
    }).catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      setFormMessage("Something went wrong.")
    })
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin">
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin/diseases">
          Diseases
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin/diseases/new">
          New
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        <h1>New Disease</h1>

        {
          formMessage && formMessage !== "" ?
          <p>{formMessage}</p> : ""
        }

        <Form onSubmit={handleNewDiseaseSubmit}>
          <Input
            type="text"
            width={10}
            label={<h4>Name</h4>}
            value={formDiseaseName}
            onChange={event => setFormDiseaseName(event.target.value)}
          />
          <Button type="submit">
            New
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default NewDisease;
