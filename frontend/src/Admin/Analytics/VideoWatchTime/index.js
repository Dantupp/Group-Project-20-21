import React from "react";
import { Container, Table } from "nhsuk-react-components";

const VideoWatchTime = ({ analytics }) => {
    //console.log('analytics for video watch time: ', analytics.workbooks[0])
    //console.log('analytics for video watch time DATA: ', analytics.workbooks[0].data)
    //console.log('analytics for video watch time DATA VIDEOS: ', analytics.workbooks[0].data.videos)
    return (
        analytics.workbooks[0].timeWatchedAverage ?
            <React.Fragment>
                <Container>
                    <div className="VideoWatchTime">
                        <h3>Overall video watch time: {analytics.overallWatchTime} seconds</h3>
                        <h3>Average video watch time: {Math.round(analytics.averageTimeWatched * 100) / 100} seconds</h3>
                        <Table caption="VideoWatchTime">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell>Video link</Table.Cell>
                                    <Table.Cell>Page ID</Table.Cell>
                                    <Table.Cell>Avg watch time</Table.Cell>
                                    <Table.Cell>Total watch time</Table.Cell>
                                    <Table.Cell>User count</Table.Cell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return (<p>{item2.videolink}</p>)
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
                                                return isNaN(item2.averageTimeWatched) ?
                                                    <p> 0 sec </p>
                                                    :
                                                    <p> {Math.round(item2.averageTimeWatched * 100) / 100} sec</p>
                                            })
                                        }
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {analytics.workbooks[0].data.map(item => {
                                            return item.data.map(item2 => {
                                                return isNaN(item2.totalTimeWatched) ?
                                                    <p> 0 sec </p>
                                                    :
                                                    <p>{item2.totalTimeWatched} sec</p>
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

export default VideoWatchTime
