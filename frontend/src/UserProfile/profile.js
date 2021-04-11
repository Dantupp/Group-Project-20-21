import React, {useContext} from 'react';
import { SummaryList, BodyText, Container, Breadcrumb } from 'nhsuk-react-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from "wouter";
import { UserContext } from '../UserContext';

function Profile() {
  const [user] = useContext(UserContext);

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/profile">
          Profile
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container style={{marginTop: "1em"}}>
        <SummaryList>
          <SummaryList.Row>
            <SummaryList.Key>User ID</SummaryList.Key>
            <SummaryList.Value>{user.data._id}</SummaryList.Value>
            <SummaryList.Actions/>
          </SummaryList.Row>

          <SummaryList.Row>
            <SummaryList.Key>Disease</SummaryList.Key>
            <SummaryList.Value>
              {
                user.data.diseases && user.data.diseases.length > 0 ?
                  Object.keys(user.data.diseases).map(function(disease){
                    return user.data.diseases[disease]["name"]
                  }).join(", ")
                :
                  "N/A"
              }
            </SummaryList.Value>
            <SummaryList.Actions/>
          </SummaryList.Row>

          <SummaryList.Row>
            <SummaryList.Key>Gender</SummaryList.Key>
            <SummaryList.Value>{user.data.gender && user.data.gender.name ? user.data.gender.name : "N/A"}</SummaryList.Value>
            <SummaryList.Actions/>
          </SummaryList.Row>

          <SummaryList.Row>
            <SummaryList.Key>Email</SummaryList.Key>
            <SummaryList.Value>
              <BodyText>{user.data.email}</BodyText>
            </SummaryList.Value>
            <SummaryList.Actions>
              <Link to="/profile/change-email">Change</Link>
            </SummaryList.Actions>
          </SummaryList.Row>

          <SummaryList.Row>
            <SummaryList.Key>Notifications</SummaryList.Key>
            <SummaryList.Value>
              <BodyText>
                {
                user.data.notifications_frequency ?
                  user.data.notifications_frequency.frequency + " " + user.data.notifications_frequency.time_of_day
                :
                  "Notifications not yet set up."
                }
              </BodyText>
            </SummaryList.Value>
            <SummaryList.Actions>
              <Link to="/profile/change-notifications">Change</Link>
            </SummaryList.Actions>
          </SummaryList.Row>

          <SummaryList.Row>
            <SummaryList.Key>Workbook Progress</SummaryList.Key>
            <SummaryList.Value>
              <BodyText
                style={{display: "flex", alignItems: "center"}}
              >
                {
                  user.data.workbooks_progress ?
                    <React.Fragment>
                      <LinearProgress
                        variant="determinate"
                        value={
                          user.data.workbooks_progress.completed_pages === 0 ? 0 : ((user.data.workbooks_progress.completed_pages*100)
                          /user.data.workbooks_progress.total_pages)
                        }
                        style={{width: "80%"}}
                      />
                      &nbsp;{
                      user.data.workbooks_progress.completed_pages === 0 ? 0 : Math.round(
                        (user.data.workbooks_progress.completed_pages*100)
                        /user.data.workbooks_progress.total_pages)
                      }%
                    </React.Fragment>
                  :
                    "No progress."
                }
              </BodyText>
            </SummaryList.Value>
            <SummaryList.Actions>
            </SummaryList.Actions>
          </SummaryList.Row>
        </SummaryList>

        <p>
          <Link to="/profile/change-password">Change password</Link>
        </p>
        <p>
          <Link to="/profile/delete">Delete account</Link>
        </p>

      </Container>
    </React.Fragment>
  )
}

export default Profile
