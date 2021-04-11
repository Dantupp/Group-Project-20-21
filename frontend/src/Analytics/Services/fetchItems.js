/**
 *
 * To see the returned data in console.log,
 * just uncomment the line before each return(data).
 * To use the functions relating to analytics, make sure you're passing
 * userdata that has been through the modifyData function.
 * Look at frontend/src/Test/index.js lines 16 through 51 to see how you
 * should fetch & set data to pass to modifyData.
 *
 */



// modify data takes one arguement that contains two pieces of data:
// userdata, and workbookdata.
const modifyData = (data) => {
  let workbooks = data.workbooks.map(workbook => {
    let name;
    if(workbook.disease === null){
      name = "no disease name"
    } else {
      name = workbook.disease.name
    }
    return {
      workbookid: workbook.id,
      title: workbook.title,
      disease: name,
      data: []
    }
  })

  data.userdata.forEach(user => {
    // Get index of workbook
    const indexOfWorkbook = workbooks.findIndex(workbook => {
      if(user.workbooks_progress){
        return workbook.workbookid === user.workbooks_progress.workbook_id;
      }
    })

    // Case that user has not started
    if(indexOfWorkbook !== -1){
      const newData = workbooks[indexOfWorkbook].data.concat(user);
      workbooks[indexOfWorkbook].data = newData;
    }
  })
  return workbooks;
}

// returns a JSON object containing a JSON object for each workbook and the number of users.
const usersPerWorkbook = (workbooks) => {
  let data = []
  workbooks.forEach(workbook => {
    const entry = {
      workbookId: workbook.workbookid,
      numOfUsers: workbook.data.length
    }
    data = data.concat(entry)
  })
  return data
}

/**
 * pagetime functions
 *
 * Gets the average per page, workbook and overall of the page time analytics.
 *
 */

const pageTimeAnalytics = (workbooks) => {

  let data = {}
  let totalPageTime = 0;

  console.log(workbooks)
  workbooks.forEach(workbook => {

    const numberOfUsers = workbook.data.length
    let workbookData = {}
    let totalWorkbookTime = 0;

    // check for each user
    workbook.data.forEach(user => {
      if(user.pagetime){

        const workbookIndex = user.pagetime.findIndex(wb => {
          return wb.workbookId === workbook.workbookid;
        })

        if(workbookIndex !== -1){
        user.pagetime[workbookIndex].pages.forEach(page => {

          totalWorkbookTime += page.time;

          if(Object.keys(workbookData).length === 0){
              workbookData = [{
                pageid: page.pageid,
                totaltime: page.time,
                userCount: 1,
                average: page.time
              }]
            }
            else {
              const pageIndex = workbookData.findIndex(p => {
                return page.pageid === p.pageid;
              })

              if(pageIndex !== -1){
                const newPageData = {
                  pageid: page.pageid,
                  totaltime: workbookData[pageIndex].totaltime + page.time,
                  userCount: workbookData[pageIndex].userCount + 1,
                  average: (workbookData[pageIndex].totaltime + page.time)/(workbookData[pageIndex].userCount + 1)
                }
                workbookData[pageIndex] = newPageData;
              }
              else {
                const newPageData = {
                  pageid: page.pageid,
                  totaltime: page.time,
                  userCount: 1,
                  average: page.time
                }
                const newWorkbookData = workbookData.concat(newPageData)
                workbookData = newWorkbookData
              }
            }
          })
        }
      }
    })
    totalPageTime += totalWorkbookTime;
    if(data.workbooks === undefined){
      data.workbooks = [{
        workbookid: workbook.workbookid,
        data: workbookData,
        numberOfUsers: numberOfUsers,
        workbookAverage: totalWorkbookTime / numberOfUsers,
        totalWorkbookTime: totalWorkbookTime
      }]
    }
    else {
      const newWorkbooks = data.workbooks.concat({
        workbookid: workbook.workbookid,
        data: workbookData,
        numberOfUsers: numberOfUsers,
        workbookAverage: totalWorkbookTime / numberOfUsers,
        totalWorkbookTime: totalWorkbookTime
      })
      data.workbooks = newWorkbooks
    }
  })

  let count = 0;
  workbooks.forEach(workbook => {
    count += workbook.data.length
  })
  data.totalPageTime = totalPageTime;
  data.averagePageTime = totalPageTime / count;
  //console.log('pagetime', data)
  return data;

}

/**
 * page progress below
 *
 * Gets the average progress of users per workbook and over all.
 *
 */

const pageProgressAverage = (workbooks) => {

  let data = {}
  let totalProgress = 0;
  let totalPages = 0;

  workbooks.forEach(workbook =>{
    const numberOfUsers = workbook.data.length

    let totalWorkbookProgress = 0;
    let numberOfNonStarters = 0;

      workbook.data.map(user => {

        if (user.workbooks_progress) {
          totalPages = user.workbooks_progress.total_pages;
        totalWorkbookProgress += user.workbooks_progress.completed_pages;
        if(user.workbooks_progress.completed_pages === 0){
          numberOfNonStarters += 1
        }
      } else {
        numberOfNonStarters += 1;
      }
    })

    const averageWorkbookProgress = totalWorkbookProgress / numberOfUsers;

    let completeWorkbookData = {
      workbookid: workbook.workbookid,
     // timeWatchedAverage: Math.round(averageWorkbookProgress * 100) / 100
        progressAverage: averageWorkbookProgress * 100,
        numberOfUsers: numberOfUsers,
        totalPages: totalPages,
        numberOfNonStarters: numberOfNonStarters
    }

    totalProgress += totalWorkbookProgress;

    if(data.workbooks === undefined){
      data.workbooks = [completeWorkbookData]
    } else {
      const newWorkBooks = data.workbooks.concat(completeWorkbookData)
      data.workbooks = newWorkBooks
    }
  })

  let count = 0;
  workbooks.forEach(workbook => {
    count += workbook.data.length
  })
    //data.totalAverageProgress = totalProgress / count;
  data.totalAverageProgress = totalProgress / (count * totalPages) ;
  //console.log("pageprogress",data)

  return data;

}

/**
 * videos below
 *
 * returns the average watch time of each video per page,
 * per workbook, and overall.
 *
 */

const videoplayerAnalytics = (workbooks) => {

  let data = {}
  let totalTimeWatched = 0;

  workbooks.forEach(workbook => {

    let workbookData = {}
    let workbookTotalTimeWatched = 0

    workbook.data.forEach(user => {
      if(user.videos){
        const workbookIndex = user.videos.findIndex(videoWorkbook => {
          return videoWorkbook.workbookid === workbook.workbookid
        })

        if(workbookIndex !== -1){
          user.videos[workbookIndex].pages.forEach(page => {
            page.videos.forEach(video => {
              workbookTotalTimeWatched += video.watched;
              if(Object.keys(workbookData).length === 0){
                workbookData = [{
                  pageid: page.pageid,
                  data: [{
                    videolink: video.videolink,
                    totaltimeWatched: video.watched,
                    userCount: 1,
                    averagetimeWatchedPerUser: video.watched 
                  }]
                }]
              } else {

                const pageIndex = workbookData.findIndex(p => {
                  return p.pageid === page.pageid;
                })

                if(pageIndex === -1) {
                  const newPageData = workbookData.concat({
                    pageid: page.pageid,
                    data: [{
                      videolink: video.videolink,
                      totaltimeWatched: video.watched,
                      userCount: 1,
                      averagetimeWatchedPerUser: video.watched 
                    }]
                  })
                  workbookData = newPageData;
                }
                else {

                  const linkIndex = workbookData[pageIndex].data.findIndex(v => {
                    return v.videolink === video.videolink;
                  })

                  if(linkIndex === -1){
                    const newVideoData = workbookData[pageIndex].data.concat({
                      videolink: video.videolink,
                      totaltimeWatched: video.watched,
                      userCount: 1,
                      averagetimeWatchedPerUser: video.watched 
                    })
                    workbookData[pageIndex].data = newVideoData;
                  } else {
                    const updatedLinkData = {
                      videolink: video.videolink,
                      totalTimeWatched: video.watched + workbookData[pageIndex].data[linkIndex].totaltimeWatched,
                      userCount: 1 + workbookData[pageIndex].data[linkIndex].userCount,
                      averageTimeWatched: (workbookData[pageIndex].data[linkIndex].dtotaltimeWatched + video.watched) / (workbookData[pageIndex].data[linkIndex].userCount + 1)
                    }
                    workbookData[pageIndex].data[linkIndex] = updatedLinkData
                  }
                }
              }
            })
          })
        }
      }
    })

    let completeWorkbookData = {
      workbookid: workbook.workbookid,
      timeWatchedAverage: workbookTotalTimeWatched / workbook.data.length,
      data: workbookData
    }

    totalTimeWatched += workbookTotalTimeWatched;

    if(data.workbooks === undefined){
      data.workbooks = [completeWorkbookData]
    } else {
      const newWorkBooks = data.workbooks.concat(completeWorkbookData)
      data.workbooks = newWorkBooks
    }
  })

  let count = 0;
  workbooks.forEach(workbook => {
    count += workbook.data.length;
  })
  data.overallWatchTime = totalTimeWatched;
  data.averageTimeWatched = totalTimeWatched / count;

  //console.log('videos',data);
  return data;
}

/**
 * hyperlink functions
 *
 * returns the number of times a hyperlink has been clicked
 * per page, per workbook, and over all, based on how many users
 * there are.
 *
 */

const hyperlinkAnalytics = (workbooks) => {
  let data = {}
  let overallClicks = 0;

  workbooks.map(workbook => {
    let workbookData = {}
    let totalClicks = 0;

    workbook.data.forEach(user => {
      if(user.hyperlinks){

        const workbookIndex = user.hyperlinks.findIndex(userWorkbook => {
          return userWorkbook.workbookid === workbook.workbookid;
        })

        if(workbookIndex !== -1){
          user.hyperlinks[workbookIndex].pages.forEach(page => {
            page.links.forEach(link => {
              totalClicks += link.clicked
              if(Object.keys(workbookData).length === 0){
                workbookData = [{
                  pageid: page.pageid,
                  data: [{
                    hyperlink: link.linkid,
                    totaltimesClicked: link.clicked,
                    userCount: 1,
                    averageTimesClicked: link.clicked / workbook.data.length
                  }]
                }]
              } else {

                const pageIndex = workbookData.findIndex(p => {
                  return p.pageid === page.pageid;
                })

                if(pageIndex === -1){
                  const newPagesData = workbookData.concat({
                    pageid: page.pageid,
                    data:[{
                      hyperlink: link.linkid,
                      totaltimesClicked: link.clicked,
                      userCount: 1,
                      averageTimesClicked: link.clicked / workbook.data.length
                    }]
                  })
                  workbookData = newPagesData;
                } else {

                  const linkIndex = workbookData[pageIndex].data.findIndex(l => {
                    return l.hyperlink === link.linkid;
                  })

                  if(linkIndex === -1){
                    const newPagesData = workbookData[pageIndex].data.concat({
                        hyperlink: link.linkid,
                        totaltimesClicked: link.clicked,
                        userCount: 1,
                        averageTimesClicked: link.clicked / workbook.data.length
                      })
                    workbookData[pageIndex].data = newPagesData;
                  } else {
                    const newLinkData = {
                      hyperlink: link.linkid,
                      totaltimesClicked: (workbookData[pageIndex].data[linkIndex].totaltimesClicked + link.clicked),
                      userCount: workbookData[pageIndex].data[linkIndex].userCount + 1,
                      averageTimesClicked: (workbookData[pageIndex].data[linkIndex].totaltimesClicked + link.clicked) / workbook.data.length
                    }
                  workbookData[pageIndex].data[linkIndex].data = newLinkData;
                  }

                }
              }
            })
          })
        }
      }
    })
    let completeWorkbookData = {
      workbookid: workbook.workbookid,
      clicksAverage: totalClicks / workbook.data.length,
      data: workbookData,
    }

    overallClicks += totalClicks;

    if(data.workbooks === undefined){
      data.workbooks = [completeWorkbookData]
    } else {
      const newWorkBooks = data.workbooks.concat(completeWorkbookData)
      data.workbooks = newWorkBooks
    }
  })

  let count = 0;
  workbooks.forEach(workbook => {
    count += workbook.data.length;
  })
  data.overallClicks = overallClicks;
  data.averageClicks = overallClicks / count;
  //console.log('hyperlinks',data);
  return data;

}

/**
 * user input functions
 *
 * returns average time taken to interact with a user input.
 * This is based on how many people have actually interacted with it.
 * The overall time is based on how many users have access to the workbook,
 * not necessarily how many have interacted with it.
 *
 */
const userInputAnalytics = (workbooks) => {

  let data = {}
  let overallInputTime = 0;

  workbooks.forEach(workbook => {

    let workbookData = {}
    let inputTotalTime = 0;
    workbook.data.forEach(user => {
      if(user.userinput) {


        const workbookIndex = user.userinput.findIndex(wb => {
          return wb.workbookid === workbook.workbookid
        })

        if(workbookIndex !== -1){
          user.userinput[workbookIndex].pages.forEach(page => {
            page.inputs.forEach(input => {
              inputTotalTime += input.timeTakenToInput;
              if(Object.keys(workbookData).length === 0){
                workbookData = [{
                  pageid: page.pageid,
                  data: [{
                    inputId: input.inputID,
                    timeTakenToInteract: input.timeTakenToInput,
                    userCount: 1,
                    averageTimeTakenToInteractPerUser: input.timeTakenToInput 
                  }]
                }]
              } else {

                const pageIndex = workbookData.findIndex(p => {
                  return p.pageid === page.pageid;
                })

                if(pageIndex === -1){
                  const newInputData = workbookData.concat({
                    pageid: page.pageid,
                    data: [{
                      inputId: input.inputID,
                      timeTakenToInteract: input.timeTakenToInput,
                      userCount: 1,
                      averageTimeTakenToInteractPerUser: input.timeTakenToInput 
                    }]
                  })
                  workbookData = newInputData;
                } else {

                  const inputIndex = workbookData[pageIndex].data.findIndex(i => {
                    return i.inputId === input.inputID;
                  })

                  if(inputIndex === -1){
                    const newInput = workbookData[pageIndex].data.concat({
                        inputId: input.inputID,
                        timeTakenToInteract: input.timeTakenToInput,
                        userCount: 1,
                        averageTimeTakenToInteractPerUser: input.timeTakenToInput 
                    })
                    workbookData[pageIndex].data = newInput;
                  } else {
                    //console.log('t', workbookData[pageIndex].data[inputIndex])
                    const newInputData = {
                      inputId: input.inputID,
                      timeTakenToInteract: workbookData[pageIndex].data[inputIndex].timeTakenToInteract + input.timeTakenToInput,
                      userCount: workbookData[pageIndex].data[inputIndex].userCount + 1,
                      averageTimeTakenToInteract: (input.timeTakenToInput + workbookData[pageIndex].data[inputIndex].timeTakenToInteract) / (workbookData[pageIndex].data[inputIndex].userCount + 1)
                    }
                    workbookData[pageIndex].data[inputIndex].data = newInputData;
                  }
                }
              }
            })
          })
        }
      }
    })

    let completeWorkbookData = {
      workbookid: workbook.workbookid,
      timeTakenAverage: inputTotalTime / workbook.data.length,
      data: workbookData
    }

    overallInputTime += inputTotalTime;

    if(data.workbooks === undefined){
      data.workbooks = [completeWorkbookData]
    } else {
      const newWorkBooks = data.workbooks.concat(completeWorkbookData)
      data.workbooks = newWorkBooks
    }
  })

  let count = 0;
  workbooks.forEach(workbook => {
    count += workbook.data.length;
  })
  const overallAverage = overallInputTime / count

  data.overallAverage = overallAverage;
  data.totalInputTime = overallInputTime

  //console.log("userinput", data)
  return(data);
}

export default {  modifyData,
                  userInputAnalytics,
                  videoplayerAnalytics,
                  hyperlinkAnalytics,
                  pageProgressAverage,
                  pageTimeAnalytics,
                  usersPerWorkbook
                };
