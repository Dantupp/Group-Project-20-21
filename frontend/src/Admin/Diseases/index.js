import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Container,
  Hero,
  Table,
  Button,
  WarningCallout
} from "nhsuk-react-components"
import { Link, Route } from 'wouter';
import axios from "axios"
import SyncLoader from "react-spinners/SyncLoader";
import NewDisease from "./New"
import RenameDisease from './Rename';

function Diseases() {
  const [diseasesFetchStatus, setDiseasesFetchStatus] = useState("no-request")
  const [diseases, setDiseases] = useState()

  const getDiseases = () => {
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/diseases",
      { withCredentials: true }
    ).then(res => {
      if (res.data) {
        setDiseases(res.data)
        setDiseasesFetchStatus("success")
      }
    }).catch(() => {
      setDiseasesFetchStatus("error")
    })
  }

  useEffect(() => {
    getDiseases()
  }, [])

  const handleDiseaseRemoval = (event) => {
    if (window.confirm("Are you sure you want to remove this disease?")) {
      axios.delete(
        process.env.REACT_APP_SERVER_URI + "/diseases/" + event.target.id,
        { withCredentials: true }
      ).then(() => {
        getDiseases()
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

  let DiseasesList = (
    <React.Fragment>
      <h2>Loading...</h2>
      <SyncLoader />
    </React.Fragment>
  )
  if (diseasesFetchStatus === "error") {
    DiseasesList = <h2>Something went wrong...</h2>
  } else if (diseasesFetchStatus === "success") {
    if (diseases.length > 0) {
      let DiseasesListTemp = []
      diseases.forEach(disease => {
        DiseasesListTemp.push(
          <Table.Row key={disease.id}>
            <Table.Cell><h3>{disease.name}</h3></Table.Cell>
            <Table.Cell>
              <Link to={"/admin/diseases/rename/" + disease.id}>
                  <Button style={{margin: "0 1em 0 0"}}>Rename</Button>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Button
                secondary
                id={disease.id}
                onClick={handleDiseaseRemoval}
                style={{margin: 0}}
              >
                Remove
              </Button>
            </Table.Cell>
          </Table.Row>
        )
      });

      DiseasesList = (
        <Table.Panel heading="Diseases">
          <Table>
            <Table.Body>
              {DiseasesListTemp}
            </Table.Body>
          </Table>
        </Table.Panel>
      )
    } else {
      DiseasesList = (
        <React.Fragment>
          <h2>No Diseases.</h2>
        </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Diseases</Hero.Heading>
        <Hero.Text>
          Diseases management: add, remove or edit diseases.
        </Hero.Text>
      </Hero>

      <Route path="/admin/diseases/new">
        <NewDisease getDiseases={getDiseases} />
      </Route>
      <Route path="/admin/diseases/rename/:diseaseId">
        {params => <RenameDisease
          getDiseases={getDiseases}
          diseaseId={params.diseaseId}
          diseases={diseases}
        />}
      </Route>

      <Route path="/admin/diseases">
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
        </Breadcrumb>

        <Container style={{marginTop: "1em", marginBottom: "1em"}}>
          <h1>Manage Diseases</h1>

          <Link to="/admin/diseases/new">
            <Button>New Disease</Button>
          </Link>

          <WarningCallout label="Warning">
            <p>
              Modifying diseases will be shown instantly to all users. Deleting
              a disease will result in users who previously had that disease
              selected to have to reselect their disease and gender the next
              time they sign in.
            </p>
          </WarningCallout>

          {DiseasesList}
        </Container>
      </Route>
    </React.Fragment>
  );
}

export default Diseases;
