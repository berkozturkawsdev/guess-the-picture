const playWinSound = () => {
  if (typeof Audio === 'undefined') return;

  const audio = new Audio('/sound/win.mp3');
  audio.volume = 0.7;
  void audio.play().catch(() => {
    // Ignore autoplay restrictions in browsers.
  });
};

export default playWinSound;
