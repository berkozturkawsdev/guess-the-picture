import ReactCountryFlag from "react-country-flag";
import type { Language } from "../utils/getLanguage";

interface SettingsCopy {
    settingsTitle: string;
    languageLabel: string;
    english: string;
    turkish: string;
}

interface SettingsModalProps {
    isOpen: boolean;
    language: Language;
    copy: SettingsCopy;
    onClose: () => void;
    onLanguageChange: (language: Language) => void;
}

function SettingsModal({
    isOpen,
    language,
    copy,
    onClose,
    onLanguageChange,
}: SettingsModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="settings-modal-overlay"
            onClick={onClose}
        >
            <div
                className="settings-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="settings-modal-close"
                    onClick={onClose}
                    type="button"
                    aria-label="Close settings"
                >
                    ×
                </button>

                <h2>{copy.settingsTitle}</h2>

                <p className="settings-label">
                    {copy.languageLabel}
                </p>

                <div className="settings-options">
                    <button
                        className={`settings-option ${language === "en" ? "active" : ""
                            }`}
                        type="button"
                        onClick={() => {
                            onLanguageChange("en");
                            onClose();
                        }}
                    >
                        <span className="settings-flag">
                            <ReactCountryFlag
                                countryCode="US"
                                svg
                            />
                        </span>

                        {copy.english}
                    </button>

                    <button
                        className={`settings-option ${language === "tr" ? "active" : ""
                            }`}
                        type="button"
                        onClick={() => {
                            onLanguageChange("tr");
                            onClose();
                        }}
                    >
                        <span className="settings-flag">
                            <ReactCountryFlag
                                countryCode="TR"
                                svg
                            />
                        </span>

                        {copy.turkish}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;