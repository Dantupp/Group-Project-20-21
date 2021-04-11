import React from "react";
import { Container, Table } from "nhsuk-react-components";

const WorkbookProgress = ({ analytics }) => {
    //console.log('analytics user progress: ', analytics.workbooks[0].progressAverage)
    //console.log('analytics user progress DATA: ', analytics.workbooks[0].data)
    return (
        analytics.workbooks[0].progressAverage ?
            <React.Fragment>
                <Container>
                    <div className="PageProgress">
                        <h3>Number of pages in the workbook: {analytics.workbooks[0].totalPages}</h3>
                        <h3>Average workbook pages progress of users: {Math.round(analytics.workbooks[0].progressAverage * 100) / 100} %</h3>
                        <h3>Overall progress of users per workbook: {Math.round(analytics.totalAverageProgress * 10000) / 100} %</h3> 
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

export default WorkbookProgress
