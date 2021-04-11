import React, { useContext, useState, useEffect } from 'react';
import {Hero, Breadcrumb} from 'nhsuk-react-components';
import { Link } from "wouter";
import fetch from "../Analytics/Services/fetchItems";
import { UserContext } from '../UserContext';
import {hyperlink, videoplayer, userinput} from '../Analytics/Services/interactionItems';
import axios from 'axios';

function Test() {

  const [user] = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [workbookData, setWorkbookData] = useState();
  const baseurl = process.env.REACT_APP_SERVER_URI;

  useEffect(() => {
    axios.get(`${baseurl}/users`, {withCredentials: true})
    .then(res => {
      let userdata = [];
      res.data.map(user => {
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

    axios.get(`${baseurl}/workbooks`, {withCredentials: true})
    .then(res => {
      setWorkbookData(res.data)
    })


    axios
      .get(`${baseurl}/users/5ff866f93d5ec31a9ca9c4c5`, {withCredentials: true})
      .then(res => {

        const videoData = {
          userdata: res.data,
          videolink: 'https://wwww.youtube.com/blah',
          timewatched: 50,
          pageId: '5fb6a8f8d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const videoData2 = {
          userdata: res.data,
          videolink: 'https://wwww.youtube.com/blah',
          timewatched: 30,
          pageId: '5fb6a910d4a047c81999c8f2',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const userInput = {
          userdata: res.data,
          inputID: 1,
          input: 'blah',
          timetaken: 12,
          pageId: '5fb6a910d4a047c81999c8f2',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const userInput2 = {
          userdata: res.data,
          inputID: 2,
          input: 'blah111',
          timetaken: 42,
          pageId: '5fb6a910d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const hyperLink = {
          userdata: res.data,
          hyperlink: 'https://blah.com',
          pageId: '5fb6a910d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const hyperLink2 = {
          userdata: res.data,
          hyperlink: 'https://blah2.com',
          pageId: '5fb6a910d4a047c81999c8f2',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const hyperLink3 = {
          userdata: res.data, 
          hyperlink: 'https://blah3.com',
          pageId: '5fb6a910d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }

        //hyperlink(hyperLink3)
       // userinput(userInput2)
        //videoplayer(videoData2)
      })

    axios
      .get(`${baseurl}/users/5ff1e9c73d90de1ee4b35826`, {withCredentials: true})
      .then(res => {
        const videoData = {
          userdata: res.data,
          videolink: 'https://wwww.youtube.com/blah',
          timewatched: 50,
          pageId: '5fb6a8f8d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const videoData2 = {
          userdata: res.data,
          videolink: 'https://wwww.youtube.com/blah',
          timewatched: 30,
          pageId: '5fb6a910d4a047c81999c8f2',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const userInput = {
          userdata: res.data,
          inputID: 1,
          input: 'blah',
          timetaken: 12,
          pageId: '5fb6a910d4a047c81999c8f2',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const userInput2 = {
          userdata: res.data,
          inputID: 2,
          input: 'blah111',
          timetaken: 42,
          pageId: '5fb6a910d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const hyperLink = {
          userdata: res.data,
          hyperlink: 'https://blah.com',
          pageId: '5fb6a910d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const hyperLink2 = {
          userdata: res.data,
          hyperlink: 'https://blah2.com',
          pageId: '5fb6a910d4a047c81999c8f2',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }
        const hyperLink3 = {
          userdata: res.data,
          hyperlink: 'https://blah3.com',
          pageId: '5fb6a910d4a047c81999c8f1',
          workbookId: '5ff9b30c70fa9a4bccc93edf'
        }

        //hyperlink(hyperLink3)
        //userinput(userInput2)
        //videoplayer(videoData2)

      })

  },[])

  useEffect(() => {
    if(workbookData && userData){
      const data = {
        workbooks: workbookData,
        userdata: userData
      }
      fetch.modifyData(data);
    }
  },[workbookData, userData])

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>Test!</Hero.Heading>
        <Hero.Text>Test data here!</Hero.Text>
      </Hero>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/test">Login</Breadcrumb.Item>
      </Breadcrumb>
    </React.Fragment>
  )
}


export default Test;