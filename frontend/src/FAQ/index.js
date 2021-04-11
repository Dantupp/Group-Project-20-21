import React from "react";
import { Hero, Breadcrumb, Container, Details, ListPanel } from 'nhsuk-react-components';
import { Link } from "wouter";

function FAQ() {

    return (

        <React.Fragment>
            <Hero>
                <Hero.Heading>Frequently Asked Questions</Hero.Heading>
                <Hero.Text>Find answers to the most frequently asked questions.</Hero.Text>
            </Hero>
            <Breadcrumb>
                <Breadcrumb.Item asElement={Link} to="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item asElement={Link} to="/faq">FAQ</Breadcrumb.Item>
            </Breadcrumb>

            <Container>
                <p style={{ marginTop: '1em' }}>Please find below a list of frequently asked questions (FAQs) about this website.</p>
                <p>If you cannot find an answer to your query below please get in touch with the webiste's administrator by clicking on the 'Contact Us' button it the toolbar.</p>

                <ListPanel>
                    <ListPanel.Panel label="Account problems">
                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>I am having trouble accessing my account.</Details.Summary>
                                <Details.Text>
                                    <p>Please check your internet connection; after you made sure it is workig, try refreshing your browser. If that did not solve your issue, please make sure you entered your right credentials: email and password. If the issue persists, please contact our website's administartor by accessing the 'Contact' page from the task bar.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>I am having trouble accessing my workbook.</Details.Summary>
                                <Details.Text>
                                    <p>Please check your internet connection. After you made sure it is workig, try refreshing your browser. If the issue persists, please contact our website's administartor by accessing the 'Contact' page from the task bar.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>I don't remember my account password.</Details.Summary>
                                <Details.Text>
                                    <p>Press 'Forgot password' on the 'Login' page. You will be asked to set a new password. You will receive an email confirmation after you have reset your password.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>I want to change my account email/password.</Details.Summary>
                                <Details.Text>
                                    <p>Please visit the 'Profile' page. You can access you 'Profile' by pressing the button 'Profile' available in the task bar.  Then, you have to go to press the 'Change' button on the 'Notifications' row / 'Change password'.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                    </ListPanel.Panel>
                </ListPanel>

                <ListPanel>
                    <ListPanel.Panel label="Workbook">
                        <ListPanel.LinkItem>
                <Details>
                    <Details.Summary>What happens if I start a workbook?</Details.Summary>
                    <Details.Text>
                        <p style={{ textAlign: "justify" }}>You are going to be displayed multiple pages of the workbook. You can complete them at your desired time. You might be required to interact with page components such as: watch videos, interact with prompts. Your workbook progress is going to be saved every 5 seconds. You will receive email reminders to keep you motivated to complete the workbook. The notification frequency can be changed in the 'Profile' page.</p>
                    </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                <Details>
                    <Details.Summary>What happens if I finish a workbook?</Details.Summary>
                    <Details.Text>
                        <p>No further steps needed. You have completed the intervetion. You will no longer receive email reminders as these are going to be stopped automatically.</p>
                    </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>
                    </ListPanel.Panel>
                </ListPanel>

                <ListPanel>
                    <ListPanel.Panel label="Workbook progress">
                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Is my workbook progress tracked?</Details.Summary>
                                <Details.Text>
                                    <p>Yes. Your interaction with the pages, prompts and videos are going to be tracked for us to monitor the website's perforamnce and user's interests.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Where can I see my workbook progress?</Details.Summary>
                                <Details.Text>
                                    <p>You can see your workbook progress by pressing the button 'Profile' available in the task bar.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Is my workbook progress going to be lost if I log out of my account?</Details.Summary>
                                <Details.Text>
                                    <p>No. Your workbook progress is going to be saved every 5 seconds. If you log out and the log in to your account, you can continue working on the workbook from where you left off.</p>
                                </Details.Text>
                            </Details>

                            <ListPanel.LinkItem>
                            </ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Is my workbook progress going to be lost if I have internet connection problems?</Details.Summary>
                                <Details.Text>
                                    <p>No. Your workbook progress is going to be saved every 5 seconds. Once your internet connection is working, you can continue the workbook from where you left off.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Is my workbook progress lost if I don't log in into my account for a long period of time?</Details.Summary>
                                <Details.Text>
                                    <p>No, your workbook progress is not going to be lost, although we recommend you to complete the intervention in maximum two weeks since the starting date for better results.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>
                    </ListPanel.Panel>
                </ListPanel>

                <ListPanel>
                    <ListPanel.Panel label="Account deletion">
                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>I do not want to continue completing the workbook. How can I delete my account?</Details.Summary>
                                <Details.Text>
                                    <p style={{ textAlign: "justify" }}>You can delete your account by accessing the 'Profile' page available in the taskbar. You have two options, to completely delete your account and erase all the data associated with it or to delete your account and all your data will be anonymized. This way, we will be able to continue analyzing your progress through the workbook, without the risk of somebody tracing anything back to you.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Can I reaccess the workbook after I have deleted my account?</Details.Summary>
                                <Details.Text>
                                    <p style={{ textAlign: "justify" }}>No. To access the workbook again after your account deletion, you will have to create a new account and restart the workbook. All your data will be fully deleted once you choose to delete your account.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                            <Details>
                                <Details.Summary>Can I recover my account after I have deleted my account?</Details.Summary>
                                <Details.Text>
                                    <p style={{ textAlign: "justify" }}>No. To access the workbook again after your account deletion, you will have to create a new account and restart the workbook. All your data will be fully deleted once you choose to delete your account.</p>
                                </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>
                    </ListPanel.Panel>
                </ListPanel>

                <ListPanel>
                    <ListPanel.Panel label="Email notifications/reminders">
                        <ListPanel.LinkItem>
                <Details>
                    <Details.Summary>How are email reminders working?</Details.Summary>
                    <Details.Text>
                        <p style={{ textAlign: "justify" }}>You are going to be reminded to keep involved with the workbook by receivig email notifications. When you create an account, the reminders frequency is set as every day on the morning. You have the possibility to chenge theis intial setting by accessing the 'Profile' section from the taskbar. Then, you have to go to press the 'Change' button on the 'Notifications' row.</p>
                    </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                <Details>
                    <Details.Summary>How can I stop receiving email reminders?</Details.Summary>
                    <Details.Text>
                        <p>You can stop reciving email reminders by accessing the 'Profile' section from the taskbar. Then, you have to go to press the 'Change' button on the 'Notifications' row. </p>
                    </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>

                        <ListPanel.LinkItem>
                <Details>
                    <Details.Summary>How can I change the frequency of the email reminders?</Details.Summary>
                    <Details.Text>
                        <p>You can change the frequency of receiving email reminders by accessing the 'Profile' section from the taskbar. Then, you have to go to press the 'Change' button on the 'Notifications' row. </p>
                    </Details.Text>
                            </Details>
                        </ListPanel.LinkItem>
                    </ListPanel.Panel>
                </ListPanel>
            </Container>

        </React.Fragment>

    );
}

export default FAQ;
