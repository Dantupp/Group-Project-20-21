import React, { useContext, useEffect } from 'react';
import { Route, Redirect, Switch, useLocation } from "wouter";
// Import the styles for the NHS objects - we only
// need to do this once.
import "nhsuk-frontend/dist/nhsuk.css";
import SyncLoader from "react-spinners/SyncLoader";
import Cookies from "js-cookie";

import Header from "./Header"
import Footer from "./Footer"
import Login from "./Login"
import Home from "./Home"
import Register from "./Register"
import FAQ from "./FAQ";
import Logout from "./Logout";
import UserProfile from "./UserProfile";
import Survey from "./Survey";
import EmailConfirm from "./EmailConfirm";
import TermsAndConds from "./TermsAndConds";
import DataAgreement from "./DataAgreement";
import { UserContext } from './UserContext';
import { Container } from 'nhsuk-react-components';
import Contact from "./Contact"
import ForgotPassword from "./ForgotPassword";
import WorkbookHome from './Workbook';
import Admin from './Admin';
import ResetPassword from "./ResetPassword";
import DeleteConfirmation from "./UserProfile/Delete/confirmation";
import Test from "./Test";
import "./global-styles.scss"

const GlobalLoadingPage = () => {
  return (
    <React.Fragment>
      <Header hideNav={true} />

      <Container style={{
        marginTop: "1em",
        marginBottom: "1em"
      }}>
        <h1>
          Loading...
        </h1>
        <SyncLoader />
      </Container>

      <Footer/>
    </React.Fragment>
  )
}

const FocusManager = (props) => {
  const [location] = useLocation();

  useEffect(() => {
    document.getElementById('main-content').focus()
  }, [location])

  return props.children
}

function App() {
  const [user] = useContext(UserContext);

  if (Cookies.get("shouldBeLoggedIn") === "true" && !user.authed){
    if (user.data === null) {
      return <GlobalLoadingPage />
    }
  }

  const PrivateRoute = ({path, children}) => {
    if (user.authed === true) {
      return (
        <Route path={path}>
          {children}
        </Route>
      )
    } else {
      return <Redirect to="/login" replace />
    }
  };

  const LoggedOutOnlyRoute = ({path, children}) => {
    if (user.authed === false) {
      return (
        <Route path={path}>
          {children}
        </Route>
      )
    } else {
      return <Redirect to="/workbook" replace />
    }
  };

  // data might not exist yet.
  let displayAdmin = user.data &&
    // additionalPermissions might not exist for a normal user.
    user.data.additionalPermissions &&
    (
      user.data.additionalPermissions.includes("editor") ||
      user.data.additionalPermissions.includes("analytics")
    )

  const AdminRoute = ({path, children}) => {
    if (displayAdmin) {
      return (
        <Route path={path}>
          {children}
        </Route>
      )
    } else {
      return <Redirect to="/" replace />
    }
  };

  return (
    <React.Fragment>
      <Header displayAdmin={displayAdmin}/>

      <main id="main-content" tabIndex="-1" style={{outline: "none"}}>
        <FocusManager>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/terms-and-conditions">
              <TermsAndConds />
            </Route>
            <Route path="/data-agreement">
              <DataAgreement />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
            <Route path="/profile/delete/confirmation">
              <DeleteConfirmation />
            </Route>

            <LoggedOutOnlyRoute path="/login">
              <Login />
            </LoggedOutOnlyRoute>
            <LoggedOutOnlyRoute path="/register">
              <Register />
            </LoggedOutOnlyRoute>
            <LoggedOutOnlyRoute path="/forgot-password">
              <ForgotPassword />
            </LoggedOutOnlyRoute>
            <LoggedOutOnlyRoute path="/confirmation">
              <EmailConfirm />
            </LoggedOutOnlyRoute>
            <LoggedOutOnlyRoute path="/reset-password">
              <ResetPassword />
            </LoggedOutOnlyRoute>

            <PrivateRoute path="/logout">
              <Logout />
            </PrivateRoute>
            <PrivateRoute path="/workbook/:rest*">
              <WorkbookHome />
            </PrivateRoute>
            <PrivateRoute path="/survey">
              <Survey />
            </PrivateRoute>
            <PrivateRoute path="/profile/:rest*">
              <UserProfile />
            </PrivateRoute>

            <Route path="/test">
              <Test />
            </Route>
            
            <AdminRoute path="/admin/:rest*">
              <Admin />
            </AdminRoute>
          </Switch>
        </FocusManager>
      </main>

      <Footer />
    </React.Fragment>
  );
}

export default App;
