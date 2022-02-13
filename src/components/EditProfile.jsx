import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function EditProfile(props) {
 
  console.log(props);
 
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const uid = uuidv4();
    const userDetail = {name : inputs.name,uid:uid}
    props.handle(userDetail);

    inputs.uid = uid;
    console.log(inputs);
    fetch(
      "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentPost",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputs),
      }
    ).then(() => {
      console.log("new user added");
      navigate("/");
    });
 
  };

  return (
    <form action="/" onSubmit={handleSubmit} className = "form">
    <div>
      <label htmlFor="name"> Name: </label>
      <input
        id="name"
        type="text"
        value={inputs.name || ""}
        onChange={handleChange}
        name="name"
      />
      </div>
      <div>
      <label htmlFor="age"> Age: </label>
      <input
        id="age"
        type="number"
        value={inputs.age || ""}
        onChange={handleChange}
        name="age"
      />
      </div>
      <div>
      <label htmlFor="img"> IMAGE: </label>
      <input
        id="img"
        type="text"
        value={inputs.img || ""}
        onChange={handleChange}
        name="img"
      />
      </div>
      <div>
      <label htmlFor="bio"> Description: </label>
      <textarea
        id="bio"
        type="text"
        value={inputs.bio || ""}
        onChange={handleChange}
        name="bio"
      ></textarea>
      </div>
      <div>
      <label htmlFor="fb"> Facebook: </label>
      <input
        id="fb"
        type="url"
        value={inputs.fb || ""}
        onChange={handleChange}
        name="fb"
      />
      </div>
      <div>
      <label htmlFor="insta"> Instagram : </label>
      <input
        id="insta"
        type="url"
        value={inputs.insta || ""}
        onChange={handleChange}
        name="insta"
      />
      </div>
      <div>
      <label htmlFor="linkedin"> Linkedin : </label>
      <input
        id="linkedin"
        type="url"
        value={inputs.linkedin || ""}
        onChange={handleChange}
        name="linkedin"
      />
      </div>
      <input type="submit" className="button"/>
    </form>
  );
}
