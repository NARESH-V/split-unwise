import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GroupExpense from './pages/groupExpense';
import Groups from './pages/groups';
import Activity from './pages/activity';
import NavBar from './components/navBar';
import MenuBar from './components/menuBar';
import CreateGroup from './pages/createGroup';



function App() {
  return (
    <div className="App">
      <Router>
        <MenuBar/>
        <div className="displayContainer">
          <Routes >
            <Route exact path="/" element={<Groups/>} />
            <Route path="/groupExpense" element={<GroupExpense/>} />
            <Route path="/activity" element={<Activity/>} />
            <Route path="/createGroup" element={<CreateGroup/>} />
          </Routes>
        </div>
        <NavBar/>
      </Router>
    </div>
  );
}

export default App;
