import React, { useEffect, useState } from "react"
import { Breadcrumb, Container } from 'nhsuk-react-components';
import { Link, useLocation } from "wouter"
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { default as WorkbookPages } from "../../../Workbook/Pages"
import "../ModifyWorkbook/pages.scss"
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function AllPages(props) {
  const [pages, setPages] = useState()
  const [, setLocation] = useLocation();

  const getPages = () => {
    axios.get(
      process.env.REACT_APP_SERVER_URI + "/pages",
      { withCredentials: true }
    ).then(res => {
      setPages(res.data)
    }).catch(error => {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
    })
  }

  useEffect(() => {
    getPages()
  }, [])

  const handlePageRemoval = (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      axios.delete(
        process.env.REACT_APP_SERVER_URI + "/pages/" + id,
        { withCredentials: true }
      ).then(() => {
        props.getWorkbooks()
        getPages()
      }).catch(error => {
        if (
          error.response &&
          error.response.data.message[0].messages[0].message
        ) {
          alert(error.response.data.message[0].messages[0].message)
        }
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      })
    }
  }

  let PagesComponent = (
    <React.Fragment>
      <h2>Loading...</h2>
      <SyncLoader />
    </React.Fragment>
  )

  if (pages) {
    if (pages.length === 0) {
      PagesComponent = (
        <p>No pages :(</p>
      )
    } else {
      PagesComponent = pages.map(page => {
        return (
          <div key={page.id} className="workbook-page">
            <div className="page-content">
              <WorkbookPages page={page} editor={true}/>
            </div>
            <div className="page-actions">
              <FaEdit onClick={() => setLocation(
                "/admin/editor/modify-page/" + page.id + "?fromAllPages=true"
              )} />
              <FaTrashAlt  onClick={() => handlePageRemoval(page.id)} />
            </div>
          </div>
        )
      })
    }
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
        <Breadcrumb.Item asElement={Link} to="/admin/editor/all-pages">
          All Pages
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container style={{marginTop: "1em", marginBottom: "1em"}}>
        {PagesComponent}
      </Container>
    </React.Fragment>
  );
}

export default AllPages;
