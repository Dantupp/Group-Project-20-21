import React from "react"
import {
  Button,
  Row,
  Col,
  Container,
  Panel,
  Breadcrumb,
  Hint
} from 'nhsuk-react-components';
import { useEffect, useState } from 'react';
import axios from "axios"
import SyncLoader from "react-spinners/SyncLoader";
import { Link } from "wouter";
import { Route } from "wouter";
import NewWorkbook from "./NewWorkbook"
import ModifyWorkbook from "./ModifyWorkbook";
import ModifyPage from "./ModifyPage";
import AllPages from "./AllPages";
import NewPage from "./NewPage";
import { Hero } from 'nhsuk-react-components';

function Editor() {
  const [allWorkbooks, setAllWorkbooks] = useState()
  const [message, setMessage] = useState()

  const getWorkbooks = () => {
    setMessage(
      <React.Fragment>
        <p>Updating...</p>
        <SyncLoader/>
      </React.Fragment>
    )
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/workbooks",
      { withCredentials: true }
    ).then(res => {
      setAllWorkbooks(res.data);
      setMessage()
    }).catch(() => {
      setMessage(<p>Something went wrong when updating.</p>)
    })
  }

  useEffect(() => {
    getWorkbooks()
  }, [])

  const handleWorkbookRemoval = (event) => {
    if (window.confirm("Are you sure you want to delete this workbook?")) {
      axios.delete(
        process.env.REACT_APP_SERVER_URI + "/workbooks/" + event.target.id,
        { withCredentials: true }
      ).then(() => {
        getWorkbooks()
      }).catch(error => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      })
    }
  }

  let Workbooks = (
    <Col width="full" style={{marginBottom: "1em"}}>
      <h2>Loading...</h2>
      <SyncLoader />
    </Col>
  )
  
  if (allWorkbooks) {
    Workbooks = allWorkbooks.map(workbook => {
      return (
        <Col key={workbook.id} width="one-half">
          <Panel>
            <h2>{workbook.title}</h2>
            <p>{workbook.disease ? workbook.disease.name : "No Disease"}</p>

            <Link to={"/admin/editor/modify-workbook/" + workbook.id}>
              <Button id={workbook.id}  style={{marginRight: "0.5em"}}>
                Modify
              </Button>
            </Link>
            <Button secondary id={workbook.id} onClick={handleWorkbookRemoval}>
              Remove
            </Button>
          </Panel>
        </Col>
      )
    })
  }
  
  return (
    <React.Fragment>
      <Hero>
          <Hero.Heading>Editor</Hero.Heading>
          <Hero.Text>Workbooks management: add, remove or edit workbooks.</Hero.Text>
      </Hero>

      <Route path="/admin/editor/new-workbook">
       <NewWorkbook getWorkbooks={getWorkbooks} />
      </Route>
      <Route path="/admin/editor/modify-workbook/:workbookId?">
        <ModifyWorkbook workbooks={allWorkbooks} getWorkbooks={getWorkbooks} />
      </Route>
      <Route path="/admin/editor/new-page">
        <NewPage getWorkbooks={getWorkbooks} />
      </Route>
      <Route path="/admin/editor/modify-page/:pageId?">
        <ModifyPage workbooks={allWorkbooks} getWorkbooks={getWorkbooks} />
      </Route>
      <Route path="/admin/editor/all-pages">
        <AllPages getWorkbooks={getWorkbooks} />
      </Route>
      
      <Route path="/admin/editor">
        <Breadcrumb>
          <Breadcrumb.Item asElement={Link} to="/">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item asElement={Link} to="/admin">
            Admin
          </Breadcrumb.Item>
          <Breadcrumb.Item asElement={Link} to="/admin/editor">
            Editor
          </Breadcrumb.Item>
        </Breadcrumb>

        <Container style={{marginTop: "1em"}}>
          <h1>Manage Workbooks</h1>

          <Row>
            <Col width="full">
              <Link to="/admin/editor/new-workbook">
                <Button style={{marginRight: "0.5em"}}>New Workbook</Button>
              </Link>
              <Link to="/admin/editor/new-page">
                <Button style={{marginRight: "0.5em"}}>New Page</Button>
              </Link>
              <Link to="/admin/editor/all-pages">
                <Button>All Pages</Button>
              </Link>
            </Col>
          </Row>

          { message ? <Row><Col width="full">{message}</Col></Row> : null }
          <Row>
            <Col width="full">
              <Hint style={{marginBottom: 0}}>
                Removing a workbook does not delete the pages associated with
                it, these pages will still be available for other and new
                workbooks.
              </Hint>
            </Col>
            {Workbooks}
          </Row>
        </Container>
      </Route>
    </React.Fragment>
  );
}

export default Editor;
