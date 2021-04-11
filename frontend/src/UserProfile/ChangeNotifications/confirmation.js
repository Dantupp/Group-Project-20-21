import React from "react";
import { Container, Breadcrumb } from "nhsuk-react-components";
import { Link } from "wouter";

function ChangeEmailConfirmation() {
    return(
        <React.Fragment>
            <Breadcrumb>
                <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item asElement={Link} to="/profile">Profile</Breadcrumb.Item>
                <Breadcrumb.Item asElement={Link} to="/profile/change-notifications">Change notifications</Breadcrumb.Item>
                <Breadcrumb.Item asElement={Link} to="/profile/change-notifications/confirmation">Confirmation</Breadcrumb.Item>
            </Breadcrumb>
            <Container style={{marginTop: "1em"}}>
                <h2>
                    You have successfully changed your notifications frequency.
                </h2>
            </Container>
        </React.Fragment>
    )
}

export default ChangeEmailConfirmation;
