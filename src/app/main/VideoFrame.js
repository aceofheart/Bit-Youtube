import React, { Fragment } from "react";


export const VideoFrame = ({video,id,setHistory,previousList}) => {
    const videoId = video.id.videoId;
  
    
    const url = `https://www.youtube.com/embed/${videoId}`
  
    return (
      <Fragment>
        <div className="main-video" id="frame">
        <iframe width="590" height="337" src={url} frameBorder="0" allowFullScreen title={videoId}></iframe>
        </div>
        <h4>{video.snippet.title}</h4>
        <p>{video.snippet.channelTitle}</p>
       
      </Fragment>
     
    )
  }