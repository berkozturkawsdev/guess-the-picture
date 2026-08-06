
interface WinModalProps {
  isOpen: boolean;
  onNext: () => void;
  language: "en" | "tr";
}

const WinModal = ({ isOpen, onNext, language }: WinModalProps) => {
  if (!isOpen) return null;

  const copy = language === "tr"
    ? {
      title: "Doğru!",
      message: "Bulmacayı çözdünüz.",
      nextButton: "Sonraki Bulmaca →",
    }
    : {
      title: "Correct!",
      message: "You solved the puzzle.",
      nextButton: "Next Puzzle →",
    };

  return (
    <div className="win-modal-overlay">
      <div className="win-modal">
        <div className="trophy">🎉</div>

        <h2>{copy.title}</h2>

        <p>{copy.message}</p>

        <button
          className="next-button"
          onClick={onNext}
        >
          {copy.nextButton}
        </button>
      </div>
    </div>
  );
};

export default WinModal;