import React, { useContext } from "react";
import { Breadcrumb, Container, Hero, Pagination } from 'nhsuk-react-components';
import { UserContext } from '../UserContext';
import { Link } from "wouter";
import SyncLoader from "react-spinners/SyncLoader";
import PageBuilder from "./PageBuilder";
import { useRoute } from "wouter";

function Workbook(props) {
  const [user] = useContext(UserContext);
  const [, params] = useRoute("/workbook/:workbookId/:pageId?");

  const workbook = props.workbooks.find(workbook => workbook.id === params.workbookId)

  let WorkbookContent = (
    <React.Fragment>
      <h2>Loading your personal workbook...</h2>
      <SyncLoader />
    </React.Fragment>
  )

  if (workbook && workbook.pages && workbook.pages.length > 0) {
    let pageId = workbook.pages[0].id
    if (params && params.pageId) {
      pageId = params.pageId
    }

    let pageBefore = null
    let pageAfter = null

    const pageIndex = workbook.pages.findIndex(page => page.id === pageId);
    const page = workbook.pages[pageIndex]

    if (workbook.pages[pageIndex - 1]) {
      pageBefore = workbook.pages[pageIndex - 1].id
    }
    if (workbook.pages[pageIndex + 1]) {
      pageAfter = workbook.pages[pageIndex + 1].id
    }

    WorkbookContent = <PageBuilder
      workbookId={workbook.id}
      userData={user.data}
      pageBefore={pageBefore}
      pageAfter={pageAfter}
      page={page}
      workbookPageList={workbook.pages}
      pageIndex={pageIndex}
    />
  } else if (workbook) {
    WorkbookContent = (
      <p>This workbook has no pages yet, please check again later.</p>
    )
  }

  return (
    <React.Fragment>
      <Hero>
        <Hero.Heading>{user.data.disease} Workbook!</Hero.Heading>
      </Hero>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/workbook">
          Workbook
        </Breadcrumb.Item>
        {
          workbook ?
            <Breadcrumb.Item asElement={Link} to={"/workbook/" + workbook.id}>
              {workbook.title}
            </Breadcrumb.Item>
          : null
        }
      </Breadcrumb>

      <Container>
        <Pagination>
          {WorkbookContent}
        </Pagination>
      </Container>
    </React.Fragment>
  );
}

export default Workbook;
