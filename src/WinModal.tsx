
interface WinModalProps {
  isOpen: boolean;
  onNext: () => void;
  language: "en" | "tr";
  stars: number;
}

const WinModal = ({ isOpen, onNext, language, stars }: WinModalProps) => {
  if (!isOpen) return null;

  const copy = language === "tr"
    ? {
      title: "Doğru!",
      message: "Bulmacayı çözdünüz.",
      nextButton: "Sonraki Bulmaca →",
      scoreHint: "Bu turdaki yıldız puanınız",
    }
    : {
      title: "Correct!",
      message: "You solved the puzzle.",
      nextButton: "Next Puzzle →",
      scoreHint: "Your stars for this round",
    };

  const filledStars = Array.from({ length: 5 }, (_, index) => index < stars);

  return (
    <div className="win-modal-overlay">
      <div className="win-modal">
        <div className="trophy">🎉</div>

        <h2>{copy.title}</h2>

        <p>{copy.message}</p>

        <div className="score-display" aria-label={`${copy.scoreHint}`}>
          <div className="stars" role="img" aria-label={`${copy.scoreHint}`}>
            {filledStars.map((filled, index) => (
              <span key={`${filled}-${index}`} className={filled ? "star filled" : "star"}>★</span>
            ))}
          </div>
        </div>

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