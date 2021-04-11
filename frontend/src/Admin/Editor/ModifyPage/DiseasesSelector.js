import React, { useEffect, useState } from "react"
import {
  Button,
  Checkboxes,
  Fieldset,
  Form,
  WarningCallout,
  ErrorMessage
} from "nhsuk-react-components"
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";

function DiseasesSelector(props) {
  const [diseases, setDiseases] = useState()
  const [status, setStatus] = useState()
  const [formMessage, setFormMessage] = useState()
  const [formDiseases, setFormDiseases] = useState()

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/diseases"
    ).then(res => {
      setDiseases(res.data)
      setStatus("success")
    }).catch(error => {
      setStatus("failure")
    })
  }, [])

  const handleDiseasesCheckbox = (event) => {
    const item = event.target.id;
    const isChecked = event.target.checked;

    setFormDiseases(prevState => ({
      ...prevState,
      [item]: isChecked
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let formDiseasesAsArray = []
    for (var diseaseId in formDiseases) {
      if (formDiseases[diseaseId]) {
        formDiseasesAsArray.push(diseaseId)
      }
    }

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/pages/" + props.page.id,
      {
        diseases: formDiseasesAsArray
      },
      { withCredentials: true }
    ).then(() => {
      props.getWorkbooks()
      setFormMessage(<p>Successfully updated the page.</p>)
      // Clear message after 3 seconds.
      setTimeout(function() {
        setFormMessage()
      }, 3000);
    }).catch(error => {
      let message = "Something went wrong updating the page."
      if (error.response && error.response.data.message[0].messages[0].message) {
        message = error.response.data.message[0].messages[0].message
      }
      setFormMessage(<ErrorMessage>{message}</ErrorMessage>)
    })
  }

  let Content = (
    <React.Fragment>
      <p>Loading...</p>
      <SyncLoader/>
    </React.Fragment>
  )

  // It's possible the page and workbooks have not loaded yet.
  if (
    diseases &&
    status === "success" &&
    props &&
    props.page &&
    props.workbooks
  ) {
    let DiseaseCheckboxes = []
    if (!formDiseases) {
      let tempDiseases = {}
      diseases.forEach(disease => {
        if (
          props.page.diseases.some(pageDisease => pageDisease.id === disease.id)
        ) {
          tempDiseases[disease.id] = true
        } else {
          tempDiseases[disease.id] = false
        }
      })
      setFormDiseases(tempDiseases)
    } else {
      diseases.forEach(disease => {
        // Work out if we need to disable this disease or not (i.e. is this
        // page being used in a workbook with that disease anywhere?)
        let isDisabled = false

        let workbook = props.workbooks.find(workbook => {
          // Check if workbook even has a disease (it should but just in case).
          if (workbook.disease) {
            return workbook.disease.id === disease.id
          } else {
            return false
          }
        });

        if (workbook && workbook.pages) {
          workbook.pages.forEach(page => {
            if (page.id === props.page.id) {
              isDisabled = true
            }
          })
        }

        DiseaseCheckboxes.push(
          <Checkboxes.Box
            key={disease.id}
            id={disease.id}
            onChange={(event) => handleDiseasesCheckbox(event)}
            checked={formDiseases[disease.id]}
            disabled={isDisabled}
          >
            {disease.name}
          </Checkboxes.Box>
        )
      })
    }

    Content = (
      <Form onSubmit={handleSubmit}>
        <Fieldset aria-describedby="diseases-selector">
          <Checkboxes
            name="diseases"
            id="diseases"
            hint="You can select more than one disease."
          >
            {DiseaseCheckboxes}
          </Checkboxes>
        </Fieldset>
        <Button>
          Update Diseases
        </Button>
        {formMessage ? formMessage : null}
      </Form>
      
    )
  } else if (status === "failure") {
    Content = <p>Something went wrong.</p>
  }

  return (
    <React.Fragment>
      <h2>Diseases</h2>
      <p>
        Here you can update the diseases this page applies to.
      </p>
      <WarningCallout label="Warning">
        <p>
          You are not able to remove a disease from a page if it is still being
          used with the workbook associated with that disease. Remove this page
          from the workbook in the "Modify Workbooks" area first.
        </p>
        <p>
          Adding diseases won't automatically add this page to the workbooks,
          you can do this in the "Modify Workbooks" area which allows you to
          specify page order etc.
        </p>
      </WarningCallout>
      {Content}
    </React.Fragment>
  );
}

export default DiseasesSelector;
