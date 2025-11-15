import React, { useState } from 'react';
import api from '../services/api';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { userName, password });
            localStorage.setItem('token', response.data);
            alert('Login successful!');
        } catch (error) {
            alert('Login failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
