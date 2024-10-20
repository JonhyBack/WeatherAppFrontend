import React, { useState } from 'react'
import Input from '../../ui/input/Input';
import SubmitButton from '../../ui/submitButton/SubmitButton';
import { useLoading } from '../../contexts/LoadingContext';
import './LoginPage.css'
import Card from '../../ui/card/Card';
import AuthLayout from '../../layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');
    const { isLoading, setLoading } = useLoading();
    const navigate = useNavigate();
    const { login } = useAuth();

    const passwordRegex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}/
    const passwordFormatText = 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.'

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!passwordRegex.test(password)) {
            setPasswordError(
                passwordFormatText)
            return;
        }

        setPasswordError('');
        setLoginError('');
        setLoading(true);

        try {
            await login({ username, password });
            console.log('Login successful!');

            navigate('/');
        } catch (error: any) {
            setLoginError(error.message);
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Card>
                <h2 style={{ marginBottom: '1rem' }}>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <Input type="text"
                        label='Username:'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    <Input type="password"
                        label='Password:'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        pattern={passwordRegex.source}
                        error={passwordError}
                        format={passwordFormatText}
                        required />
                    {loginError && <p className="error-message">{loginError}</p>}
                    <SubmitButton label='Login' loading={isLoading} />
                </form>
            </Card>
        </AuthLayout>
    );
};

export default LoginPage;
