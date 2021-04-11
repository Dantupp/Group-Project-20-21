import React, { useEffect, useState } from "react"
import { FaChevronUp, FaChevronDown, FaEdit } from 'react-icons/fa';
import { Button, Hint, MinusIcon, PlusIcon } from 'nhsuk-react-components';
import axios from "axios"
import equal from "fast-deep-equal"
import SyncLoader from "react-spinners/SyncLoader";
import { useLocation } from "wouter";
import { default as WorkbookPages } from "../../../Workbook/Pages"
import "./pages.scss"

function Pages(props) {
  const [, setLocation] = useLocation();
  const [modifiedPages, setModifiedPages] = useState(
    props.workbook.pages ? props.workbook.pages : []
  )
  const [otherPages, setOtherPages] = useState()

  const [savePagesStatus, setSavePagesStatus] = useState()

  useEffect(() => {
    // Get a full list of pages for this workbook - then filter out those which
    // are already a part of this workbook.
    axios.get(
      process.env.REACT_APP_SERVER_URI +
      "/pages?diseases=" + props.workbook.disease.id,
      { withCredentials: true }
    ).then(res => {
      let otherPagesTemp = []
      res.data.forEach(otherPage => {
        if (props.workbook.pages) {
          if (props.workbook.pages.some(
            workbookPage => workbookPage.id === otherPage.id
          )) {
            // Page already exists in the workbook, do nothing.
          } else {
            return otherPagesTemp.push(otherPage)
          }
        } else {
          return otherPagesTemp.push(otherPage)
        }
      })
      setOtherPages(otherPagesTemp)
    }).catch(error => {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      setOtherPages([])
    })
  }, [props.workbook.disease.id, props.workbook.pages])

  // This function reorders the array of pages (after checking if that page is
  // actually able to move to the new location).
  const handlePageOrderChange = (index, direction) => {
    if (direction === "up" && index > 0) {
      setModifiedPages(prevState => {
        let data = [...prevState];

        let temp = data[index - 1];
        data[index - 1] = data[index];
        data[index] = temp;

        return data;
      })
    } else if (direction === "down" && index < modifiedPages.length - 1) {
      setModifiedPages(prevState => {
        let data = [...prevState];

        let temp = data[index + 1];
        data[index + 1] = data[index];
        data[index] = temp;

        return data;
      })
    }
  }

  const handlePageRemoval = (modifiedPagesIndex) => {
    // Remove the page from the modifiedPages, then add to otherPages.
    const pageToRemove = modifiedPages[modifiedPagesIndex]
    setModifiedPages(prevState => {
      let tempArray = [...prevState];
      tempArray.splice(modifiedPagesIndex, 1);
      return tempArray;
    })
    setOtherPages(prevState => {
      let tempArray = [...prevState];
      return [pageToRemove, ...tempArray]
    })
  }

  const handlePageAddition = (otherPagesIndex) => {
    // Remove the page from the otherPages, then add to modifiedPages.
    const pageToAdd = otherPages[otherPagesIndex]
    setOtherPages(prevState => {
      let tempArray = [...prevState];
      tempArray.splice(otherPagesIndex, 1);
      return tempArray;
    })
    setModifiedPages(prevState => {
      let tempArray = [...prevState];
      tempArray.push(pageToAdd)
      return tempArray
    })
  }

  const handlePagesSave = () => {
    setSavePagesStatus("in-progress")
    // Generate array of page IDs for the DB format.
    let pageIds = []
    modifiedPages.forEach(page => {
      pageIds.push({
        pageId: page.id
      })
    })
    axios.put(
      process.env.REACT_APP_SERVER_URI + "/workbooks/" + props.workbook.id,
      {
        pages: pageIds
      },
      { withCredentials: true }
    ).then(() => {
      // Refresh the workbook data.
      props.getWorkbooks()
      setSavePagesStatus("success")
    }).catch(() => {
      setSavePagesStatus("failure")
    })
  }

  let WorkbookPagesComponent = (
    <p>
      No pages yet :(
    </p>
  )

  if (modifiedPages && modifiedPages.length > 0) {
    WorkbookPagesComponent = modifiedPages.map((page, index) => {
      // Styled in pages.scss
      return (
        <div key={index} className="workbook-page">
          <div className="page-content">
            <WorkbookPages page={page} editor={true}/>
          </div>
          <div className="page-actions">
            {index > 0 ?
              <FaChevronUp
                onClick={() => handlePageOrderChange(index, "up")}
              />
              : null
            }
            {index < modifiedPages.length - 1 ?
              <FaChevronDown
                onClick={() => handlePageOrderChange(index, "down")}
              />
              : null
            }
            <MinusIcon onClick={() => handlePageRemoval(index)} />
            <FaEdit onClick={() => setLocation(
              "/admin/editor/modify-page/" + page.id +
              "?fromWorkbookId=" + props.workbook.id
            )} />
          </div>
        </div>
      )
    })
  }

  let OtherPagesComponent = (
    <React.Fragment>
      Loading...
      <SyncLoader/>
    </React.Fragment>
  )
  if (otherPages) {
    if (otherPages.length === 0) {
      OtherPagesComponent = (
        <p>
          No pages are available to be added. If you're expecting to see pages
          here, make sure the pages you want are applicable to this workbooks
          disease ({props.workbook.disease.name}).
        </p>
      )
    } else {
      OtherPagesComponent = otherPages.map((page, index) => {
        return (
          <div key={index} className="workbook-page">
            <div className="page-content">
              <WorkbookPages page={page} editor={true}/>
            </div>
            <div className="page-actions">
              <PlusIcon onClick={() => handlePageAddition(index)} />
              <FaEdit onClick={() => setLocation(
                "/admin/editor/modify-page/" + page.id +
                "?fromWorkbookId=" + props.workbook.id
              )} />
            </div>
          </div>
        )
      })
    }
  }

  const btnSavePagesText = (option) => {
    switch(option) {
      case "success":
        return "Saved!";
      case "in-progress":
        return "Saving...";
      case "failure":
        return "Failed to save!"
      default:
        return "Save";
    }
  }

  return (
    <React.Fragment>
      <h2>Pages</h2>
      {WorkbookPagesComponent}
      <Button
        onClick={handlePagesSave}
        disabled={
          equal(props.workbook.pages, modifiedPages) ||
          savePagesStatus === "in-progress" ||
          savePagesStatus === "success"
        }
      >
        {btnSavePagesText(savePagesStatus)}
      </Button>
      <h2>Other Pages</h2>
      <Hint>
        Other pages you can add to this workbook which have the same applicable
        disease.
      </Hint>
      {OtherPagesComponent}
    </React.Fragment>
  );
}

export default Pages;
