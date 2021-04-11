import { Container, Hero, Panel } from "nhsuk-react-components";
import React from "react";

function EmailConfirm() {
    return(
        <React.Fragment>
            <Hero>
                <Hero.Heading>Confirmation</Hero.Heading>
            </Hero>
            <Container>
                <Panel label="Congratulations on creating your account!">
                    <p>
                        Please, go to your email inbox to confirm the creation of your account.
                    </p>
                </Panel>
            </Container>
        </React.Fragment>
    )
}

export default EmailConfirm;
