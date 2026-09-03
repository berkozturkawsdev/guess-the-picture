import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";
import "./AuthActions.css";
import { useLanguage } from "../context/LanguageContext";
import { getCopy } from "../data/copy";
import { LogOut } from "lucide-react";
function AuthActions() {
    const { user, loading, signOut } = useAuth();
    const { language } = useLanguage();
    const copy = getCopy(language);

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
        copy.player;

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
                aria-label={copy.logout}
                title={copy.logout}
            >
                <LogOut size={18} strokeWidth={2.2} />
            </button>
        </div>
    );
}

export default AuthActions;