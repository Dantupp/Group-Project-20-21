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

function AddGender(props) {
  const [formGenderName, setFormGenderName] = useState("");
  const [formMessage, setFormMessage] = useState();
  const [, setLocation] = useLocation()

  const handleAddGenderSubmit = (event) => {
    event.preventDefault()

    axios.post(
      process.env.REACT_APP_SERVER_URI + "/genders",
      {
        name: formGenderName
      },
      { withCredentials: true }
    ).then(res => {
      setFormMessage("Gender added.")
      props.getGenders()
      setLocation("/admin/genders")
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
        <Breadcrumb.Item asElement={Link} to="/admin/genders">
          Genders
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin/genders/add">
          Add
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        <h1>Add Gender</h1>

        {
          formMessage && formMessage !== "" ?
          <p>{formMessage}</p> : ""
        }

        <Form onSubmit={handleAddGenderSubmit}>
          <Input
            type="text"
            width={10}
            label={<h4>Name</h4>}
            value={formGenderName}
            onChange={event => setFormGenderName(event.target.value)}
          />
          <Button type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default AddGender;
