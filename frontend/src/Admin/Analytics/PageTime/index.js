import React from "react";
import { Container, Table } from "nhsuk-react-components";

const PageTime = ({ analytics}) => {
    //console.log('analytics for page time: ', analytics.workbooks[0])
    //console.log('analytics for page time DATA: ', analytics.workbooks[0].data)
    //console.log('analytics for page time USERS: ', analytics.workbooks[0].numberOfUsers)
    return (
        analytics.workbooks[0].data && analytics.workbooks[0].data.length > 0 ?
            <React.Fragment>
                <Container>
                    <div className="Analysis">
                        <h3>Total workbook time: {analytics.totalPageTime} seconds</h3>
                        <h3>Average workbook time: {Math.round(analytics.averagePageTime * 100) / 100} seconds</h3>
                        <Table caption="Average time spent on page">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell>Page ID</Table.Cell>
                                    <Table.Cell>Avg time spent</Table.Cell>
                                    <Table.Cell>Total time spent</Table.Cell>
                                    <Table.Cell>User count</Table.Cell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item =>
                                            <p>{item.pageid}</p>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item =>
                                            isNaN(item.average) ?
                                                <p> 0 sec </p>
                                                :
                                                <p> {Math.round(item.average * 100) / 100} sec</p>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item =>
                                            isNaN(item.totaltime) ?
                                                <p> 0 sec </p>
                                                :
                                                <p> {item.totaltime} sec</p>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item =>
                                            <p>{item.userCount}</p>
                                        )}
                                    </Table.Cell>                                    
                                </Table.Row>
                            </Table.Body>
                        </Table>
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

export default PageTime
