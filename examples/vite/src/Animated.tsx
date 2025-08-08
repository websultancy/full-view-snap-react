import { FullViewSnap, FullView, Controller } from "full-view-snap-react";
import cockroach from "./assets/cockroach.json";
import dolphin from "./assets/dolphin.json";
import dragon from "./assets/dragon.json";
import droplet from "./assets/droplet.json";
import Accreditation from "./components/Accreditation";
import LottieAnimationTimeline from "./components/LottieAnimationTimeline";

const lottieAnimations = [dragon, droplet, dolphin, dragon, droplet, dolphin, cockroach];
const frameTitles = [
  "Dragon",
  "Droplet",
  "Dolphin",
  "Dragon Again",
  "Dragon Again",
  "Droplet Again",
  "Cockroach"
];

function Animated() {
  return (
    <FullViewSnap
      render={(
        _currentSlide,
        _totalSlides,
        _scrollPercentage,
        contentScrollPercentage
      ) => (
        <>
        <LottieAnimationTimeline
          contentScrollPercentage={contentScrollPercentage}
          lottieAnimations={lottieAnimations}
        />
        <Controller>
          {lottieAnimations.map((_, idx) => (
            <FullView key={idx}>
              <div className="full-view-wrapper">
                <div className="top-central">
                  {/* Optionally add content per animation here */}
                  <h2>{frameTitles[idx]}</h2>
                </div>
              </div>
            </FullView>
          ))}
        </Controller>
        <Accreditation />
        </>
      )}
    />
  );
}

export default Animated;