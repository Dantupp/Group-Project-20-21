import React from 'react';
import { EditorState, Modifier } from "draft-js";
import Dropdown from './dropdown'

const myButton = (props) => {

  // on Click handler for videos.
  const onVideoInsert = (props) => {
    //get data from props
    const url = props.url;
    const editorState = props.editorState;

    // need current content state along with selection
    const contentState = editorState.getCurrentContent(); 
    const selection = editorState.getSelection();

    // Create a state with the new video entity
    const newStateWithVideo = contentState.createEntity(
      'VIDEO',
      'IMMUTABLE',
      {url: url}
    ) 
    // Get the key to insert the text
    const entityKey = newStateWithVideo.getLastCreatedEntityKey();

    // Insert text
    const newState = Modifier.insertText(
      contentState,
      selection,
      '(Video here: ' + url + ')',
      null,
      entityKey
    ) 
    
    // Push new state to EditorSTate
    const newEditorState = EditorState.push(
      props.editorState,
      newState,
      'insert-characters'
    ) //editor state
  
    // Set the editor state
    if(newEditorState){
      props.setEditorState(newEditorState)
    }
  }

  return(
    <div class='rdw-embedded-wrapper'>
    <Dropdown 
      title='Embed video'
      editorState={props.editorState}
      setEditorState={props.setEditorState}
      addComponent={onVideoInsert}
      buttonText='Embed video'
      embedType='VIDEO'
      />
  </div>

  )
  
}

export default myButton;



