import React, { useState } from "react";
import {
  Breadcrumb,
  Container,
  Select,
  Form,
  Button
} from "nhsuk-react-components";
import { Link, useLocation } from "wouter"
import axios from "axios"

function NewPage(props) {
  const [, setLocation] = useLocation()
  const [message, setMessage] = useState()
  const [
    formSelectedPageTypeId,
    setFormSelectedPageTypeId
  ] = useState("content")
  const [pageTypes] = useState([
    {
      "id": "content",
      "name": "Content"
    }
  ])

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios.post(
      process.env.REACT_APP_SERVER_URI + "/pages",
      {
        type: formSelectedPageTypeId
      },
      { withCredentials: true }
    ).then(res => {
      props.getWorkbooks()
      setLocation("/admin/editor/modify-page/" + res.data.id)
    }).catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      setMessage("Something went wrong.")
    })
  }

  const PageTypeComponent = pageTypes.map(pageType => {
    return (
      <Select.Option
        key={pageType.id}
        value={pageType.id}
        required
      >
        {pageType.name}
      </Select.Option>
    )
  })

  return (
    <React.Fragment>
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
        <Breadcrumb.Item asElement={Link} to="/admin/editor/new-page">
          New Page
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        <h1>New Page</h1>
        <Form onSubmit={handleFormSubmit}>
          <Select
            onChange={(event) => setFormSelectedPageTypeId(event.target.value)}
            required
            label="Select page type."
            value={formSelectedPageTypeId} 
          >
            {PageTypeComponent}
          </Select>
          <Button type="submit">
            Create
          </Button>
          {message ? <p>{message}</p> : null}
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default NewPage;
