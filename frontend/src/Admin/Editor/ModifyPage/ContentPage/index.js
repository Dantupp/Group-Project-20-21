import React, { useState, Component } from "react"
import { Button } from "nhsuk-react-components";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState, Modifier } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import EmbedVideo from './embedVideoButton';
import UserInput from './embedUserInput';

function ContentPage(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [editorStateIsSet, setEditorStateIsSet] = useState(false);

  if (
    !editorStateIsSet &&
    props.content &&
    !editorState.getCurrentContent().hasText()
  ) {
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(props.content)
      )
    )
    setEditorStateIsSet(true)
  }

  return (
    <React.Fragment>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        placeholder="Add page content here!"
        spellCheck={true}
        toolbarCustomButtons={[<EmbedVideo 
                                url='youtube.com'
                                editorState={editorState}
                                setEditorState={setEditorState}
                                />, 
                                <UserInput
                                editorState={editorState}
                                question='whats yo @?'
                                setEditorState={setEditorState}
                                />]}
        toolbar={{
          options: [
            'blockType', 'inline', 'list', 'textAlign',
            'colorPicker', 'link', 'embedded', 'emoji', 'image',
            'history'
          ],
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
          },
        }}
        editorStyle={{
          minHeight: "15em",
          border: "#005eb8 2px solid",
          marginBottom: "0.5em",
          padding: "1em"
        }}
      />
      <Button onClick={() => props.handlePageSave(
        convertToRaw(editorState.getCurrentContent())
      )}>
        Update Content
      </Button>
    </React.Fragment>
  );
}

export default ContentPage;
