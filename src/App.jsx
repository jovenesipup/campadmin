import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import UserContext from "./context/UserContext";

function App() {

  const userData = {
    user: null,
    role: null
  }
  const [user, setUser] = useState(userData);
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
