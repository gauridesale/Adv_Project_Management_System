import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Register from './component/Register';
import Login from './component/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login/:role" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
