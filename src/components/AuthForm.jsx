import React, { useState } from 'react';
import axios from 'axios';

import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';

function AuthForm(props) {
    // Stato che contiene i dati del form
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    
    // Funzione che gestisce l'invio del form
    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
          let response;
    
          // Invia una richiesta POST al server contenente i dati del form
          if (props.type === 'login') {
            response = await axios.post('http://localhost:5000/api/login', formData);
          } else if (props.type === 'signup') {
            response = await axios.post('http://localhost:5000/api/signup', formData);
          }

          console.log(response.data);
        } catch (error) {
          console.log(error.response.data);
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