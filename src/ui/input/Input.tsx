import React from 'react'
import './Input.css'


interface InputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    format?: string;
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
}

function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    format,
    required = false,
    pattern,
    minLength,
}: InputProps) {
    return (
        <div className="input-group">
            <label className="input-label">
                {required && <span className="required">*</span>} {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`input-field ${error ? 'input-error' : ''}`}
                placeholder={placeholder}
                required={required}
                pattern={pattern}
                minLength={minLength}
                title={format}
            />
            {error && <p className="input-error-message">{error}</p>}
        </div>
    );
};

export default Input;
