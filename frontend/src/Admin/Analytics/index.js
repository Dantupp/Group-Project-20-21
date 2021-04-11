import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Panel,
  Checkboxes,
  Details,
  Hero
} from 'nhsuk-react-components';
import { Link } from "wouter";
import modify from "../../Analytics/Services/fetchItems";
import axios from 'axios';
import RenderTable from './RenderTable';

function GeneralAnalytics() {

  const [userData, setUserData] = useState();
  const [workbookData, setWorkbookData] = useState();
  const [workbookAnalytics, setWorkbookAnalytics] = useState();
  const [pageTimeAnalyticsData, setPageTimeAnalyticsData] = useState();
  const [hyperlinkAnalyticsData, setHyperlinkAnalyticsData] = useState();
  const [videoplayerAnalyticsData, setVideoplayerAnalyticsData] = useState();
  const [pageprogressAnalyticsData, setPageprogressAnalyticsData] = useState();
  const [userInputAnalyticsData, setUserInputAnalyticsData] = useState();
  const [numberOfUsers, setNumberOfUsers] = useState();
  const [ready, setReady] = useState(false);
  const [numberOfProgressedUsers, setNumberOfProgressedUsers] = useState();
  const [numberOfCompletedUsers, setNumberOfCompletedUsers] = useState();

  const baseurl = process.env.REACT_APP_SERVER_URI;

  useEffect(() => {
    axios.get(`${baseurl}/users`, { withCredentials: true })
      .then(res => {
        let userdata = [];
        setNumberOfUsers(res.data.length);
        res.data.forEach(user => {
          const newUserEntry = {
            userid: user._id,
            gender: user.gender,
            hyperlinks: user.hyperlinks,
            videos: user.videos,
            pagetime: user.pagetime,
            userinput: user.userinput,
            workbooks_progress: user.workbooks_progress
          }
          userdata = userdata.concat(newUserEntry);
        })
        setUserData(userdata);
      })
      .catch();

    axios.get(`${baseurl}/workbooks`, { withCredentials: true })
      .then(res => {
        setWorkbookData(res.data)
      })

  }, [baseurl])

  useEffect(() => {
    if (workbookData && userData) {
      const data = {
        workbooks: workbookData,
        userdata: userData
      }

      setWorkbookAnalytics(modify.modifyData(data));
      let completedUsers = 0;
      userData.forEach(user => {
        if(user.workbooks_progress){
          if(user.workbooks_progress.completed_pages === user.workbooks_progress.total_pages){
            completedUsers += 1;
          }
        }
      })
      setNumberOfCompletedUsers(completedUsers);
    }
  }, [workbookData, userData])

  useEffect(() => {
    // Checks data is defined, then sets the data
    if (workbookAnalytics) {
      console.log('setting all data modified data...')
      setPageTimeAnalyticsData(modify.pageTimeAnalytics(workbookAnalytics));
      setHyperlinkAnalyticsData(modify.hyperlinkAnalytics(workbookAnalytics));
      setUserInputAnalyticsData(modify.userInputAnalytics(workbookAnalytics));
      setPageprogressAnalyticsData(modify.pageProgressAverage(workbookAnalytics));
      setVideoplayerAnalyticsData(modify.videoplayerAnalytics(workbookAnalytics));
      console.log('initial data:', workbookAnalytics)
      const workbookUsers = modify.usersPerWorkbook(workbookAnalytics);
      let num = 0;
      workbookUsers.forEach(workbook => {
        num += workbook.numOfUsers;
      })
      setNumberOfProgressedUsers(num)
    }
  }, [workbookAnalytics])

  useEffect(() => {
    if(!ready){
      if(numberOfProgressedUsers && videoplayerAnalyticsData && hyperlinkAnalyticsData && userInputAnalyticsData && pageprogressAnalyticsData && pageTimeAnalyticsData){
        console.log('data set!')
        console.log('time:', pageTimeAnalyticsData);
        console.log('hyperlinks:', hyperlinkAnalyticsData);
        console.log('userinput:', userInputAnalyticsData);
        console.log('pageprogress:', pageprogressAnalyticsData);
        console.log('videoplayer:',videoplayerAnalyticsData);
        setReady(true);
      }
    } 
  }, [videoplayerAnalyticsData, 
      hyperlinkAnalyticsData, 
      userInputAnalyticsData, 
      pageprogressAnalyticsData,
      pageTimeAnalyticsData,
      numberOfProgressedUsers,
      ready]
  )

  return (
    <React.Fragment>

      <Hero>
        <Hero.Heading>Analytics panel</Hero.Heading>
        <Hero.Text>Overview of general analytics. Drive deeper into data by applying filters like gender and disease.</Hero.Text>
      </Hero>

      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin">Admin</Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin/analytics">Analytics</Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{ marginTop: "2em" }}>

        <Row>
          <Col>
            <Panel>
              <h3>General analytics for all the workbooks</h3>
              { // Check if data loaded, if not then print loading.
                ready ?
                <React.Fragment>
                <p>Avg time spent on all workbooks: 
                  <b> {(pageTimeAnalyticsData.totalPageTime / pageTimeAnalyticsData.workbooks.length).toFixed(2)} seconds </b>
                </p>
                <p>Avg time spent on all workbook pages: 
                  <b> {pageTimeAnalyticsData.averagePageTime.toFixed(2)} seconds</b>
                </p>
                <p>No of users registered: <b>{numberOfUsers}</b></p>
                <p>No of users who completed a workbook: <b>{numberOfCompletedUsers}</b></p>
                <p>No of users who are in progress of completing a workbook: <b>{numberOfProgressedUsers}</b></p>
                </React.Fragment>
                : <b>Prepping data...</b>
              }

            </Panel>
          </Col>         
        </Row>

        {
          /* check if there exists data in the workbookAnalytics and then display buttons with all the Workbooks names*/
          ready
          ? <RenderTable workbooks={workbookData} />
          : <h3>Prepping data...</h3>
        }

      </Container>
    </React.Fragment>
  );
}

export default GeneralAnalytics;
