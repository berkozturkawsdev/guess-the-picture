import "./SetCompletedModal.css";

interface SetCompletedModalProps {
    copy: {
        title: string;
        message: string;
        button: string;
    };
    onBackToPuzzleSets: () => void;
}

const SetCompletedModal = ({
    copy,
    onBackToPuzzleSets,
}: SetCompletedModalProps) => {
    return (
        <div className="set-completed-overlay">
            <div className="set-completed-modal">

                <div className="set-completed-icon">
                    🎉
                </div>

                <h2>
                    {copy.title}
                </h2>

                <p>
                    {copy.message}
                </p>

                <button
                    className="set-completed-button"
                    onClick={onBackToPuzzleSets}
                >
                    {copy.button}
                </button>

            </div>
        </div>
    );
};

export default SetCompletedModal;