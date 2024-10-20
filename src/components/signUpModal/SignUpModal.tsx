import React, { useState } from 'react'
import ModalDialog from '../../ui/modalDialog/ModalDialog'
import Input from '../../ui/input/Input';
import './SignUpModal.css'
import SubmitButton from '../../ui/submitButton/SubmitButton';
import AuthService from '../../services/AuthService';
import { useLoading } from '../../contexts/LoadingContext';

interface SignUpModalProps {
    onClose: () => void;
}

function SignUpModal({ onClose }: SignUpModalProps) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const [signUpError, setSignUpError] = useState<string>('');
    const { isLoading, setLoading } = useLoading();

    const passwordRegex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}/
    const passwordFormatText = 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.'

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!passwordRegex.test(password)) {
            setPasswordError(passwordFormatText)
            return;
        }

        if (password !== repeatPassword) {
            setPasswordsMatch(false)
            return;
        }

        setPasswordError('');
        setSignUpError('');
        setLoading(true);

        try {
            await AuthService.signup({ username, password });

            console.log('Sign Up successful!');
            onClose();
        } catch (error: any) {
            setSignUpError(error.message);
            console.error('Sign Up failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalDialog handleClose={onClose} title="Sign up">
            <form className="signup-form" onSubmit={handleSubmit}>
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

                <Input type="password"
                    label='Repeat password:'
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    minLength={6}
                    pattern={passwordRegex.source}
                    error={passwordError}
                    format={passwordFormatText}
                    required />
                {signUpError && <p className="error-message">{signUpError}</p>}
                {!passwordsMatch && <p className="error-message">Passwords must match</p>}
                <SubmitButton label='Sign Up' loading={isLoading} />
            </form>
        </ModalDialog>
    );
};

export default SignUpModal;
