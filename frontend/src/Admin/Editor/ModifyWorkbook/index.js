import {
  Breadcrumb,
  Col,
  Container,
  Form,
  Input,
  Row,
  Button,
  Panel,
  InsetText
} from "nhsuk-react-components";
import React, { useState } from "react"
import { Redirect, useRoute, Link } from 'wouter';
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import Pages from "./pages";

function ModifyWorkbook(props) {
  const [, params] = useRoute("/admin/editor/modify-workbook/:workbookId");
  const [message, setMessage] = useState()
  const [workbook, setWorkbook] = useState()
  const [formWorkbookTitle, setFormWorkbookTitle] = useState(null)

  if (!params || !params.workbookId) {
    // Redirect to editor.
    return <Redirect to="/admin/editor" />
  }

  if (props.workbooks) {
    // Find the workbook.
    let workbookSearchResult = props.workbooks.find(
      workbook => workbook.id === params.workbookId
    )

    if (workbookSearchResult) {
      if (workbookSearchResult !== workbook) {
        setWorkbook(workbookSearchResult)
      }
      if (formWorkbookTitle === null) {
        setFormWorkbookTitle(workbookSearchResult.title)
      }
    } else {
      // Redirect to editor.
      return <Redirect to="/admin/editor" />
    }
  }

  const handleTitleChange = (event) => {
    event.preventDefault()
    setMessage("Updating...")

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/workbooks/" + workbook.id,
      {
        title: formWorkbookTitle
      },
      { withCredentials: true }
    ).then(() => {
      props.getWorkbooks()
      setMessage("Successfully updated the title.")
      // Clear message after 3 seconds.
      setTimeout(function() {
        setMessage()
      }, 3000);
    }).catch(() => {
      setMessage("Something went wrong.")
    })
  }

  let Content = (
    <React.Fragment>
      <Row>
        <Col width="full" style={{marginBottom: "1em"}}>
          <h2>Loading...</h2>
          <SyncLoader />
        </Col>
      </Row>
    </React.Fragment>
  )

  if (workbook) {
    Content = (
      <React.Fragment>
        <h1>Modify Workbook</h1>
        { message ? <InsetText ><p>{message}</p></InsetText> : null }
        <Row>
          <Col width="one-half">
            <Panel style={{marginTop: "0em", marginBottom: "1em"}}>
              <Form onSubmit={handleTitleChange}>
                <Input
                  type="text"
                  width={10}
                  label={<h4>Title</h4>}
                  value={formWorkbookTitle}
                  onChange={event => setFormWorkbookTitle(event.target.value)}
                  required
                />
                <Button
                  style={{marginBottom: 0}}
                  disabled={formWorkbookTitle === workbook.title}>
                  Update Title
                </Button>
              </Form>
            </Panel>
          </Col>
          <Col width="one-half">
            <Panel style={{marginTop: "0em", marginBottom: "1em"}}>
              <h4>Disease</h4>
              <p>{workbook.disease ? workbook.disease.name : "No disease."}</p>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col width="full">
            {
              workbook.disease ? 
                <Pages
                  workbook={workbook}
                  getWorkbooks={props.getWorkbooks}
                  editor={true}
                />
              :
                <p>A workbook needs a disease before pages can be added.</p>
            }
            
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Link to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Link>
        <Link to="/admin">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
        </Link>
        <Link to="/admin/editor">
          <Breadcrumb.Item>Editor</Breadcrumb.Item>
        </Link>
        <Link to={"/admin/editor/modify-workbook/" + params.workbookId }>
          <Breadcrumb.Item>Modify Workbook</Breadcrumb.Item>
        </Link>
      </Breadcrumb>

      <Container style={{marginTop: "1em"}}>
        {Content}
      </Container>
    </React.Fragment>
  );
}

export default ModifyWorkbook;
