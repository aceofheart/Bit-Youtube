import React from "react";



const Search = (props) => {

    return(
        <div className="searchBar col-12">
        <form className="form-inline w-75 ">
            <input onChange={props.onChangeHandler} value={props.value}  className="form-control w-75" type="search" placeholder="Search" aria-label="Search"/>
            <button onClick={props.onSearch} className="btn btn-outline my-2 my-sm-0">Search</button>
        </form>
        </div>
    )
}

export { Search };