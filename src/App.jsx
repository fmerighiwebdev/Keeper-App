import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/login/*" element={<Login />}/>
          <Route path="/signup/*" element={<Signup />}/>
          <Route path="/*" element={
            <>
              <Home />
              <Footer />
            </>
            }
          />
          <Route path="/dashboard/*" element={<Dashboard />}/>
          <Route path="/dashboard/work/*" element={<Dashboard type="work" />}/>
        </Routes>
    </Router>
  );

}

export default App;