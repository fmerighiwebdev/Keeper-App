import './styles/Reset.css';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/login/*" element={
            <>
              <Header />
              <Login />
            </>
          }
          />
          <Route path="/signup/*" element={
            <>
              <Header />
              <Signup />
            </>
          }
          />
          <Route path="/*" element={
            <>
              <Header type="home" />
              <Home />
              <Footer />
            </>
            }
          />
          <Route path="/dashboard/*" element={
            <>
              <Header />
              <Dashboard />
            </>
          }
          />
        </Routes>
    </Router>
  );

}

export default App;
