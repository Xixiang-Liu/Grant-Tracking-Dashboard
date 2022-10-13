import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/About';
import Edit from './pages/Edit';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/About' component={About} />
        <Route path='/Edit' component={Edit}/>
        <Route path='/Upload' component={Upload}/>
      </Routes>
    </Router>
  );
}
  
export default App;