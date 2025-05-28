import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/jwtUtils';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const res = await login(formData);
            const token = res.data.token;

            localStorage.setItem('token', token);

            const decoded = decodeToken(token);
            const role = decoded?.role;

            if (!role) {
                alert('Login failed: Role not found in token');
                return;
            }

            localStorage.setItem('role', role);

            if (role === 'USER') navigate('/user/dashboard');
            else if (role === 'STAFF') navigate('/staff/dashboard');
            else if (role === 'ADMIN') navigate('/admin/dashboard');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username && 'is-invalid'}`}
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password && 'is-invalid'}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
