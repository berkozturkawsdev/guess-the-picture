
interface WinModalProps {
  isOpen: boolean;
  onNext: () => void;
}

const WinModal = ({ isOpen, onNext }: WinModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="win-modal-overlay">
      <div className="win-modal">
        <div className="trophy">🎉</div>

        <h2>Correct!</h2>

        <p>You solved the puzzle.</p>

        <button
          className="next-button"
          onClick={onNext}
        >
          Next Puzzle →
        </button>
      </div>
    </div>
  );
};

export default WinModal;