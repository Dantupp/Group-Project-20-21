import React from 'react'
import { Header } from 'nhsuk-react-components';
import { Link, useRoute } from "wouter";
import { UserContext } from '../UserContext';

const ActiveHeaderItem = (linkProps) => {
  const [isExactlyActive] = useRoute(linkProps.to);
  const [isSubRouteActive] = useRoute(linkProps.to + "/:rest*");

  let styles = {}
  if (isExactlyActive || isSubRouteActive) {
    styles = { boxShadow: "inset 0 -4px 0 #d8dde0" }
  }
  if (isExactlyActive) {
    styles = {
      ...styles,
      pointerEvents: "none"
    }
  }

  return (
    <Header.NavItem
      asElement={Link}
      to={linkProps.to}
      aria-current={isExactlyActive ? "page" : undefined}
      style={styles}
    >
      {linkProps.children}
    </Header.NavItem>
  )
}

function AppHeader(props) {
  return (
    <UserContext.Consumer>
      {([user]) => (
        <Header serviceName="Genetic Test Result Sharing">
          <Header.Container>
            <Header.Logo
              asElement={Link}
              to="/"
              aria-label='Genetic Test Result Sharing'
            />
            <Header.Content>
              <Header.MenuToggle/>
            </Header.Content>
          </Header.Container>
          {
            !props.hideNav ?
              <Header.Nav>
                <ActiveHeaderItem to='/workbook'>
                  Workbook
                </ActiveHeaderItem>
                {
                  props.displayAdmin ?
                    <ActiveHeaderItem to="/admin">
                      Admin
                    </ActiveHeaderItem>
                  : null
                }
                <ActiveHeaderItem to='/faq'>
                  FAQ
                </ActiveHeaderItem>
                <ActiveHeaderItem to="/contact">
                  Contact Us
                </ActiveHeaderItem>
                {
                  user.authed ?
                    <ActiveHeaderItem to='/profile'>
                      Profile
                    </ActiveHeaderItem>
                  :
                    <ActiveHeaderItem to='/register'>
                      Register
                    </ActiveHeaderItem>
                }
                {
                  user.authed ?
                    <ActiveHeaderItem to='/logout'>
                      Logout
                    </ActiveHeaderItem>
                  :
                    <ActiveHeaderItem to='/login'>
                      Login
                    </ActiveHeaderItem>
                }
              </Header.Nav>
            : null
          }
        </Header>
      )}
    </UserContext.Consumer>
  );
}

export default AppHeader;
