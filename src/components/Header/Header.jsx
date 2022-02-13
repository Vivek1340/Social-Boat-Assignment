import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./header.css";

export default function Header(props) {
  const [videosSearch, setVideoSearch] = useState([]);
  useEffect(() => {
    console.log('hello');
    fetch(`https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${props.searchData || ''}&numResults=5`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        data.results &&
          setVideoSearch(data.results);
      })
      .catch(err => console.log(err))
  }, [props.searchData]);
  return (
    <div className="header">
      
      <Link to="/" ><h1>Fitness <span>Freaks</span> </h1></Link>


      <div className="search">
        <input type="search" className="search__input" onChange={(e) => props.onChange(e.target.value)} value={props.searchData} name="q" />
        <ul>
          {props.searchData !== '' && videosSearch.length !== 0 && videosSearch.map((video, index) => { return (<li>{video.heading}</li>) })}
        </ul>
      </div>

      <div className="user">
        {props.name ? props.name[0] : 'V'}
        <div className="dropdown">



          <div className="dropdown-content">
            <Link to="/editProfile">Edit profile</Link>
            <Link to="#">Log out</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
