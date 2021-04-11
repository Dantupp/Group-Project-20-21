import React from "react";
import { Container, Table } from "nhsuk-react-components";

const RegisteredUsers = ({ analytics }) => {
    //console.log('analytics user progress: ', analytics.workbooks[0].progressAverage)
    //console.log('analytics user progress DATA: ', analytics.workbooks[0].data)
    return (
        analytics.workbooks[0].progressAverage ?
            <React.Fragment>
                <Container>
                    <div className="PageProgress">
                        <h3>Number of users registered for the workbook: {analytics.workbooks[0].numberOfUsers}</h3>
                        <h3>Number of users who started (including completed) the workbook: {analytics.workbooks[0].numberOfUsers - analytics.workbooks[0].numberOfNonStarters}</h3>
                        <h3>Number of users who registered for the workbook but did not start yet: {analytics.workbooks[0].numberOfNonStarters}</h3>
                    </div>
                </Container>
            </React.Fragment>
            :
            <React.Fragment>
                <Container>
                    <h3>No data to display.</h3>
                </Container>
            </React.Fragment>
    );
};

export default RegisteredUsers
