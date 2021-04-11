import React from 'react';
import { hyperlink as service} from '../Services/interactionItems';
const Hyperlink = (prop) => {

  const props = prop.blockProps;

  const sendAnalyticData = (data) => {
    
    console.log(data)
    const json = {
      hyperlink: data.url,
      pageId: data.pageid,
      workbookId: data.workbookid,
      userdata: data.userdata,
      setUserData: data.setUserdata
    }
    console.log(json)
    service(json);
  }

  return(
    <>
    {props.editor
    ?
      <a href={props.url} target='_blank'>
        {props.text 
        ? props.text.trim() 
        : props.url.trim()
        }
      </a>
    :
      <a href={props.url} onClick={() => sendAnalyticData(props)} target='_blank'>
        {props.text 
        ? props.text.trim() 
        : props.url.trim()
        }
      </a>
    }
    </>
  )
}


export default Hyperlink;