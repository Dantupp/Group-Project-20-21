import { Footer } from 'nhsuk-react-components';
import { Link } from "wouter";

function AppFooter() {
  return (
    <Footer>
      <Footer.List>
        <Footer.ListItem href="https://www.nhs.uk/nhs-sites/">NHS sites</Footer.ListItem>
        <Link to="/contact">
          <Footer.ListItem>Contact</Footer.ListItem>
        </Link>        <Link to="/terms-and-conditions">
          <Footer.ListItem>Terms and conditions</Footer.ListItem>
        </Link>
        <Link to="/data-agreement">
          <Footer.ListItem>Data agreement</Footer.ListItem>
        </Link>
      </Footer.List>
      <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
    </Footer>
  );
}

export default AppFooter;
