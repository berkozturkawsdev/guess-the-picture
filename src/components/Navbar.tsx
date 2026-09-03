import { useState } from "react";
import type { Copy } from "../data/copy";

import AuthActions from "./AuthActions";
import SettingsModal from "./SettingsModal";
import HelpModal from "./HelpModal";
import ExitModal from "./ExitModal";
import "./Navbar.css";

interface NavbarProps {
    copy: Copy;
    onExitConfirm?: () => void;
}

function Navbar({
    copy,
    onExitConfirm,
}: NavbarProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner">

                    {/* Brand */}
                    <div className="navbar-brand">
                        <img
                            className="navbar-logo"
                            src="/favicon.jpg"
                            alt="Guess the Picture"
                        />
                    </div>


                    {/* Actions */}
                    <div className="navbar-actions">

                        <AuthActions />

                        {/* Help */}
                        <button
                            className="navbar-icon-button"
                            onClick={() => setIsHelpOpen(true)}
                            aria-label="Help"
                            title="Help"
                            type="button"
                        >
                            ?
                        </button>

                        {/* Settings */}
                        <button
                            className="navbar-icon-button"
                            onClick={() => setIsSettingsOpen(true)}
                            aria-label="Settings"
                            title="Settings"
                            type="button"
                        >
                            ⚙
                        </button>

                        {/* Exit */}
                        {onExitConfirm &&
                            (<button className="navbar-exit-button" onClick={() => setIsExitModalOpen(true)} aria-label="Exit game" title="Exit" type="button" > × </button>)}

                    </div>

                </div>
            </nav>


            {/* ================================
                SETTINGS
            ================================= */}

            {isSettingsOpen && (
                <SettingsModal
                    isOpen={isSettingsOpen}
                    copy={copy}
                    onClose={() => setIsSettingsOpen(false)}
                />
            )}


            {/* ================================
                HELP
            ================================= */}

            {isHelpOpen && (
                <HelpModal
                    isOpen={isHelpOpen}
                    copy={copy.help}
                    onClose={() => setIsHelpOpen(false)}
                />
            )}


            {/* ================================
                EXIT
            ================================= */}

            {onExitConfirm && isExitModalOpen && (<ExitModal isOpen={isExitModalOpen} copy={copy.exitModal} onClose={() => setIsExitModalOpen(false)} onConfirm={() => { setIsExitModalOpen(false); onExitConfirm(); }} />)}
        </>
    );
}

export default Navbar;