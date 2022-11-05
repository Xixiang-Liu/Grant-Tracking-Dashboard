import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/NavBar/NavIndex';
import Home from "./pages/Home";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Edit from './pages/Edit';
import Login from './pages/Login';
import isSubmitting from './pages/Login';

function App() {
  if(isSubmitting){
    return <Login />
  }
  else
  return (
    
    <div className="App">
      <Router>
        
        <div className="container">
          
        <Navbar />
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/Login" element={<Login />} />
        </Routes>
        </div>
        
      </Router>
    </div>
    
  );
}
  

export default App;
