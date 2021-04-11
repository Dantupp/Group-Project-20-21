import React, {useState, useContext} from 'react';
import { Form, Button, Breadcrumb, Container, ErrorMessage, Select } from 'nhsuk-react-components';
import { Link } from "wouter";
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { useLocation } from "wouter";

function ChangeNotifications() {
  const [frequency, setFrequency] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [, setLocation] = useLocation()
  const [notifsChangeError, setNotifsChangeError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let updateUser = {
      notifications_frequency: {frequency: frequency, time_of_day: timeOfDay}
    }

    axios.put(process.env.REACT_APP_SERVER_URI + "/users/" + user.data._id, updateUser, {
      withCredentials: true
    })
      .then(res => {
        setNotifsChangeError("");
        setUser({
          authed: true,
          data: res.data
        })
        setLocation('/profile/change-notifications/confirmation');
      })
      .catch(error => {
        console.log(error.response);
        setNotifsChangeError(error.response.data.message[0].messages[0].message);
      })
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/profile">
          Profile
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/profile/change-email">
          Change notifications
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em"}}>
        { notifsChangeError !==("") ? <ErrorMessage>{notifsChangeError}</ErrorMessage> : <></> }
        <h2>Change notifications frequency</h2>

        <Form onSubmit={handleSubmit}>
            <Select
                label="Select the frequency"
                required
                defaultValue="--- Select Frequency ---"
                onChange={(event) => setFrequency(event.target.value)}
                >
                <Select.Option required disabled>
                    --- Select Frequency ---
                </Select.Option>
                <Select.Option required value="none">
                    None
                </Select.Option>
                <Select.Option required value="each_day">
                    Each day
                </Select.Option>
                <Select.Option required value="each_week">
                    Each week
                </Select.Option>
            </Select>
            <Select
                label="Select the time of the day"
                required
                defaultValue="--- Select time of the day ---"
                onChange={(event) => setTimeOfDay(event.target.value)}
                >
                <Select.Option required disabled>
                    --- Select time of the day ---
                </Select.Option>
                <Select.Option required value="none">
                    None
                </Select.Option>
                <Select.Option required value="morning">
                    Morning
                </Select.Option>
                <Select.Option required value="evening">
                    Evening
                </Select.Option>
                <Select.Option required value="night">
                    Night
                </Select.Option>
            </Select>
          <Button>
            Change notifications
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default ChangeNotifications;
