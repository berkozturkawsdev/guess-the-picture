import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getCopy } from "../data/copy";
import "./GoogleLoginButton.css";
import { CircleUserRound, LogIn, Sparkles } from "lucide-react";

export default function GoogleLoginButton() {
    const [isOpen, setIsOpen] = useState(false);

    const { signInWithGoogle } = useAuth();
    const { language } = useLanguage();

    const copy = getCopy(language);

    return (
        <>
            <button
                type="button"
                className="game-login-button"
                onClick={() => setIsOpen(true)}
            >
                <LogIn size={18} strokeWidth={2.2} />
                <span>{copy.login}</span>
            </button>

            {isOpen && (
                <div
                    className="login-modal-overlay"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="login-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="login-modal-close"
                            onClick={() => setIsOpen(false)}
                            aria-label={copy.close}
                            title={copy.close}
                        >
                            ×
                        </button>

                        <div className="login-modal-icon">
                            <div className="login-modal-icon-glow" />

                            <div className="login-modal-icon-inner">
                                <LogIn size={30} strokeWidth={2.2} />
                            </div>

                            <Sparkles
                                className="login-modal-sparkle"
                                size={15}
                                strokeWidth={2}
                            />
                        </div>
                        <div className="login-modal-heading">
                            <span className="login-modal-eyebrow">
                                {copy.loginModal.title}
                            </span>

                            <h2>
                                {copy.loginModal.heading}
                            </h2>

                            <p>
                                {copy.loginModal.message}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="google-login-button"
                            onClick={signInWithGoogle}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M21.35 12.27c0-.72-.06-1.41-.18-2.07H12v3.92h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.84-1.69 2.91-4.18 2.91-7.24z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.15-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.75z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M6.54 13.84A5.85 5.85 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.37l3.25-2.53z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.24 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.71 5.38l3.25 2.53C7.31 7.85 9.46 6.13 12 6.13z"
                                />
                            </svg>

                            {copy.loginModal.googleButton}
                        </button>

                        <span className="login-modal-footer">
                            {copy.loginModal.footer}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
