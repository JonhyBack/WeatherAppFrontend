import './SubmitButton.css'

interface SubmitButtonProps {
    label: string;
    loading?: boolean;
}

function SubmitButton({ label, loading }: SubmitButtonProps) {
    return (
        <button className="submit-button" type="submit" disabled={loading}>{label}</button>
    );
}

export default SubmitButton;