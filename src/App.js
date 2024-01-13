import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GroupExpense from './pages/groupExpense.tsx';
import Groups from './pages/groups.tsx';
import Activity from './pages/activity.tsx';
import NavBar from './components/navBar.tsx';
import MenuBar from './components/menuBar.tsx';

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
          </Routes>
        </div>
        <NavBar/>
      </Router>
    </div>
  );
}

export default App;
