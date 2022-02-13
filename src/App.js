import React, {  useState} from "react";
import ReactDOM from "react-dom";
import EditProfile from "./components/Edit Profile/EditProfile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [search , setSearch] = useState('');
  const [user, setUser] = useState({});
  
  return (
    <div>
      <Router>
        <Header onChange = {setSearch} searchData = {search} name = {user.name} />
          <Routes>
            <Route exact path="/" element={<Body userInfo={user.uid} searchQ ={search} />} />
            <Route
              exact
              path="/editProfile"
              element={<EditProfile handle={setUser} />}
            />
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
