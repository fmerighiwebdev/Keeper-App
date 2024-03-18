import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route exact path="/" element={
            <>
              <Home />
              <Footer />
            </>
            }
          />
          <Route path="/dashboard" element={<Dashboard category="principale" />}/>
          <Route path="/dashboard/work" element={<Dashboard category="lavoro" />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    </Router>
  );
}

export default App;