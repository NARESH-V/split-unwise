import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GroupExpense from './pages/groupExpense.tsx';
import Groups from './pages/groups.tsx';
import Activity from './pages/activity.tsx';
import NavBar from './components/navBar.tsx';
import MenuBar from './components/menuBar.tsx';
import Profile from './pages/profile.tsx';
import Login from './pages/login.tsx';
import { useSelector } from 'react-redux';

function App() {

  const currentUser = useSelector((state) => state.user.currentUser);
  
  return (
    <div className="App">
      <Router>
        {currentUser ? (
          <>
            <MenuBar/>
            <div className="displayContainer">
              <Routes >
                <Route exact path="/" element={<Groups/>} />
                <Route path="/groupExpense" element={<GroupExpense/>} />
                <Route path="/activity" element={<Activity/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
            </div>
            <NavBar/>
          </>
        ) : (
          <Login/>
        )}
      </Router>
    </div>
  );
}

export default App;
