import React from "react";
import { Container, Table } from "nhsuk-react-components";

const HyperLinkInteraction = ({ analytics }) => {
    //console.log('analytics for hyperlink: ', analytics.workbooks[0])
    //console.log('analytics for hyperlink DATA: ', analytics.workbooks[0].data)
    return (
        analytics.workbooks[0].data && analytics.workbooks[0].clicksAverage ?
            <React.Fragment>
                <Container>
                    <div className="HyperlinkInteraction">
                        <h3>Overall number of times a hyperlink has been clicked: {analytics.overallClicks}  </h3>
                        <h3>Average number of times a hyperlink has been clicked: {Math.round(analytics.averageClicks * 100) / 100} </h3>
                        <Table caption="HyperlinkInteraction">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell>Hyperlink</Table.Cell>
                                    <Table.Cell>Page ID</Table.Cell>
                                    <Table.Cell>Avg times clicked</Table.Cell>
                                    <Table.Cell>Total times clicked</Table.Cell>
                                    <Table.Cell>User count</Table.Cell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return (<p>{item2.hyperlink}</p>)
                                            })
                                        })
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return (<p>{item.pageid}</p>)
                                            })
                                        })
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return isNaN(item2.averageTimesClicked) ?
                                                    <p> 0 sec </p>
                                                    :
                                                    <p> {Math.round(item2.averageTimesClicked * 100) / 100} sec</p>
                                            })
                                        }
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return isNaN(item2.totaltimesClicked) ?
                                                    <p> 0 sec </p>
                                                    :
                                                    <p>{item2.totaltimesClicked} sec</p>
                                            })
                                            }
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return (<p>{item2.userCount}</p>)
                                            })
                                        })
                                        }
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

export default HyperLinkInteraction
