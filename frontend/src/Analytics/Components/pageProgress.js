import React, { useEffect } from 'react';
import pageServices from '../Services/pageItems';

function PageProgress({userid, pageid, analytics, pagelist, workbookId}){

  useEffect(() => {
    const data = {userId: userid, pageId: pageid, workbookAnalytics: analytics, pagelist: pagelist, workbookId: workbookId};
    pageServices.sendPageProgress(data);
  })

  return(
    <div id='progress' /> 
  )

}

export default PageProgress