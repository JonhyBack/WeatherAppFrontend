import './ModalDialog.css';

interface ModalDialogProps {
    title?: string;
    handleClose: () => void;
    children: React.ReactNode;
}

function ModalDialog({ title, handleClose, children }: ModalDialogProps) {
    return (
        <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={handleClose}>
                    &times;
                </button>
                {title && <h2 className="modal-title">{title}</h2>}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default ModalDialog;