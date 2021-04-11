import React, {useState, useEffect} from 'react';


const Dropdown = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [input, setInput] = useState();
  const [disabled, setDisabled] = useState();

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    input && input !== ''
    ? setDisabled(false)
    : setDisabled(true)
  }, [input])

  const handleAdd = () => {
    let newProps = {}
    if(props.embedType==="UI"){
      newProps = {
        editorState: props.editorState,
        setEditorState: props.setEditorState,
        question: input
      }
    }  else {
      newProps = {
        editorState: props.editorState,
        setEditorState: props.setEditorState,
        url: input
      }
    }
    setShowDropDown(false);
    props.addComponent(newProps);
    setInput();
  }

  const handleCancel = () => {
    setShowDropDown(false);
    setInput();
  }

  return(
    <React.Fragment>
    <button onClick={() => setShowDropDown(!showDropDown)} class='rdw-option-wrapper'>
      {props.buttonText}
    </button>
    <div>
      { showDropDown 
        ? 
          props.embedType === 'UI'
          ?
            <div className="rdw-embedded-modal" >
              <div className="rdw-embedded-modal-header">
                <span class='rdw-embedded-modal-header-option' style={{width: "90%"}}>
                  {props.title}
                  <span class='rdw-embedded-modal-header-label'></span>
                </span>
              </div>
              <div class='rdw-embedded-modal-link-section'>
                <span class='rdw-embedded-modal-link-input-wrapper'>
                  <input class='rdw-embedded-modal-link-input' 
                    placeholder='Enter question..'
                    name='userinput'
                    onChange={(event) => handleChange(event)}
                    value={input}
                    />
                </span>
              </div>
              <div class='rdw-embedded-modal-btn-section' >
                <button type='button' class='rdw-embedded-modal-btn' disabled={disabled} onClick={() => handleAdd()}> Add </button>
                <button type='button' class='rdw-embedded-modal-btn' onClick={() => handleCancel()}> Cancel </button>
              </div>
            </div>
          :
          <div className="rdw-embedded-modal">
            <div className="rdw-embedded-modal-header">
              <span class='rdw-embedded-modal-header-option' style={{width: "90%"}}>
                {props.title}
                <span class='rdw-embedded-modal-header-label'></span>
              </span>
            </div>
            <div class='rdw-embedded-modal-link-section'>
              <span class='rdw-embedded-modal-link-input-wrapper'>
                <input class='rdw-embedded-modal-link-input' 
                  placeholder='Enter a video link...'
                  name='userinput'
                  onChange={(event) => handleChange(event)}
                  value={input}
                  />
              </span>
            </div>
            <div class='rdw-embedded-modal-btn-section'>
              <button type='button' class='rdw-embedded-modal-btn' disabled={disabled} onClick={() => handleAdd()}> Add </button>
              <button type='button' class='rdw-embedded-modal-btn' onClick={() => handleCancel()}> Cancel </button>
            </div>
          </div>
        :
          <div></div>
      }
    </div>
    </React.Fragment>
      
  )
}

export default Dropdown;