import React, { useState } from 'react'
import ResponsivePlayer from "../ResponsivePlayer"
import "./videoPage.css"
import { Container } from "nhsuk-react-components";



function VideoPage() {

    const [watchComplete, setWatchComplete] = useState(false)

    const handleWatchComplete = ({ played }) => {

        if (played >= 0.90 && !watchComplete) {
            setWatchComplete(true)
        } 
    }


    return (
        <React.Fragment>
            <Container>
            <br></br>
            <ResponsivePlayer
                url="https://www.youtube.com/watch?v=YozNOqbd26Q"
                onProgress={handleWatchComplete}
            />
            <div className={
                watchComplete
                    ? "marker marker--is-complete"
                    : "marker marker--not-complete"
            }
            >
                    &#10003; Completed
            </div>
            </Container>
        </React.Fragment>
    )

}

export default VideoPage