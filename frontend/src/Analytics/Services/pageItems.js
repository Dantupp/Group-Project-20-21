import axios from 'axios';
const baseurl = process.env.REACT_APP_SERVER_URI;

// All page put requests use the same call (to update analytics)
const putRequest = (data) => {
  axios
  .put(`${baseurl}/users/${data.userid}`, data.json, { withCredentials: true })
  .then(res => {
    //console.log(res);
  })
  .catch()
}

const sendPageTime = (data, setUserData) => {

  const pageId = data.pageId;
  const timeSpent = data.timeSpent;
  const workbookId = data.workbookId;
  const userdata = data.userdata.pagetime;
  
  if(userdata === undefined || userdata === [] || userdata === null){
    
    const pageData = {"pageid" : pageId, "time" : timeSpent}
    let workbookData = {"workbookId": workbookId, "pages": [pageData]}
    workbookData.pages[pageId] = timeSpent;
    const json = {"pagetime" : [workbookData]}
    const dataToSend = {
      userid : data.userId,
      json : json
    }
    console.log("nothing exists yet", dataToSend);

    let newUserState = data.userdata;
    newUserState.pagetime = [workbookData]; 
    setUserData(newUserState);
    putRequest(dataToSend)
  }

  else {
    // console.log(userdata)
    const workbookIndex = userdata.findIndex((workbook) => {
      return workbook.workbookId === workbookId;
    })

    if(workbookIndex === -1){
      const pageData = {"pageid" : pageId, "time" : timeSpent}
      const workbookData = {"workbookId": workbookId, "pages": [pageData]} 
      const newWorkbookArray = userdata.concat(workbookData);
      const json = {"pagetime" : newWorkbookArray}
      const dataToSend = {
        userid : data.userId,
        json : json
      }
      console.log("workbook doesn't exist", dataToSend);

      let newUserData = userdata;
      newUserData.pagetime = json.pagetime;

      let newUserState = data.userdata;
      newUserState.pagetime = newWorkbookArray;
      setUserData(newUserState);

      putRequest(dataToSend);
    }

    else {

      const pageIndex = userdata[workbookIndex].pages.findIndex(page => {
        return page.pageid === pageId; 
      })

      if(pageIndex === -1){
          const pageData = {'pageid' : pageId, "time" : timeSpent}
          const newPages = userdata[workbookIndex].pages.concat(pageData)
          let newData = userdata
          newData[workbookIndex].pages = newPages;
          const json = {"pagetime" : newData}
          const dataToSend = {
            userid : data.userId,
            json : json
          }
          console.log("page doesn't exist", dataToSend);

          let newUserState = data.userdata;
          newUserState.pagetime = newData
          setUserData(newUserState);

          putRequest(dataToSend);
      }
      
      else {
        let newData = userdata;
        newData[workbookIndex].pages[pageIndex].time += timeSpent
        const json = {"pagetime" : newData}
        const dataToSend = {
          userid : data.userId,
          json : json
        }
        // console.log("page exists", dataToSend);

        let newUserState = data.userdata;
        newUserState.pagetime = newData;
        setUserData(newUserState);

        putRequest(dataToSend);
      }
    }

  }


  
}

export default { sendPageTime }