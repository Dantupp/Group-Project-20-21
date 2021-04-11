import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Container,
  Hero,
  Button,
  Table,
  WarningCallout
} from "nhsuk-react-components"
import { Link, Route } from 'wouter';
import SyncLoader from "react-spinners/SyncLoader";
import AddGender from "./Add"
import RenameGender from './Rename';
import axios from "axios"

export default function Genders () {
  const [gendersFetchStatus, setGendersFetchStatus] = useState("no-request")
  const [genders, setGenders] = useState()

  const getGenders = () => {
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/genders",
      { withCredentials: true }
    ).then(res => {
      if (res.data) {
        setGenders(res.data)
        setGendersFetchStatus("success")
      }
    }).catch(() => {
      setGendersFetchStatus("error")
    })
  }

  useEffect(() => {
    getGenders()
  }, [])

  const handleGenderRemoval = (event) => {
    if (window.confirm("Are you sure you want to remove this gender?")) {
      axios.delete(
        process.env.REACT_APP_SERVER_URI + "/genders/" + event.target.id,
        { withCredentials: true }
      ).then(() => {
        getGenders()
      }).catch(error => {
        if (
          error.response &&
          error.response.data.message[0].messages &&
          error.response.data.message[0].messages[0].message
        ) {
          alert(error.response.data.message[0].messages[0].message)
        } else {
          alert("Something went wrong.")
        }
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      })
    }
  }

  let GendersList = (
    <React.Fragment>
      <h2>Loading...</h2>
      <SyncLoader />
    </React.Fragment>
  )
  if (gendersFetchStatus === "error") {
    GendersList = <h2>Something went wrong...</h2>
  } else if (gendersFetchStatus === "success") {
    if (genders.length > 0) {
      let GendersListTemp = []
      genders.forEach(gender => {
        GendersListTemp.push(
          <Table.Row key={gender.id}>
            <Table.Cell><h3>{gender.name}</h3></Table.Cell>
            <Table.Cell>
              <Link to={"/admin/genders/rename/" + gender.id}>
                <Button style={{margin: "0 1em 0 0"}}>Rename</Button>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Button
                secondary
                id={gender.id}
                onClick={handleGenderRemoval}
                style={{margin: 0}}
              >
                Remove
              </Button>
            </Table.Cell>
          </Table.Row>
        )
      });

      GendersList = (
        <Table.Panel heading="Genders">
          <Table>
            <Table.Body>
              {GendersListTemp}
            </Table.Body>
          </Table>
        </Table.Panel>
      )
    } else {
      GendersList = (
        <React.Fragment>
          <h2>No genders.</h2>
        </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Genders</Hero.Heading>
        <Hero.Text>
          Gender management: add, remove or edit genders.
        </Hero.Text>
      </Hero>

      <Route path="/admin/genders/add">
        <AddGender getGenders={getGenders} />
      </Route>
      <Route path="/admin/genders/rename/:genderId">
        {params => <RenameGender
          getGenders={getGenders}
          genderId={params.genderId}
          genders={genders}
        />}
      </Route>

      <Route path="/admin/genders">
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
        </Breadcrumb>

        <Container style={{marginTop: "1em", marginBottom: "1em"}}>
          <h1>Manage Genders</h1>

          <Link to="/admin/genders/add">
            <Button>Add Gender</Button>
          </Link>

          <WarningCallout label="Warning">
            <p>
              Modifying genders will be shown instantly to all users. Deleting
              a gender will result in users who previously had that gender
              selected to have to reselect their disease and gender the next
              time they sign in.
            </p>
          </WarningCallout>

          {GendersList}
        </Container>
      </Route>
    </React.Fragment>
  );
}