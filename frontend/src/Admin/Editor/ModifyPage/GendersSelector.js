import React, { useEffect, useState } from "react"
import {
  Button,
  Checkboxes,
  Fieldset,
  Form,
  ErrorMessage
} from "nhsuk-react-components"
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";

function GendersSelector(props) {
  const [genders, setGenders] = useState()
  const [status, setStatus] = useState()
  const [formMessage, setFormMessage] = useState()
  const [formGenders, setFormGenders] = useState()

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/genders"
    ).then(res => {
      setGenders(res.data)
      setStatus("success")
    }).catch(error => {
      setStatus("failure")
    })
  }, [])

  const handleGendersCheckbox = (event) => {
    const item = event.target.id;
    const isChecked = event.target.checked;

    setFormGenders(prevState => ({
      ...prevState,
      [item]: isChecked
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let formGendersAsArray = []
    for (var genderId in formGenders) {
      if (formGenders[genderId]) {
        formGendersAsArray.push(genderId)
      }
    }

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/pages/" + props.page.id,
      {
        genders: formGendersAsArray
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
    genders &&
    status === "success" &&
    props &&
    props.page &&
    props.workbooks
  ) {
    let GenderCheckboxes = []
    if (!formGenders) {
      let tempGenders = {}
      genders.forEach(gender => {
        if (
          props.page.genders.some(pageGender => pageGender.id === gender.id)
        ) {
          tempGenders[gender.id] = true
        } else {
          tempGenders[gender.id] = false
        }
      })
      setFormGenders(tempGenders)
    } else {
      genders.forEach(gender => {
        GenderCheckboxes.push(
          <Checkboxes.Box
            key={gender.id}
            id={gender.id}
            onChange={(event) => handleGendersCheckbox(event)}
            checked={formGenders[gender.id]}
          >
            {gender.name}
          </Checkboxes.Box>
        )
      })
    }

    Content = (
      <Form onSubmit={handleSubmit}>
        <Fieldset aria-describedby="genders-selector">
          <Checkboxes
            name="genders"
            id="genders"
            hint="You can select more than one gender."
          >
            {GenderCheckboxes}
          </Checkboxes>
        </Fieldset>
        <Button>
          Update Genders
        </Button>
        {formMessage ? formMessage : null}
      </Form>
      
    )
  } else if (status === "failure") {
    Content = <p>Something went wrong.</p>
  }

  return (
    <React.Fragment>
      <h2>Genders</h2>
      <p>
        Here you can update the genders this page applies to.
      </p>
      {Content}
    </React.Fragment>
  );
}

export default GendersSelector;
