import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected({ Component }) {
    const navigate = useNavigate();
    useEffect(() => {
        const login = localStorage.getItem('login');
        if (!login) {
            navigate('/');
        }
    });
    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected
