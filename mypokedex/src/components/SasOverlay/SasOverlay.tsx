import { FC, useState } from "react";

interface SasOverlayProps {
  handleUnlock: () => void;
  onUnlock: () => void;
}

const SasOverlay: FC<SasOverlayProps> = ({ onUnlock }) => {
  const [animating, setAnimating] = useState<boolean>(false);
  const [unlocked, setUnlocked] = useState<boolean>(false);

  // Quand on clique sur "Ouvrir" :
  // 1) on déclenche l'animation (fondu + scale)
  // 2) on attend la fin (1s ici) pour appeler onUnlock (qui enlève le composant)
  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      setUnlocked(true);
      onUnlock();
    }, 1000); // durée en ms, cohérente avec la durée de l'animation
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
        {/* Le cercle rouge en absolute derrière le bouton */}
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-48 h-48 bg-red-600 rounded-full
            transition-transform duration-700
            ${animating ? "scale-[25]" : "scale-100"}
          `}
        />
        {/* Le bouton "Ouvrir" */}
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
