import {Container, Hero } from "nhsuk-react-components";

function DataAgreement() {
  return(
    <>
      <Hero>
        <Hero.Heading>Data agreement</Hero.Heading>
      </Hero>
      <Container>
        <h2 className="nhsuk-heading-l" style={{paddingTop: "10px"}}>Your privacy</h2>
        <p className="nhsuk-body">
          Your privacy is important to us. This privacy policy covers what we collect and how we use, share and store your information.
        </p>
        <p className="nhsuk-body">
          This page tells you:
          <ul>
            <li>
              about the information we may collect
            </li>
            <li>
              how we keep your data secure
            </li>
            <li>
              who we share your data with
            </li>
            <li>
              about your rights to see or change information we hold about you
            </li>
          </ul>
        </p>
        <h2 className="nhsuk-heading-l">Information we may collect</h2>
        <h3 className="nhsuk-heading-m">Cookies</h3>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          Our website uses cookies. These are small files saved on your phone, tablet or computer when you visit a website.
          They store information about how you use the website, such as the pages you visit. The law says that we can store
          cookies on your device if they are strictly necessary to make our website work. For all other types of cookies we
          need your permission before we can use them on your device.We like to use analytics cookies which measure how you
          use our website and help us improve our service for future users but we only use these cookies if you say it's OK.
        </p>
        <h3 className="nhsuk-heading-m">How we collect and store data</h3>
        <p className="nshuk-body">
          We only store data that is really necessary for us to deliver the best experience for you.
        </p>
        <p className="nshuk-body">
          We store gender and disease for a custom experience regarding the workbooks.
        </p>
        <p className="nshuk-body">
          We store the email and password for registration purposes.
        </p>
        <h3 className="nhsuk-heading-m">Keeping data secure</h3>
        <p className="nshuk-body">
          Data is being stored in a secure database hosted using Amazon Web Services.
        </p>
        <p className="nshuk-body">
          Passwords are hashed in order to protect your account.
        </p>
        <h3 className="nhsuk-heading-m">Data sharing</h3>
        <p className="nshuk-body" style={{textAlign: "justify"}}>
          We may share anonymous information on how the service is used with the Department of Health and Social Care, NHS England, clinical commissioning groups (CCGs), and the National Clinical Governance Group.
        </p>
        <h3 className="nhsuk-heading-m">Legal powers</h3>
        <p className="nshuk-body" style={{textAlign: "justify"}}>
          When you give us personal information, we may pass it on if the law says we must.
          If you make a claim against us, we and other third parties such as our solicitors
          may need to look at this information. We will not share your personal information
          with anyone else without your permission for any other reason.
        </p>
        <h2 className="nhsuk-heading-l">Your rights</h2>
        <p className="nshuk-body">
          You can:
          <ul>
            <li>
              Find out what information we hold about you, ask us to correct it if it's wrong, or delete it.
            </li>
            <li>
              You can delete your account whenever you want.
            </li>
          </ul>
        </p>
      </Container>
    </>
  );
}

export default DataAgreement;
