import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {videoplayer as service} from '../Services/interactionItems';

/**
 * To do still:
 *  Must still send the actual data
 *  These are all specifically for testing to make sure the data that will be sent will be correct.
 */

function VideoPlayer(prop) {


  const props = prop.blockProps;
  /** 
   * id is meant to be the id of the specific video.
   * pageid is the id of the page in the workbook, this will help build queries.
   * url is the URL of the video - can be almost anything as far as I can tell.
   * user is for user data - (user id mostly.)
  */

  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleProgress = (progress) => {
    !finished 
    ? setElapsed(progress.played)
    : setElapsed(elapsed)
  }

  const handlePause = () => {
    console.log(`seconds elapsed: ${elapsed * duration}`);
  }

  const handleEnded = () => {
    const seconds = roundSeconds(elapsed * duration);
    const JSON = { 
      videolink: props.url,
      timewatched: seconds,
      pageId: props.pageid,
      workbookId: props.workbookid,
      userdata: props.userdata,
      setUserData: props.setUserdata
    }
    service(JSON);
    setFinished(true);
  }

  // No decimal points
  const roundSeconds = (seconds) => {
    return Math.round(seconds);
  }

  return(
    <div>
      {props.editor 
        ?   
        <ReactPlayer 
          url={props.url} 
          pageid={props.pageid} 
          controls={true}
        />
        :
          <ReactPlayer 
          url={props.url} 
          pageid={props.pageid} 
          controls={true}
          onDuration={(duration) => setDuration(duration)}
          onProgress={(progress) => handleProgress(progress)}
          onPause={() => handlePause()}
          onEnded={() => handleEnded()}
        />
      }
    </div>
  );

}

export default VideoPlayer;