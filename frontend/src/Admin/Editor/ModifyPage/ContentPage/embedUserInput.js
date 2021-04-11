import React, {useState} from 'react';
import { EditorState, Modifier } from "draft-js";
import Dropdown from './dropdown';

const EmbedUserinput = (props) => {

  // handler for userInput
  const onUserInputInsert = (props) => {
  
    //get data from props

    const editorState = props.editorState;
    const question = props.question;

    // need current content state along with selection
    const contentState = editorState.getCurrentContent(); 
    const selection = editorState.getSelection();

    // Create a state with the new video entity
    const newStateWithVideo = contentState.createEntity(
      'USERINPUT',
      'IMMUTABLE',
      {question: question}
    ) 
    // Get the key to insert the text
    const entityKey = newStateWithVideo.getLastCreatedEntityKey();

    // Insert text
    const newState = Modifier.insertText(
      contentState,
      selection,
      '(Userinput here: '+ question +')',
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
        title='Embed user input'
        editorState={props.editorState}
        setEditorState={props.setEditorState}
        addComponent={onUserInputInsert}
        buttonText='Embed user input'
        embedType='UI'
        />
    </div>

  )

}

export default EmbedUserinput;