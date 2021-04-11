import React , { useEffect, useState } from 'react';
import pageServices from '../Services/pageItems';

function PageTimer({pageId, userId, workbookId, setUserData, userData}) {

  const [secondsOnPage, setSecondsOnPage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [currentPageId, setCurrentPageId] = useState();
  useEffect(() => {
    
    const tick = () => {
      setSecondsOnPage(secondsOnPage + 1);
      // Save time spent on page, will push data every 5 seconds.
      if(secondsOnPage % 10 === 0){  
        //console.log("sent time: ", secondsOnPage);
      }
    }
    
    // runs function tick every second
    const interval = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  });

  // For page changes
  useEffect(() => {
    setCurrentPageId(pageId)
    loaded 
    ? sendData() 
    : setLoaded(true)
  }, [pageId])


  const sendData = () => {
    
    const pID = currentPageId

    // console.log("check:",pID)

    const current_data = {
      timeSpent: secondsOnPage, 
      userId: userId, 
      pageId: pID, 
      workbookId: workbookId, 
      userdata: userData
    }
    pageServices.sendPageTime(current_data, setUserData);
    setSecondsOnPage(0);
  }

  return(
    <div>
      Timer: {secondsOnPage}
    </div>
  )
}

export default PageTimer;

