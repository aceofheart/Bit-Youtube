import React from "react";

export const HistoryListItem = ({video,play}) =>{
    
    return (
       
           <a href="#frame" className="youtube-list-item-history" key={video.id.videoId} onClick={event=>{play(video)}}>
                <img title={video.id.videoId} src={video.snippet.thumbnails.high.url} alt="video-img"></img>
                <h6 title={video.id.videoId}>{video.snippet.title}</h6>
                <p title={video.id.videoId} className="channel">{video.snippet.channelTitle}</p>
            </a>
       
    )
    

}