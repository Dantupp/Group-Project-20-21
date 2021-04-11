import {
  Breadcrumb,
  Container,
  Form,
  Button,
  Input
} from 'nhsuk-react-components';
import { Link, useLocation } from 'wouter';
import React, { useState } from 'react'
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios"

function RenameDisease(props) {
  const [formDiseaseName, setFormDiseaseName] = useState(null);
  const [formMessage, setFormMessage] = useState();
  const [, setLocation] = useLocation()

  if (!props.diseaseId) {
    setLocation("/admin/diseases")
    return <React.Fragment>Error.</React.Fragment>
  }

  if (props.diseases && formDiseaseName === null) {
    let foundDisease = props.diseases.find(
      disease => disease.id === props.diseaseId
    )
    if (foundDisease) {
      setFormDiseaseName(foundDisease.name)
    } else {
      // A disease has not been found for the ID supplied, redirect to the
      // diseases page.
      setLocation("/admin/diseases")
      return <React.Fragment>Error.</React.Fragment>
    }
  }

  const handleRenameDiseaseSubmit = (event) => {
    event.preventDefault()

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/diseases/" + props.diseaseId,
      {
        name: formDiseaseName
      },
      { withCredentials: true }
    ).then(res => {
      setFormMessage("Disease renamed.")
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
        <Breadcrumb.Item
          asElement={Link}
          to={"/admin/diseases/rename/" + props.diseaseId}
        >
          Rename
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        <h1>Rename Disease</h1>

        {
          formMessage && formMessage !== "" ?
          <p>{formMessage}</p> : ""
        }

        {
          props.diseases ?
            <Form onSubmit={handleRenameDiseaseSubmit}>
              <Input
                type="text"
                width={10}
                label={<h4>Name</h4>}
                value={formDiseaseName}
                onChange={event => setFormDiseaseName(event.target.value)}
                required
              />
              <Button type="submit">
                Rename
              </Button>
            </Form>
          :
            <React.Fragment>
              <h2>Loading...</h2>
              <SyncLoader />
            </React.Fragment>
        }
      </Container>
    </React.Fragment>
  );
}

export default RenameDisease;
