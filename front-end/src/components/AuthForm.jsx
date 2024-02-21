import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';

function AuthForm(props) {
    const navigate = useNavigate();
    const baseURL = 'https://2d9b-82-59-212-3.ngrok-free.app';
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    
    // Funzione che gestisce l'invio del form
    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
          let response;
    
          if (props.type === 'login') {

            response = await axios.post(`${baseURL}/api/login`, formData);

            localStorage.setItem('token', response.data.token);

            navigate('/dashboard');
          } else if (props.type === 'signup') {

            response = await axios.post(`${baseURL}/api/signup`, formData);
            
            navigate('/login');
          }

          console.log(response.data);
        } catch (error) {
          if (error.response.data.error) {
            setError(error.response.data.error);
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
    function handleChanges(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    // Renderizza il form
    return (
        <>
          {error && (
            <Alert onClose={() => setError('')} severity="error" className='mb-4 bounce-in fast error-alert'>{error}</Alert>
          )}
          <div className="d-flex justify-content-center">
            <h1 className='form-title'>
              {props.type === 'signup' ? 'Registrati' : 'Accedi'}
            </h1>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChanges} />
            </div>
            {props.type === 'signup' && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control" type="text" name="username" value={formData.username} onChange={handleChanges} />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChanges} />
            </div>
            {props.type === 'signup' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChanges} />
              </div>
            )}
            <button className="auth-button" type="submit">
            {props.type === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          </form>
        </>
    );
}

export default AuthForm;