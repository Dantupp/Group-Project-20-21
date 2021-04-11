import {Hero, Container} from "nhsuk-react-components";

function TermsAndConds() {
  return(
    <>
      <Hero>
        <Hero.Heading>Terms and conditions</Hero.Heading>
      </Hero>
      <Container>
        <h2 className="nhsuk-heading-l" style={{paddingTop: "10px"}}>Terms of use</h2>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          References to 'the NHS' mean 'the NHS in England' unless otherwise stated. Service descriptions, entitlements and costs refer to services in England and arrangements may differ elsewhere in the UK.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          We cannot guarantee uninterrupted access to the website, or the sites to which it links. We accept no responsibility for any damage arising from the unavailability of this website or the information it contains.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          This website contains links to other sites. We are not responsible for the content of any third party website and a link to another site does not mean NHS Digital endorses their site or content.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          You may link to our website, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it. You must not make a link in such a way as to suggest any form of association, approval or endorsement on our part. We reserve the right to withdraw linking permission without notice.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          If you submit personal information to us through this website, it will be used in line with our privacy policy.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          We do not guarantee that this website will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programmes and platform to access our site. You should use your own virus protection software.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          You must not misuse this website by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          You must not attempt to gain unauthorised access to our site, the server on which this website is stored, or any server, computer or database connected to this website.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          You must not attack this website via a denial-of-service attack or a distributed denial-of-service attack.
        </p>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use this website will end immediately.
        </p>
        <h2 className="nhsuk-heading-l">General</h2>
        <p className="nhsuk-body" style={{ textAlign: "justify" }}>
          These terms of use shall be governed by and interpreted in accordance with the laws of England, and we both agree to the exclusive jurisdiction of the courts of England in respect of any disputes which may arise in relation to our website.
        </p>
      </Container>
    </>
  )
}

export default TermsAndConds;
