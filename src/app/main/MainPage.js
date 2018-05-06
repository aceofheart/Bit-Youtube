import React, { Component } from "react";
import { Search } from "./Search";
import { VideoFrame } from "./VideoFrame";
import YTSearch from 'youtube-api-search';
import debounce from 'lodash/debounce';
import { API_KEY } from "../shared/constants";
import { SuggestedList } from "./SuggestedList";
import { HistoryList } from "./HistoryList";


export class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            selectedVideo: null,
            term: "Historia de un amor",
            newTerm: "",
            selectedId: "",
            previousVideos: []
        }

    }

    componentDidMount() {
        this.videoSearch(this.state.term)

    }

    videoSearch = debounce(term =>
        YTSearch(
            { key: API_KEY, term },
            videos => {
                const firstRemoved = [...videos]
                firstRemoved.splice(0, 1);

                this.setState({
                    videos: firstRemoved,
                    selectedVideo: videos[0],
                    selectedId: videos[0].id.videoId

                })
            }
        ), 1000)


    selectVideo = (video, index) => {
        this.setState({
            selectedVideo: video,
        })
    }


    setHistoryList = (video) => {
        const previousList = Object.assign([], this.state.previousVideos);
        const single = Object.assign({}, this.state.selectedVideo);
        const stringPrevious = JSON.stringify(previousList);

        if (stringPrevious.indexOf(JSON.stringify(single)) === -1) {
            previousList.unshift(single)
        } else {
            const movedToFrontIndex = previousList.findIndex(item => {
                return item.id.videoId === single.id.videoId
            })
            previousList.unshift(previousList.splice(movedToFrontIndex, 1)[0])
        }
        this.setState({
            previousVideos: previousList
        })
    }

    


    updateSuggestedList = (video) => {
        const videoTitle = video.snippet.title;
        const newTerm = videoTitle.slice(1, 20);

        YTSearch(
            { key: API_KEY, term: newTerm },
            videos => {
                this.setState({
                    videos: videos
                })
            }
        )
    }


    renderVideo() {
        if (!this.state.selectedVideo) {
            return <div>Loading...</div>
        }
        return <VideoFrame video={this.state.selectedVideo}
            id={this.state.selectedId} />
    }


    renderSuggestedVideo() {
        if (!this.state.videos) {
            return <div>Loading...</div>
        }
        return <SuggestedList videos={this.state.videos}
            selected={this.selectVideo}
            update={this.updateSuggestedList}
            setHistory={this.setHistoryList} />
    }



    renderHistoryList() {
        if (this.state.previousVideos.length) {
            return <HistoryList previous={this.state.previousVideos}
                selected={this.state.selectedVideo}
                play={this.selectVideo} />
        }
    }


    onSearchInputHandler = (event) => {
        let selectedTerm = event.target.value
        this.setState({
            newTerm: selectedTerm
        })
    }


    onSearchButton = (event) => {
        event.preventDefault();
        this.videoSearch(this.state.newTerm)
        this.setState({
            newTerm: ""
        })
    }

    render() {

        return (
            <div className="container">
                <div className="row justify-content-between">
                    <Search onChangeHandler={this.onSearchInputHandler}
                        onSearch={this.onSearchButton}
                        value={this.state.newTerm}
                    />
                    <div className="col-lg-7 col-md-7 col-sm-12">
                        <div className="row">
                            <div className="main-box col-lg-12 col-md-12 col-sm-12">
                                {this.renderVideo()}
                            </div>
                            <div className="youtube-history">
                                {this.renderHistoryList()}
                            </div>
                        </div>
                    </div>

                    <div className="youtube-list col-lg-3 col-md-4 col-sm-12">
                        <h4>Suggested videos</h4>
                        {this.renderSuggestedVideo()}
                    </div>
                </div>
            </div>
        )
    }
}