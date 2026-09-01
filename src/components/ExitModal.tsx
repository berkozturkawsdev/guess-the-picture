interface ExitModalProps {
    isOpen: boolean;
    copy: {
        title: string;
        message: string;
        cancel: string;
        confirm: string;
    };
    onClose: () => void;
    onConfirm: () => void;
}

function ExitModal({
    isOpen,
    copy,
    onClose,
    onConfirm,
}: ExitModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="exit-modal-overlay"
            onClick={onClose}
        >
            <div
                className="exit-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <h2>{copy.title}</h2>

                <p>{copy.message}</p>

                <div className="exit-modal-actions">
                    <button
                        className="exit-cancel-button"
                        type="button"
                        onClick={onClose}
                    >
                        {copy.cancel}
                    </button>

                    <button
                        className="exit-confirm-button"
                        type="button"
                        onClick={onConfirm}
                    >
                        {copy.confirm}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExitModal;