import React from "react";
import { Container } from "nhsuk-react-components";

function DeleteConfirmation() {
    return(
        <React.Fragment>
            <Container style={{marginTop: "1em"}}>
                <h2>
                    You have successfully deleted your account.
                </h2>
            </Container>
        </React.Fragment>
    )
}

export default DeleteConfirmation;
