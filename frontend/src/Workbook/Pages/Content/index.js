import { convertFromRaw, Editor, EditorState } from 'draft-js';
import React, { useState, useEffect } from 'react';
import PageTimer from '../../../Analytics/Components/pageTimer';
import axios from 'axios';
import {Checkboxes} from "nhsuk-react-components";
import Hyperlink from '../../../Analytics/Components/hyperlink';
import Videoplayer from '../../../Analytics/Components/videoplayer';
import Userinput from '../../../Analytics/Components/userinput';  

function Content(props) {

  const [userdata, setUserdata] = useState(props.userData);
  const [done, setDone] = useState();
  const [disable, setDisable] = useState();

  //sets if the page is checked, and if the button is disabled or not.
  useEffect(() => {
    if (!props.editor && userdata.workbooks_progress) {
      userdata.workbooks_progress.completed_pages >= props.pageIndex + 1
      ? setDone(true)
      : setDone(false)

      props.pageIndex + 1 > userdata.workbooks_progress.completed_pages + 1
      ? setDisable(true)
      : setDisable(false)
    }
  }, [props.pageIndex, props.editor])


  //this is used to handle the update of the progress for the workbook if checked or not; to increase/decrease the completed_pages
  const handleCheckboxChange = (event) => {
    setDone(event.target.checked);
    if(event.target.checked && userdata.workbooks_progress) {
      let updateProgress = {
        workbooks_progress: {
          completed_pages: userdata.workbooks_progress.completed_pages + 1,
          total_pages: userdata.workbooks_progress.total_pages,
          workbook_id: userdata.workbooks_progress.workbook_id
        }
      }

      axios
        .put(process.env.REACT_APP_SERVER_URI + "/users/" + userdata.id + "/updateProgress",
        updateProgress,
        { withCredentials: true })
        //update state
        .then(res => {
          let newUserData = userdata;
          newUserData.workbooks_progress.completed_pages = userdata.workbooks_progress.completed_pages + 1
          setUserdata(newUserData);
        })
        .catch(error => {})
    } else {
      if (
        userdata.workbooks_progress &&
        userdata.workbooks_progress.completed_pages > 0
      ) {
        let updateProgress = {
          workbooks_progress: {
            completed_pages: userdata.workbooks_progress.completed_pages - 1,
            total_pages: userdata.workbooks_progress.total_pages,
            workbook_id: userdata.workbooks_progress.workbook_id
          }
        }

        axios
          .put(process.env.REACT_APP_SERVER_URI + "/users/" + userdata.id + "/updateProgress",
          updateProgress,
          { withCredentials: true })
          //update stare
          .then(res => {
            let newUserData = userdata;
            newUserData.workbooks_progress.completed_pages = userdata.workbooks_progress.completed_pages - 1
            setUserdata(newUserData);
          })
          .catch(error => {})
      }
    }
  }

  const [defaultEditorState, setDefaultEditorState] = useState();
  const [currentContent, setCurrentContent] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if(props.content && !props.editor){
      setDefaultEditorState(EditorState.createWithContent(
        convertFromRaw(props.content)
      ))
    }
  }, [props.pageIndex, props.content, props.editor]);

  useEffect(() => {
    if(props.content && !props.editor && defaultEditorState && defaultEditorState){
      setCurrentContent(defaultEditorState.getCurrentContent())
    }
  },[defaultEditorState,props.editor,props.content])

  useEffect(() => {
    if(currentContent !== undefined){
      setReady(true)
    }
  }, [currentContent])

  if (!props.content) {
    return "No content."
  }

  const myBlockRenderer = (contentBlock) => {
    if(contentBlock.getEntityAt(0) !== null){
      const entity = (currentContent.getEntity(contentBlock.getEntityAt(0)));
      const entityType = entity._map._root.entries[0][1];
      const entityData = entity._map._root.entries[2][1];

      if(entityType === 'LINK'){
        const url = entityData.url;
        return {
          component: Hyperlink,
          editable: false,
          props: {
            url: url,
            pageid: props.pageId,
            text: contentBlock.getText(),
            userdata: userdata,
            setUserdata: setUserdata,
            editor: false,
            workbookid: props.workbookId
          }
        }
      }
      else if(entityType === 'VIDEO'){
        return{
          component: Videoplayer,
          editable: false,
          props: {
            url: entityData.url,
            pageid: props.pageId,
            userdata: userdata,
            setUserdata: setUserdata,
            editor: false,
            workbookid: props.workbookId
          }
        }
      } else if(entityType === "USERINPUT"){
        return{
          component: Userinput,
          editable: false,
          props: {
            question: entityData.question,
            pageid: props.pageId, 
            userdata: userdata,
            setUserdata: setUserdata,
            editor: false,
            workbookid: props.workbookId
          }
        }
      }
    }   
  }

  return (
      <React.Fragment>
      {
        props.editor
        ? <div>
            <Editor
              editorState={
                EditorState.createWithContent(
                  convertFromRaw(props.content)
                )
              }
              readOnly={true}
            />
          </div>
        : 
            ready
            ? <div id='editor'>
                <Editor
                  editorState={
                    EditorState.createWithContent(
                      convertFromRaw(props.content)
                    )
                  }
                  blockRendererFn={myBlockRenderer}
                  readOnly={true}
                />
                <div id='progress-timer'>
                  <Checkboxes>
                    <Checkboxes.Box type="checkbox" checked={done} disabled={disable} onChange={handleCheckboxChange}>Done</Checkboxes.Box>
                  </Checkboxes>
                  <PageTimer
                  workbookId={props.workbookId}
                  pageId={props.pageId}
                  userId={props.userData.id}
                  userData={userdata}
                  setUserData={setUserdata}
                  />
                </div>
              </div>
            : <b>Loading...</b>
            
      }
      </React.Fragment>
  )
}

export default Content;
