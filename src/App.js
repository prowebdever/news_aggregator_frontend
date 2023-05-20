import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import News from './components/News/News';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  const [progress, setProgress] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <LinearProgress color="secondary" determinate value={progress} />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} />} />
        <Route exact path="/register" element={<Register setProgress={setProgress} />} />
        <Route exact path="/login" element={<Login setProgress={setProgress} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
