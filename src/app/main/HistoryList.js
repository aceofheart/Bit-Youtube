import React, { Fragment } from "react";
import { HistoryListItem } from "./HistoryListItem"

export const HistoryList = ({previous,selected,play}) =>{
    let  previousVideosList = previous;
 
    return (
            <Fragment>
                  <h2>Watch it again</h2> 
                  {previousVideosList.map((video,i) =>{
                        return <HistoryListItem video={video} key={i} play={play}/>
                  })}
            </Fragment>

       
    )
    

}