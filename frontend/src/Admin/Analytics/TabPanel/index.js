import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Breadcrumb, Hero } from "nhsuk-react-components";
import { Link } from "wouter";
import PageTime from '../PageTime';
import WorkbookProgress from '../WorkbookProgress';
import VideoWatchTime from '../VideoWatchTime';
import HyperlinkInteraction from '../HyperlinkInteraction';
import InputInteraction from '../InputInteraction';
import RegisteredUsers from '../RegisteredUsers'

import { Redirect, useRoute } from 'wouter';
import axios from 'axios';
import modify from '../../../Analytics/Services/fetchItems';
import { userinput } from '../../../Analytics/Services/interactionItems';
const baseurl = process.env.REACT_APP_SERVER_URI;
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "1em",
        marginBottom: "1em"
    }
}));

const SimpleTabs = () => {

    const [, params] = useRoute("/admin/analytics/workbook/:workbookId");
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [workbookData, setWorkbookData] = useState();
    const [ready, setReady] = useState(false);
    const [userData, setUserData] = useState();

    const [workbookAnalytics, setWorkbookAnalytics] = useState();
    const [pageTimeAnalyticsData, setPageTimeAnalyticsData] = useState();
    const [hyperlinkAnalyticsData, setHyperlinkAnalyticsData] = useState();
    const [videoplayerAnalyticsData, setVideoplayerAnalyticsData] = useState();
    const [pageprogressAnalyticsData, setPageprogressAnalyticsData] = useState();
    const [userInputAnalyticsData, setUserInputAnalyticsData] = useState();

    useEffect(() => {
        axios
            .get(`${baseurl}/workbooks/${params.workbookId}`, { withCredentials: true })
            .then(res => {
                setWorkbookData(res.data);
            })
            .catch();

        axios.get(`${baseurl}/users`, { withCredentials: true })
            .then(res => {
                let userdata = [];
                res.data.map(user => {
                    if (user.workbooks_progress) {
                        if (user.workbooks_progress.workbook_id === params.workbookId) {
                            userdata = userdata.concat(user);
                        }
                    }
                })
                setUserData(userdata);
            })
            .catch();


    }, [])

    useEffect(() => {
        if (workbookData && userData) {
            const data = {
                workbooks: [workbookData],
                userdata: userData
            }
            setWorkbookAnalytics(modify.modifyData(data));

        }
    }, [workbookData, userData])

    useEffect(() => {
        if (workbookAnalytics) {
            setPageTimeAnalyticsData(modify.pageTimeAnalytics(workbookAnalytics));
            setHyperlinkAnalyticsData(modify.hyperlinkAnalytics(workbookAnalytics));
            setUserInputAnalyticsData(modify.userInputAnalytics(workbookAnalytics));
            setPageprogressAnalyticsData(modify.pageProgressAverage(workbookAnalytics));
            setVideoplayerAnalyticsData(modify.videoplayerAnalytics(workbookAnalytics));
        }
    }, [workbookAnalytics])

    useEffect(() => {
        if (!ready) {
            if (videoplayerAnalyticsData && hyperlinkAnalyticsData && userInputAnalyticsData && pageprogressAnalyticsData && pageTimeAnalyticsData) {
                setReady(true)
                console.log('data set!')
                console.log('time:', pageTimeAnalyticsData);
                console.log('hyperlinks:', hyperlinkAnalyticsData);
                console.log('userinput:', userInputAnalyticsData);
                console.log('workbookprogress:', pageprogressAnalyticsData);
                console.log('videoplayer:', videoplayerAnalyticsData);
                console.log('workbookData:', workbookData);
            }
        }
    }, [videoplayerAnalyticsData,
        hyperlinkAnalyticsData,
        userInputAnalyticsData,
        pageprogressAnalyticsData,
        pageTimeAnalyticsData]
    )

    if (!params || !params.workbookId) {
        // Redirect to editor.
        return <Redirect to="/admin/analytics" />
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        ready
            ?
            <React.Fragment>
                <Hero>
                    <Hero.Heading>
                        {
                            ready
                                ? <Hero.Heading>Analytics for workbook: {workbookData.title}</Hero.Heading>
                                : <Hero.Heading>Loading...</Hero.Heading>
                        }
                    </Hero.Heading>
                    <Hero.Text>Analytics data</Hero.Text>
                </Hero>
                <Breadcrumb>
                    <Breadcrumb.Item asElement={Link} to="/admin">
                        Admin
                    </Breadcrumb.Item>
                    <Breadcrumb.Item asElement={Link} to="/admin/analytics">
                        Analytics
                    </Breadcrumb.Item>
                    <Breadcrumb.Item asElement={Link} to="/admin/analytics/workbook/:workbookId*">
                        {
                            ready
                                ? <Breadcrumb.Item asElement={Link} to="/admin/analytics/workbook/:workbookId*">Analytics for workbook: {workbookData.title}</Breadcrumb.Item>
                                : <Breadcrumb.Item asElement={Link} to="/admin/analytics/workbook/:workbookId*">Loading...</Breadcrumb.Item>
                        }
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <div className={classes.root}>
                        <AppBar position="static" style={{ backgroundColor: '#005EB8' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="simple tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                                
                            >
                                <Tab label="Registered users" {...a11yProps(5)} />
                                <Tab label="Workbook progress" {...a11yProps(1)} />
                                <Tab label="Page time" {...a11yProps(0)} />
                                <Tab label="Video watch time" {...a11yProps(2)} />
                                <Tab label="Hyperlink interaction" {...a11yProps(3)} />
                                <Tab label="Input interaction" {...a11yProps(4)} />

                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <RegisteredUsers analytics={pageprogressAnalyticsData} userIds={workbookData.user} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <WorkbookProgress analytics={pageprogressAnalyticsData} userIds={workbookData.user} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <PageTime analytics={pageTimeAnalyticsData} pages={workbookData.pages} />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <VideoWatchTime analytics={videoplayerAnalyticsData} />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <HyperlinkInteraction analytics={hyperlinkAnalyticsData} />
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <InputInteraction analytics={userInputAnalyticsData} />
                        </TabPanel>
                    </div>
                </Container>
            </React.Fragment>
            :
            <React.Fragment>
                <Container>
                    <h3>Prepping data... </h3>
                </Container>
            </React.Fragment>
    )

}

export default SimpleTabs;

