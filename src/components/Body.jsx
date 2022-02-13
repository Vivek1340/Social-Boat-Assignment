import React, { useState, useEffect } from "react";
import './bodyStyles.css';
import Spinner from "./Spinner";
import { IoSadOutline } from "react-icons/io5";
import { BsFacebook, BsLinkedin, BsInstagram } from "react-icons/bs";


var dummyUser = {
  "bio": "Calisthenics has been a part of my life for over 10 years, and my practice has helped me grow stronger, more flexible and fearless, both on and off the mat. In my classes, I love to combine creative sequencing, a spirit of playfulness and a dose of inspiration to help you deepen your practice.",
  "fb": "http://www.example.com",
  "name": "Vivek Anand",
  "img": "https://cdn-icons-png.flaticon.com/512/21/21104.png",
  "uid": "ed5b355c-1ab8-4b9f-9ec0-9596fcf93ac7"
}
export default function Body({ userInfo, searchQ }) {

  const [users, setUsers] = useState({});
  const [videos, setvideos] = useState([]);
  const [state, setState] = useState(false);
  const [userError, setUserError] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(Object.keys(users).length);
  //   const [user, setUser] = useContext(UserContext);
  //   console.log(user);
  // const val = "";
  console.log(userInfo);
  useEffect(() => {
    fetch(
      `https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentGet?uid=${userInfo}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Server is busy!');
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATA:", data);
        setUserError(null);
        setUsers(data);
        setIsPending(false);
        data.error ? setState(false)
          :
          setState(true);
        if (!data.error) {
          dummyUser = data.profile
        }
      })
      .catch(err => {
        setUserError(err.message)
        setIsPending(false)
      })


    fetch(`https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${searchQ || 'ra'}&numResults=24`)
      .then(res => {
        if (!res.ok) {
          throw Error('COULD NOT FETCH DATA!');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setError(null);
        data.results &&
          setvideos(data.results);
        setIsLoading(false);

      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false);
      })
    console.log(searchQ)
  }, [searchQ]);

  // console.log(videos);
  // console.log(users);
  return (
    <div>

      {/* {isPending && <div>  Loading... </div>} */}
      {/* display users from the API */}
      {/* {userError && <div>{userError}</div>} */}
      <div className="backGround">
        {state ? (<div className="profile">
          <img src={users.profile.img} alt="profile image" />
          <div className="profile-text">
            <h1>{users.profile.name}</h1>
            <p>{users.profile.bio}</p>
            <div className="social"><a href={users.profile.fb}><BsFacebook /></a>
              <a href='#'><BsInstagram /></a>
              <a href="#"><BsLinkedin /></a></div>


          </div>



        </div>) :
          (
            <div className="profile">
              <img src={dummyUser.img} alt="profile image" />
              <div className="profile-text">
                <h1>{dummyUser.name}</h1>
                <p>{dummyUser.bio}</p>
                <div className="social">
                  <a href={dummyUser.fb}><BsFacebook /></a>
                  <a href='#'><BsInstagram /></a>
                  <a href="#"><BsLinkedin /></a>
                </div>
              </div>

            </div>
          )
        }
      </div>
      {isLoading && <div className="loader"><Spinner /></div>}
      {error && <div className="error">
        {error}
        <IoSadOutline className="icon" />
      </div>}
      <div className="videoContainer">
        <h1>My videos</h1>
        <div className="video">
          {
            videos.length !== 0 && videos.map((video, index) => { return (<div className="singleVideo"><video width='350' height='350' controls><source src={video.video} type='video/mp4' /></video><p>{video.heading}</p></div>) })
          }
        </div>
      </div>
    </div>


  );
}


//ed5b355c-1ab8-4b9f-9ec0-9596fcf93ac7
//0f2210f2-499c-4119-a3cf-36073995a7a8
