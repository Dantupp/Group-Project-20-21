import Content from "./Content"

function Pages(props) {
  switch(props.page.type) {
    case 'content':
      return <Content
              content={props.page.content}
              workbookId={props.workbookId}
              pageId={props.page.id}
              workbookPages={props.workbookPages}
              userData = {props.userData}
              editor = {props.editor}
              pageIndex = {props.pageIndex}
              />;

    default:
      return null;
  }
}

export default Pages;
