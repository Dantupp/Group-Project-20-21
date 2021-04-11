import React from 'react';
import { Route } from 'wouter';
import Profile from "./profile";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeNotifications from "./ChangeNotifications";
import Delete from "./Delete";
import ChangeEmailConfirmation from "./ChangeEmail/confirmation";
import ChangePasswordConfirmation from "./ChangePassword/confirmation";
import ChangeNotificationsConfirmation from "./ChangeNotifications/confirmation";
import { Hero } from 'nhsuk-react-components';

function UserProfile() {
  return (
    <React.Fragment>
      <Hero>
              <Hero.Heading>My Profile</Hero.Heading>
              <Hero.Text>Update your account details. See your progress. Delete your account.</Hero.Text>
      </Hero>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/profile/change-password">
        <ChangePassword />
      </Route>
      <Route path="/profile/change-password/confirmation">
        <ChangePasswordConfirmation />
      </Route>
      <Route path="/profile/change-email">
        <ChangeEmail />
      </Route>
      <Route path="/profile/change-email/confirmation">
        <ChangeEmailConfirmation />
      </Route>
      <Route path="/profile/change-notifications">
        <ChangeNotifications />
      </Route>
      <Route path="/profile/change-notifications/confirmation">
        <ChangeNotificationsConfirmation />
      </Route>
      <Route path="/profile/delete">
        <Delete />
      </Route>
    </React.Fragment>
  );
}

export default UserProfile;
