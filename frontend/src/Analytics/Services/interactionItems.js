import axios from 'axios';
import { useContext } from 'react';
const userUrl = process.env.REACT_APP_SERVER_URI + '/users';

const postUserInput = (userid, json) => {
  axios
    .put(`${userUrl}/${userid}`, json, { withCredentials: true})
}

const hyperlink = (data) => {

  // case where user has no defined data for the hyperlinks
  if(data.userdata['hyperlinks'] === undefined || data.userdata['hyperlinks'] === null || data.userdata['hyperlinks'] === {}){
    
    const linkdata = [{'linkid' : data.hyperlink, 'clicked': 1}]
    const pagedata = [{'pageid' : data.pageId, 'links' : linkdata}];
    const workbooks = [{'workbookid' : data.workbookId, 'pages': pagedata}]
    const new_hyperlinks = {'hyperlinks': workbooks};
    let newUserData= data.userdata;
    newUserData['hyperlinks'] = workbooks;
    data.setUserData(newUserData);
    postUserInput(data.userdata['id'], new_hyperlinks);
  }
  // case where it is defined 
  else {

    // get index of workbook if it exists, else return -1
    let workbook_id = data.userdata['hyperlinks'].findIndex((workbook) => {
      return workbook.workbookid === data.workbookId
    })

    // case where data for the workbook doesn't exist
    if(workbook_id === -1){
      const linkdata = [{'linkid' : data.hyperlink, 'clicked': 1}]
      const pagedata = [{'pageid' : data.pageId, 'links' : linkdata}];
      const new_json = {'workbookid' : data.workbookId, 'pages': pagedata}
      const new_data = data.userdata['hyperlinks'].concat(new_json);
      const new_property = {'hyperlinks': new_data};

      let newUserData=data.userdata;
      newUserData['hyperlinks'] = new_data;
      data.setUserData(newUserData);
      postUserInput(data.userdata['_id'], new_property);
    }
    // case where data for the workbook does exist
    else {
      // get index of page if it exists, else return -1

      let page_id = data.userdata['hyperlinks'][workbook_id].pages.findIndex((page) => {
        return page.pageid === data.pageId
      })

      // case where data for page does not currently exist
      if(page_id === -1){
        const linkdata = [{'linkid' : data.hyperlink, 'clicked': 1}];
        const new_pagedata_entry = {'pageid' : data.pageId, 'links' : linkdata};
        const pagedata = data.userdata['hyperlinks'][workbook_id].pages.concat(new_pagedata_entry);
        let new_hyperlinks = data.userdata['hyperlinks'];
        new_hyperlinks[workbook_id].pages = pagedata;
        const new_property = {'hyperlinks' : new_hyperlinks}

        let newUserData = data.userdata;
        newUserData['hyperlinks'] = new_hyperlinks;
        data.setUserData(newUserData);
        postUserInput(data.userdata['id'], new_property);
      }
      // case where data for page does it exist
      else {
        // get index of link if it exists, else return -1
        let link_id = data.userdata['hyperlinks'][workbook_id].pages[page_id].links.findIndex((link) => {
          return link.linkid === data.hyperlink 
        })

        // case where link on given page has not been clicked yet
        if(link_id === -1){
          const new_linkdata_entry = {'linkid' : data.hyperlink, 'clicked': 1};
          const new_linkdata = data.userdata['hyperlinks'][workbook_id].pages[page_id].links.concat(new_linkdata_entry);
          let new_hyperlinks = data.userdata['hyperlinks'];
          new_hyperlinks[workbook_id].pages[page_id].links = new_linkdata
          const new_property = {'hyperlinks' : new_hyperlinks}

          let newUserData = data.userdata;
          newUserData['hyperlinks'] = new_hyperlinks;
          data.setUserData(newUserData);

          postUserInput(data.userdata['id'], new_property);
          console.log('new link', new_property)
        }
        // case where link has been clicked
        else {
          let new_hyperlinks = data.userdata['hyperlinks']
          new_hyperlinks[workbook_id].pages[page_id].links[link_id].clicked += 1
          const new_property = {'hyperlinks' : new_hyperlinks}
          
          let newUserData = data.userdata;
          newUserData['hyperlinks'] = new_hyperlinks;
          data.setUserData(newUserData);

          postUserInput(data.userdata['id'], new_property);
          console.log('old link', new_property)
        }
      }
    }
  }
}

const userinput = (data) => {

  // case where data is undefined
  console.log('UI data', data)
  if(data.userdata.userinput === undefined || data.userdata.userinput === null || data.userdata.userinput === {}){
    const uinput = [{'inputID' : data.inputID, 'input' : data.input, 'timeTakenToInput': data.timetaken}]
    const pagedata = [{'pageid' : data.pageId, 'inputs' : uinput}];
    const workbooks = [{'workbookid' : data.workbookId, 'pages': pagedata}]
    const new_videos = {'userinput': workbooks};
    
    let newUserData = data.userdata;
    newUserData['userinput'] = workbooks;
    data.setUserData(newUserData);

    postUserInput(data.userdata['id'], new_videos);
    console.log("no defined data", new_videos);
  }

  // case where data is defined
  else {

    // get workbook index if it exists, otherwise return -1
    let workbook_id = data.userdata['userinput'].findIndex((workbook) => {
      return workbook.workbookid === data.workbookId
    })

    // case where workbook data does not exist
    if(workbook_id === -1){
      const uinput = [{'inputID' : data.inputID, 'input' : data.input, 'timeTakenToInput': data.timetaken}]
      const pagedata = [{'pageid' : data.pageId, 'inputs' : uinput}];
      const new_json = {'workbookid' : data.workbookId, 'pages': pagedata}
      const new_data = data.userdata['userinput'].concat(new_json);
      const new_property = {'userinput': new_data};

      let newUserData = data.userdata;
      newUserData['userinput'] = new_data;
      data.setUserData(newUserData);

      postUserInput(data.userdata['_id'], new_property);
      console.log('new workbook', new_property);
    }

    // case where workbook does exist
    else {

      // get index of page if it exists, else return -1
      let page_id = data.userdata['userinput'][workbook_id].pages.findIndex(page => {
        return page.pageid === data.pageId
      })

      // case where page data doesn't exist
      if(page_id === -1){
        const uinput = [{'inputID' : data.inputID, 'input' : data.input, 'timeTakenToInput': data.timetaken}]
        const new_pagedata_entry = {'pageid' : data.pageId, 'inputs' : uinput};
        const pagedata = data.userdata['userinput'][workbook_id].pages.concat(new_pagedata_entry);
        let new_userinput = data.userdata['userinput'];
        new_userinput[workbook_id].pages = pagedata;
        const new_property = {'userinput' : new_userinput}

        let newUserData = data.userdata;
        newUserData['userinput'] = new_userinput;
        data.setUserData(newUserData);

        postUserInput(data.userdata['id'], new_property);
        console.log('new page: ', new_property)
      }

      // case where page does exist
      else {

        // get index of input if it exists, else return -1
        let input_id = data.userdata['userinput'][workbook_id].pages[page_id].inputs.findIndex((userinput) => {
          return userinput.inputID === data.inputID
        })

        // case  where input data does not exist
        if(input_id === -1){
          const new_uinput_entry = {'inputID' : data.inputID, 'input' : data.input, 'timeTakenToInput': data.timetaken};
          const new_uinputdata = data.userdata['userinput'][workbook_id].pages[page_id].inputs.concat(new_uinput_entry);
          let new_userinput = data.userdata['userinput'];
          new_userinput[workbook_id].pages[page_id].inputs = new_uinputdata
          const new_property = {'userinput' : new_userinput}

          let newUserData = data.userdata;
          newUserData['userinput'] = new_userinput;
          data.setUserData(newUserData);

          postUserInput(data.userdata['id'], new_property);
          console.log('new UI', new_property)
        }

        // case where input exists
        else {
          let new_userinput = data.userdata['userinput']
          const new_uinput_entry = {'inputID' : data.inputID, 'input' : data.input, 'timeTakenToInput': data.timetaken};
          new_userinput[workbook_id].pages[page_id].inputs[input_id] = new_uinput_entry
          const new_property = {'userinput' : new_userinput}

          let newUserData = data.userdata;
          newUserData['userinput'] = new_userinput;
          data.setUserData(newUserData);

          postUserInput(data.userdata['id'], new_property);
          console.log('old UI', new_property)
        }
      }
    }
  }
}

const videoplayer = (data) => {

  // case where data is undefined 
  if(data.userdata.videos === undefined || data.userdata.videos === null || data.userdata.videos === {}){
    const videodata = [{'videolink' : data.videolink, 'watched': data.timewatched}]
    const pagedata = [{'pageid' : data.pageId, 'videos' : videodata}];
    const workbooks = [{'workbookid' : data.workbookId, 'pages': pagedata}]
    const new_videos = {'videos': workbooks};

    let newUserData = data.userdata;
    newUserData['videos'] = workbooks;
    data.setUserData(newUserData);

    postUserInput(data.userdata['id'], new_videos);
    console.log("no defined data", new_videos);
  }

  // case where it is defined 
  else {

    // get index of workbook if it exists, else return -1
    let workbook_id = data.userdata['videos'].findIndex((workbook) => {
      return workbook.workbookid === data.workbookId
    })

    // case where data for the workbook doesn't exist
    if(workbook_id === -1){
      const videodata = [{'videolink' : data.videolink, 'watched': data.timewatched}]
      const pagedata = [{'pageid' : data.pageId, 'videos' : videodata}];
      const new_json = {'workbookid' : data.workbookId, 'pages': pagedata}
      const new_data = data.userdata['videos'].concat(new_json);
      const new_property = {'videos': new_data};

      let newUserData = data.userdata;
      newUserData['videos'] = new_data;
      data.setUserData(newUserData);

      postUserInput(data.userdata['_id'], new_property);
      console.log('new workbook', new_property);
    }
    
    // case where data for workbook does exist
    else {
      
      // get index of page if it exists, else return -1
      let page_id = data.userdata['videos'][workbook_id].pages.findIndex(page => {
        return page.pageid === data.pageId
      })

      // case where page data doesn't exist
      if(page_id === -1){
        const videodata = [{'videolink' : data.videolink, 'watched': data.timewatched}]
        const new_pagedata_entry = {'pageid' : data.pageId, 'videos' : videodata};
        const pagedata = data.userdata['videos'][workbook_id].pages.concat(new_pagedata_entry);
        let new_videos = data.userdata['videos'];
        new_videos[workbook_id].pages = pagedata;
        const new_property = {'videos' : new_videos}
        
        let newUserData = data.userdata;
        newUserData['videos'] = new_videos;
        data.setUserData(newUserData);

        postUserInput(data.userdata['id'], new_property);
        console.log('new page: ', new_property)
      }

      // case where page data does exist
      else {

        // get index of video if it exists, else return -1
        let video_id = data.userdata['videos'][workbook_id].pages[page_id].videos.findIndex((video) => {
          return video.videolink === data.videolink
        })

        // case  where video data does not exist
        if(video_id === -1){
          const new_videodata_entry = {'videolink' : data.videolink, 'watched': data.timewatched};
          const new_videodata = data.userdata['videos'][workbook_id].pages[page_id].videos.concat(new_videodata_entry);
          let new_videos = data.userdata['videos'];
          new_videos[workbook_id].pages[page_id].videos = new_videodata
          const new_property = {'videos' : new_videos}

          let newUserData = data.userdata;
          newUserData['videos'] = new_videos;
          data.setUserData(newUserData);

          postUserInput(data.userdata['id'], new_property);
          console.log('new video', new_property)
        }

        // case where link has been clicked
        else {
          let new_videos = data.userdata['videos']
          if(new_videos[workbook_id].pages[page_id].videos[video_id].watched < data.timewatched){
            new_videos[workbook_id].pages[page_id].videos[video_id].watched = data.timewatched
          }
          const new_property = {'videos' : new_videos}

          let newUserData = data.userdata;
          newUserData['videos'] = new_videos;
          data.setUserData(newUserData);

          postUserInput(data.userdata['id'], new_property);
          console.log('old video', new_property)
        }
      }
    }
  }
}

export { hyperlink, videoplayer, userinput }