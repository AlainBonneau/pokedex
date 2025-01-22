import { FC, useState, useEffect } from "react";

interface SasOverlayProps {
  onUnlock: () => void;
}

// Durée de validité du débloquage en millisecondes (1 heure = 3600000 ms)
const UNLOCK_DURATION = 3600000;

const SasOverlay: FC<SasOverlayProps> = ({ onUnlock }) => {
  const [animating, setAnimating] = useState<boolean>(false);
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [initiallyUnlocked, setInitiallyUnlocked] = useState<boolean>(false);

  useEffect(() => {
    // Vérifie si une date de déblocage a été stockée
    const storedUnlockTime = localStorage.getItem("unlockTime");

    if (storedUnlockTime) {
      const unlockTime = parseInt(storedUnlockTime, 10);
      const now = Date.now();
      // Si le temps écoulé depuis le déblocage est inférieur à UNLOCK_DURATION, l'accès reste débloqué
      if (now - unlockTime < UNLOCK_DURATION) {
        setInitiallyUnlocked(true);
        onUnlock();
      } else {
        // Si une heure est écoulée, on supprime la clé
        localStorage.removeItem("unlockTime");
      }
    }
  }, [onUnlock]);

  // Si déjà débloqué, on ne retourne rien (l'overlay ne s'affiche pas)
  if (initiallyUnlocked) {
    return null;
  }

  // Fonction appelée lors du clic sur le bouton
  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      setUnlocked(true);
      const unlockTime = Date.now();
      localStorage.setItem("unlockTime", unlockTime.toString());
      onUnlock();
    }, 1000);
  };

  return (
    <div
      className={`
        fixed inset-0 ${
          unlocked ? "z-0" : "z-50"
        } flex items-center justify-center
        bg-black bg-opacity-80
        transition-opacity duration-700
        ${animating ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      <div className="relative">
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-48 h-48 bg-red-600 rounded-full
            transition-transform duration-700
            ${animating ? "scale-[25]" : "scale-100"}
          `}
        />
        <button
          onClick={handleClick}
          className="relative bg-white text-black px-6 py-2 font-semibold shadow rounded-full"
        >
          Ouvrir
        </button>
      </div>
    </div>
  );
};

export default SasOverlay;
