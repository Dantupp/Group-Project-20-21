import React from "react";
import { Container, Table } from "nhsuk-react-components";

const InputInteraction = ({ analytics }) => {
    //console.log('analytics for user input interaction: ', analytics.workbooks[0])
    //console.log('analytics for user input interaction DATA: ', analytics.workbooks[0].data)
    return (
        analytics.workbooks[0].timeTakenAverage ?
            <React.Fragment>
                <Container>
                    <div className="UserInputInteraction">
                        <h3>Total time taken to interact with a user input: {analytics.totalInputTime }</h3>
                        <h3>Overall average time taken to interact with a user input: {Math.round(analytics.overallAverage * 100) / 100}</h3>
                        <Table caption="UserInputInteraction">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell>Input ID</Table.Cell>
                                    <Table.Cell>Page ID</Table.Cell>
                                    <Table.Cell>Avg time taken to interact</Table.Cell>
                                    <Table.Cell>Total time taken to interact</Table.Cell>
                                    <Table.Cell>User count</Table.Cell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return (<p>{item2.inputId}</p>)
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
                                                return isNaN(item2.averageTimeTakenToInteractPerUser) ?
                                                    <p> 0 sec </p>
                                                    :
                                                    <p> {Math.round(item2.averageTimeTakenToInteractPerUser * 100) / 100} sec</p>
                                            })
                                        }
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return isNaN(item2.timeTakenToInteract) ?
                                                    <p> 0 sec </p>
                                                    :
                                                    <p>{item2.timeTakenToInteract} sec</p>
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

export default InputInteraction
