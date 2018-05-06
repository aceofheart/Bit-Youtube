import React from "react";

export const SuggestedList = ({videos,selected,update,setHistory}) =>{
    const listYT = videos;
  
    return (
      
          listYT.map((video,i) =>{
            return (
                    
                <a href="#frame" className="youtube-list-item" key={video.id.videoId} onClick={(event)=>{selected(video,i);update(video);setHistory(video)}}>
                    <img title={video.id.videoId} src={video.snippet.thumbnails.high.url} alt="video-img"></img>
                    <h6 title={video.id.videoId}>{video.snippet.title}</h6>
                    <p title={video.id.videoId} className="channel">{video.snippet.channelTitle}</p>
                </a>
                  
                )
          })
    )
    

}