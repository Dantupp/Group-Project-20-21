import React, { useEffect, useState } from "react"
import axios from "axios";
import { BackLink, Breadcrumb, Container } from "nhsuk-react-components";
import { Redirect, useRoute, Link } from "wouter";
import SyncLoader from "react-spinners/SyncLoader";
import ContentPage from "./ContentPage";
import DiseasesSelector from "./DiseasesSelector"
import GendersSelector from "./GendersSelector"
import qs from "qs"

function ModifyPage(props) {
  const [, params] = useRoute("/admin/editor/modify-page/:pageId");
  const [pageRequestStatus, setPageRequestStatus] = useState("no-request")
  const [page, setPage] = useState()
  const [messageForContent, setMessageForContent] = useState()

  // Fetch this page.
  useEffect(() => {
    if (pageRequestStatus === "no-request" && params && params.pageId) {
      setPageRequestStatus("in-progress")
      axios.get(
        process.env.REACT_APP_SERVER_URI + "/pages/" + params.pageId,
        { withCredentials: true }
      ).then(res => {
        setPageRequestStatus("success")
        setPage(res.data)
      }).catch(() => {
        setPageRequestStatus("failure")
      })
    }
  }, [params, pageRequestStatus])

  if (!params || !params.pageId) {
    // Redirect to editor.
    return <Redirect to="/admin/editor" />
  }

  const handlePageSave = (content) => {
    axios.put(
      process.env.REACT_APP_SERVER_URI + "/pages/" + params.pageId,
      {
        content: content
      },
      { withCredentials: true }
    ).then(() => {
      props.getWorkbooks()
      setMessageForContent("Successfully updated the page.")
      // Clear message after 3 seconds.
      setTimeout(function() {
        setMessageForContent()
      }, 3000);
    }).catch(() => {
      setMessageForContent("Something went wrong updating the page.")
    })
  }

  let PageComponent = (
    <React.Fragment>
      <h2>Loading...</h2>
      <SyncLoader />
    </React.Fragment>
  )

  if (pageRequestStatus === "failure") {
    PageComponent = (
      <p>
        There was an issue getting the page data. Perhaps the page doesn't
        exist.
      </p>
    )
  }

  if (page && pageRequestStatus === "success") {
    switch(page.type) {
      case 'content':
        PageComponent = <ContentPage
          content={page.content}
          handlePageSave={handlePageSave}
          editor={true}
        />;
        break;
      default:
        PageComponent = "Invalid page type.";
    }
  }

  let ReturnToWorkbook
  let urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  if (urlParams.fromWorkbookId || urlParams.fromAllPages) {
    let toLink
    let backText
    if (urlParams.fromWorkbookId) {
      toLink = "/admin/editor/modify-workbook/" + urlParams.fromWorkbookId
      backText = "Back to workbook."
    } else if (urlParams.fromAllPages) {
      toLink = "/admin/editor/all-pages"
      backText = "Back to all pages."
    }
    ReturnToWorkbook = (
      <BackLink
        asElement={Link}
        to={toLink}
      >
        {backText}
      </BackLink>
    )
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item asElement={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin">
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item asElement={Link} to="/admin/editor">
          Editor
        </Breadcrumb.Item>
        <Breadcrumb.Item
          asElement={Link}
          to={"/admin/editor/modify-page/" + params.pageId }
        >
          Modify Page
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        {ReturnToWorkbook}
        <h1>Update Page</h1>
        <h2>Content</h2>
        {PageComponent}
        {messageForContent ? <p>{messageForContent}</p> : null}
        <DiseasesSelector
          page={page}
          getWorkbooks={props.getWorkbooks}
          workbooks={props.workbooks}
        />
        <GendersSelector
          page={page}
          getWorkbooks={props.getWorkbooks}
          workbooks={props.workbooks}
        />
      </Container>
    </React.Fragment>
  )
}

export default ModifyPage