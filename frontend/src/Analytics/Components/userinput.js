import React, { useState, useEffect } from 'react';
import { Button, Row, Textarea } from 'nhsuk-react-components';
import { userinput as service } from '../Services/interactionItems';

function Userinput(prop){
  const props = prop.blockProps;

  const [time, setTime] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [input, setInput] = useState('');
  const [intervalID, setIntervalID] = useState();

  useEffect(() => {
    console.log(props.userdata)
    if(props.userdata.userinput){
      const workbookIndex = props.userdata.userinput.findIndex(workbook => {
        return workbook.workbookid === props.workbookid;
      })
      if(props.userdata.userinput[workbookIndex] !== -1){
        const pageIndex = props.userdata.userinput[workbookIndex].pages.findIndex(page => {
          return page.pageid === props.pageid; 
        })
        console.log()
        if(pageIndex !== -1){
          const inputIndex = props.userdata.userinput[workbookIndex].pages[pageIndex].inputs.findIndex(input => {
            return input.inputID === props.question;
          })
          if(inputIndex !== -1){
            setInput(props.userdata.userinput[workbookIndex].pages[pageIndex].inputs[inputIndex].input);
          }
        }
      }
    }
  }, [])

  

  // Sets the interval for the timer, only called on component mount and unmount
  useEffect(() => {

    const tick = () => {
      setTime(t => t + 1);
    }

    const interval = setInterval(() => tick(), 1000);
    setIntervalID(interval)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Clears the interval once interacted is true, this is called twice at most
  useEffect(() => {
    if(interacted && !props.editor) { 
      clearInterval(intervalID) 
      let json = {}
      if(input !== '' && input){
        json = {
          input: input,
          timetaken: time,
          inputID: props.question,
          pageId: props.pageid,
          workbookId: props.workbookid,
          userdata: props.userdata,
          setUserData: props.setUserdata
        }
      } else {
        json = {
          input: '',
          timetaken: time,
          inputID: props.question,
          pageId: props.pageid,
          workbookId: props.workbookid,
          userdata: props.userdata,
          setUserData: props.setUserdata
        }
      }
      service(json)
    }
  }, [interacted, intervalID])

  const handleSubmit = (event) => {
    event.preventDefault();
    const json = {
      input: input,
      timetaken: time,
      inputID: props.question,
      pageId: props.pageid,
      workbookId: props.workbookid,
      userdata: props.userdata,
      setUserData: props.setUserdata
    }
    service(json)
  }

  const handleChange = (value) => {
    if(!interacted){ setInteracted(true) }
    setInput(value) 
  }

  return(
    <>
      <Row>
        <h6>{props.question}</h6>
        <Textarea 
          onChange={(event) => handleChange(event.target.value)}
          style={{width: "50%"}}
          placeholder='Input here...'
          value={input}
          >
        </Textarea> 
        {props.editor
          ? <Button>Save</Button>
          : <Button onClick={(event) => handleSubmit(event)}>Save</Button>
        }
      </Row>
    </>
  )

}
export default Userinput;