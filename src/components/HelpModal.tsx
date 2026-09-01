interface HelpModalProps {
    isOpen: boolean;
    copy: {
        title: string;
        body: string;
        list: string[];
        aboutTitle: string;
        aboutBody: string;
    };
    onClose: () => void;
}

function HelpModal({
    isOpen,
    copy,
    onClose,
}: HelpModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="help-modal-overlay"
            onClick={onClose}
        >
            <div
                className="help-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="help-modal-close"
                    onClick={onClose}
                    type="button"
                    aria-label="Close"
                >
                    ×
                </button>

                <h2>{copy.title}</h2>

                <p>{copy.body}</p>

                <ul>
                    {copy.list.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <div className="help-about">
                    <h3>{copy.aboutTitle}</h3>

                    <p>{copy.aboutBody}</p>

                    <div className="help-links">
                        <a
                            href="https://github.com/berkozturkawsdev"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/berk-ozturk-56a764a8/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>

                        <a
                            href="https://berkozturk.bozapps.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Personal Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpModal;