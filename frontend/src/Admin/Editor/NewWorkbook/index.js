import React, { useEffect, useState } from "react"
import {
  Breadcrumb,
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
  Select
} from 'nhsuk-react-components';
import { Link } from "wouter";
import axios from "axios"
import { useLocation } from "wouter";
import SyncLoader from "react-spinners/SyncLoader";

function NewWorkbook(props) {
  const [, setLocation] = useLocation()
  const [message, setMessage] = useState()
  const [formTitle, setFormTitle] = useState("")
  const [formSelectedDiseaseId, setFormSelectedDiseaseId] = useState("")
  const [diseasesAvailable, setDiseasesAvailable] = useState()
  const [
    diseasesAvailableRequestStatus,
    setDiseasesAvailableRequestStatus
  ] = useState()

  useEffect(() => {
    // Get the list of diseases available (those without workbooks already).
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/diseases?workbook_null=true",
      { withCredentials: true }
    ).then(res => {
      setDiseasesAvailable(res.data)
    }).catch(error => {
      setDiseasesAvailableRequestStatus("failure")
    })
  }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios.post(
      process.env.REACT_APP_SERVER_URI + "/workbooks",
      {
        title: formTitle,
        disease: formSelectedDiseaseId
      },
      { withCredentials: true }
    ).then(() => {
      props.getWorkbooks()
      setLocation("/admin/editor")
    }).catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      setMessage("Something went wrong.")
    })
  }

  let Message = null
  if (message) {
    Message = (
      <ErrorMessage>{message}</ErrorMessage>
    )
  }

  let Content = (
    <React.Fragment>
      <p>Loading...</p>
      <SyncLoader />
    </React.Fragment>
  )

  if (diseasesAvailableRequestStatus === "failure") {
    Content = (
      <React.Fragment>
        <p>Something went wrong.</p>
      </React.Fragment>
    )
  }

  if (diseasesAvailable) {
    let DiseaseSelector = <p>
      No diseases available. Please create a new disease first.
    </p>
    if (diseasesAvailable.length > 0) {
      const options = diseasesAvailable.map(disease => {
        return (
          <Select.Option
            value={disease.id}
            key={disease.id}
          >
            {disease.name}          
          </Select.Option>
        )
      })

      DiseaseSelector = (
        <Select
          id="disease-selector"
          label="Select the disease for this workbook."
          onChange={event => setFormSelectedDiseaseId(event.target.value)}
          required
          defaultValue="--- Select Disease ---"
        >
          <Select.Option
            required
            disabled
          >
            --- Select Disease ---
          </Select.Option>
          {options}
        </Select>
      )
    }

    Content = (
      <React.Fragment>
        <h1>New Workbook</h1>
        {Message}
        <Form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            aria-label="Workbook title input"
            width="10"
            label="Workbook Title"
            id="workbook-title"
            value={formTitle}
            required
            onChange={event => setFormTitle(event.target.value)}
          />

          {DiseaseSelector}

          <Button type="submit" disabled={diseasesAvailable.length === 0}>
            Submit
          </Button>
        </Form>
      </React.Fragment>
    )
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
        <Breadcrumb.Item asElement={Link} to="/admin/editor">
          Editor
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin/editor/new-workbook">
          New Workbook
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        {Content}
      </Container>
    </React.Fragment>
  );
}

export default NewWorkbook;
