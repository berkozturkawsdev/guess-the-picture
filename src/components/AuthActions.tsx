import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";
import "./AuthActions.css";

function AuthActions() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return (
            <div className="auth-actions">
                <GoogleLoginButton />
            </div>
        );
    }

    const displayName =
        user.user_metadata.full_name ||
        user.user_metadata.name ||
        "Player";

    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="auth-actions">
            <div className="player-badge">
                <div className="player-avatar">
                    {initial}
                </div>

                <span className="player-name">
                    {displayName}
                </span>
            </div>

            <button
                className="logout-button"
                onClick={signOut}
                type="button"
                aria-label="Logout"
                title="Logout"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            </button>
        </div>
    );
}

export default AuthActions;