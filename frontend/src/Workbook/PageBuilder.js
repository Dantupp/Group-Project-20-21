import { Pagination } from "nhsuk-react-components";
import React from "react";
import { Link } from "wouter";
import Pages from "./Pages"

function PageBuilder(props) {

  let mainContent = <Pages
                    page={props.page}
                    workbookId={props.workbookId}
                    pagetime={props.pageTime}
                    pageprogress={props.pageProgress}
                    userData={props.userData}
                    workbookPages={props.workbookPageList}
                    pageIndex={props.pageIndex}
                    />;

  let AdaptivePagination = []

  if (props.pageBefore) {
    AdaptivePagination.push(
      <Link to={"/workbook/" + props.workbookId + "/" + props.pageBefore} key="linkBack">
        <Pagination.Link previous />
      </Link>
    )
  }
  if (props.pageAfter) {
    AdaptivePagination.push(
      <Link to={"/workbook/" + props.workbookId + "/" + props.pageAfter} key="linkForward">
        <Pagination.Link next/>
      </Link>
    )
  }

  return (
    <React.Fragment>
      {mainContent}

      <div style={{marginTop: "1em"}}>
        {AdaptivePagination}
      </div>
    </React.Fragment>
  )
}

export default PageBuilder;
