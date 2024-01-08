import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GroupExpense from './pages/groupExpense';
import Groups from './pages/groups';
import Activity from './pages/activity';
import NavBar from './components/navBar';



function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <div className="displayContainer">
          <Routes >
            <Route exact path="/" element={<Groups/>} />
            <Route path="/groupExpense" element={<GroupExpense/>} />
            <Route path="/activity" element={<Activity/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
