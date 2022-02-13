import React, { useEffect, useState } from "react";


export default function Video() {
console.log('kuch v');
    const [videos, setvideos] = useState([]);
    const [run , setRun] = useState(true);

   useEffect(() => {
        console.log('hello');
        fetch('https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=ra&numResults=25')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setvideos(data);
            })
            .catch(err => console.log(err))
    }, [run]);
    setRun(false);
    return (

        <div>
        {
            videos.results.map((video , index) =>
           { return(<h1>{video.heading}</h1>)})
        }
        </div>


    );
}