import React from "react";
import { NameContext } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Authors from "./Pages/Authors";
import Create from "./Pages/Create";
import EditProfile from "./Pages/EditProfile";

function App() {
  let details = {
    name: "Kwanele",
    lastname: "Gamedze",
  };
  return (
    <NameContext.Provider value={details}>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </NameContext.Provider>
  );
}

export default App;
