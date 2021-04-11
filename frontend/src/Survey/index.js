import React, {useState, useContext, useEffect} from "react";
import { Container, Form, Button, Hero, ErrorMessage, Fieldset, Radios, Select } from "nhsuk-react-components";
import { UserContext } from '../UserContext';
import axios from "axios";
import {useLocation} from 'wouter';
import SyncLoader from "react-spinners/SyncLoader";

function Survey() {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [genderId, setGenderId] = useState();
  const [user, setUser] = useContext(UserContext);
  const [, setLocation] = useLocation()
  const [surveyError, setSurveyError] = useState("")
  const [diseasesList, setDiseasesList] = useState([])
  const [gendersList, setGendersList] = useState([])
  const [loadingStatus, setLoadingStatus] = useState("no-request")

  useEffect(() => {
    if (user.data.diseases && user.data.diseases.length > 0 && user.data.gender) {
      setLocation("/workbook")
      return
    }

    if (loadingStatus === "no-request") {
      setLoadingStatus("in-progress")
      axios.all([
        axios.get(
          process.env.REACT_APP_SERVER_URI + "/diseases",
          { withCredentials: true }
        ),
        axios.get(
          process.env.REACT_APP_SERVER_URI + "/genders",
          { withCredentials: true }
        )
      ]).then(axios.spread((diseasesRes, gendersRes) => {
        setDiseasesList(diseasesRes.data)
        setGendersList(gendersRes.data)
        setLoadingStatus("success")
      })).catch(() => {
        setLoadingStatus("failure")
      })
    }
  }, [loadingStatus, user.data.diseases, user.data.gender, setLocation])

  if (loadingStatus === "no-request" || loadingStatus === "in-progress") {
    return (
      <React.Fragment>
        <Container style={{
          marginTop: "1em",
          marginBottom: "1em"
        }}>
          <h1>
            Loading...
          </h1>
          <SyncLoader />
        </Container>
      </React.Fragment>
    )
  } else if (loadingStatus === "failure") {
    <React.Fragment>
      <Container style={{
        marginTop: "1em",
        marginBottom: "1em"
      }}>
        <h1>
          Something went wrong!
        </h1>
      </Container>
    </React.Fragment>
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let selectedDiseaseArray = [];
    selectedDiseaseArray.push(selectedDisease);

    let update = {
      gender: genderId,
      diseases: selectedDiseaseArray
    }

    axios.put(
      process.env.REACT_APP_SERVER_URI + "/users/" + user.data._id + "/updateSensitive",
      update,
      {
        withCredentials: true
      }
    ).then(res => {
      setSurveyError("");
      setUser({
        authed: true,
        data: res.data
      })
    }).catch(error => {
      setSurveyError(error.response.data.data[0].messages[0].message)
    })
  }

  const genderOptions = gendersList.map(gender => {
    return (
      <Select.Option
        value={gender.id}
        required
        key={gender.id}
      >
        {gender.name}
      </Select.Option>
    )
  })

  const diseaseOptions = diseasesList.map(disease => {
    return (
      <Radios.Radio
        id={disease.id}
        name={disease.name}
        onChange={(event) => {setSelectedDisease(event.target.id)}}
        checked={selectedDisease === disease.id ? true : false }
        key={disease.id}
      >
        {disease.name}
      </Radios.Radio>
    )
  })

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Personal details</Hero.Heading>
        <Hero.Text>For a tailored workbook experience, please complete this form with your personal details.</Hero.Text>
      </Hero>
      <Container style={{ marginTop: "1em" }}>
        {surveyError !==("") ? <ErrorMessage>{surveyError}</ErrorMessage> : <></>}
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <Fieldset.Legend>What is your gender?</Fieldset.Legend>
            <Select
              hint="Please select the gender which best represents you."
              onChange={(event) => setGenderId(event.target.value)}
              required
              defaultValue="--- Select Gender ---"
            >
              <Select.Option
                required
                disabled
              >
                --- Select Gender ---
              </Select.Option>
              {genderOptions}
            </Select>
          </Fieldset>

          <Fieldset>
            <Fieldset.Legend>What is your genetic disease?</Fieldset.Legend>
            <Radios
              hint="If you have more than 1 disease, you can select all options that are relevant to you."
            >
              {diseaseOptions}
            </Radios>
          </Fieldset>

          <Button className="surveyButton" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </React.Fragment>

  );
}

export default Survey;
