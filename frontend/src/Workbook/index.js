import React, { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Container,
  Hero,
  Row,
  Button,
  Panel,
  ActionLink,
  CareCard
} from 'nhsuk-react-components';
import { UserContext } from '../UserContext';
import { Link } from "wouter";
import axios from 'axios';
import SyncLoader from "react-spinners/SyncLoader";
import Workbook from "./workbook";
import { Redirect, Route } from "wouter";

function WorkbookHome() {
  const [user] = useContext(UserContext);
  const [workbooks, setWorkbooks] = useState([]);
  const [requestStatus, setRequestStatus] = useState("no-request");

  // Prepare to redirect to survey if it's not yet completed.
  let surveyNotCompleted = (
    user.authed &&
    (
      !user.data.gender ||
      !user.data.diseases ||
      user.data.diseases.length === 0
    )
  )

  useEffect(() => {
    if (!surveyNotCompleted) {
      // Get the workbooks for this user. Specified by the disease and gender.
      const urlsToGet = user.data.diseases.map(disease => {
        return axios.get(process.env.REACT_APP_SERVER_URI +
          "/workbooks?disease=" + disease.id +
          "&gender=" + user.data.gender.id,
          { withCredentials: true }
        )}
      )
      axios.all(urlsToGet).then(res => {
        let workbooks = []
        res.forEach(workbook => {
          if (workbook.data[0]) {
            workbooks.push(workbook.data[0])
          }
        })
        setWorkbooks(workbooks)
        setRequestStatus("success")
      }).catch(error => {
        console.log(error)
        setRequestStatus("failed")
      })
    }
  }, [user.data.diseases, user.data.gender, surveyNotCompleted])

  if (surveyNotCompleted) {
    return <Redirect to="/survey" />
  }

  // Set loading view before the workbooks are recieved.
  let Content = (
    <Col width="full">
      <h2>Loading...</h2>
      <SyncLoader />
    </Col>
  )

  // Render the list of workbooks.
  if (requestStatus === "success" && workbooks.length > 0) {
    Content = workbooks.map(workbook => {
      return (
          <Col key={workbook.id} width="one-half" style={{ textAlign: 'center', float: 'none' }} >
          <Panel>
            <h2>{workbook.title}</h2>
            <Link to={"/workbook/" + workbook.id}>
              <Button>Access Workbook</Button>
            </Link>
          </Panel>
        </Col>
      )
    })
  } else if (requestStatus === "success" && workbooks.length === 0) {
    Content = (
      <Col width="full">
        <h2>No workbooks yet :(</h2>
      </Col>
    )
  }

  return (
    <React.Fragment>
      <Route path="/workbook">
        <Hero>
          <Hero.Heading>
            {workbooks.length > 1 ? "Workbooks!" : "Workbook!"}
          </Hero.Heading>
          <Hero.Text>
            Here you can access you personal {workbooks.length > 1 ?
              "workbooks." : "workbook."
            }
          </Hero.Text>
        </Hero>
        <Breadcrumb>
          <Link to="/">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Link>
          <Link to="/workbook">
            <Breadcrumb.Item>Workbook</Breadcrumb.Item>
          </Link>
        </Breadcrumb>
        <Container style={{marginTop: "1em", marginBottom: "1em"}}>
          <Row style={{textAlign: 'center'}}>
            {Content}
          </Row>
        </Container>
      </Route>

      <Route path="/workbook/:workbookId/:pageId?">
        <Workbook workbooks={workbooks}/>
      </Route>

    </React.Fragment>
  );
}

export default WorkbookHome;
