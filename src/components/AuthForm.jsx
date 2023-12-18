import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import Alert from '@mui/material/Alert';

function AuthForm(props) {
    const navigate = useNavigate();
    // Stato che contiene i dati del form
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [show, setShow] = useState(true);

    function handleCloseClick() {
      setShow(false);
    }
    
    // Funzione che gestisce l'invio del form
    async function handleSubmit(event) {
        event.preventDefault();
        setTimeout(() => {
          setShow(true);
        }, 1000);
    
        try {
          let response;
    
          if (props.type === 'login') {
            response = await axios.post('http://localhost:5000/api/login', formData);

            sessionStorage.setItem('token', response.data.token);

            navigate('/dashboard');
          } else if (props.type === 'signup') {
            response = await axios.post('http://localhost:5000/api/signup', formData);
          }

          console.log(response.data);
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data.error) {
            setError(error.response.data.error);
          } else {
            setError(error.response.data.message);
          }
        }

        // Resetta il form dopo l'invio
        setFormData({
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
    };
    
    // Funzione che gestisce i cambiamenti dei campi del form
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    // Renderizza il form
    return (
        <>
          {error && show && (
            <Alert onClose={() => {handleCloseClick()}} severity="error" className='mb-4'>{error}</Alert>
          )}
          <div className="d-flex justify-content-center">
            <h1 className='icon-yellow'>
              {props.type === 'login' ? 'Log In' : 'Sign Up'}{' '}
              <TipsAndUpdatesTwoToneIcon className='icon-yellow' style={{ fontSize: '3.5rem' }}/>
            </h1>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            {props.type === 'signup' && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control" type="text" name="username" value={formData.username} onChange={handleChange} />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            {props.type === 'signup' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            )}
            <button className="auth-button" type="submit">
              {props.type === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </>
    );
}

export default AuthForm;