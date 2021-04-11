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

function RenameGender(props) {
  const [formGenderName, setFormGenderName] = useState(null);
  const [formMessage, setFormMessage] = useState();
  const [, setLocation] = useLocation()

  if (!props.genderId) {
    setLocation("/admin/genders")
    return <React.Fragment>Error.</React.Fragment>
  }

  if (props.genders && formGenderName === null) {
    let foundGender = props.genders.find(
      gender => gender.id === props.genderId
    )
    if (foundGender) {
      setFormGenderName(foundGender.name)
    } else {
      // A gender has not been found for the ID supplied, redirect to the
      // genders page.
      setLocation("/admin/genders")
      return <React.Fragment>Error.</React.Fragment>
    }
  }

  const handleRenameGenderSubmit = (event) => {
    event.preventDefault()

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/genders/" + props.genderId,
      {
        name: formGenderName
      },
      { withCredentials: true }
    ).then(res => {
      setFormMessage("Gender renamed.")
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
        <Breadcrumb.Item
          asElement={Link}
          to={"/admin/genders/rename/" + props.genderId}
        >
          Rename
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        <h1>Rename Gender</h1>

        {
          formMessage && formMessage !== "" ?
          <p>{formMessage}</p> : ""
        }

        {
          props.genders ?
            <Form onSubmit={handleRenameGenderSubmit}>
              <Input
                type="text"
                width={10}
                label={<h4>Name</h4>}
                value={formGenderName}
                onChange={event => setFormGenderName(event.target.value)}
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

export default RenameGender;
