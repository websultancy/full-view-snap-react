import React, { useRef, useEffect, createRef, useCallback } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import gsap from "gsap";

type LottieAnimationTimelineProps = {
  contentScrollPercentage: number;
  lottieAnimations: unknown[]; // Accept as prop
};

const LottieAnimationTimeline: React.FC<LottieAnimationTimelineProps> = ({
  contentScrollPercentage,
  lottieAnimations,
}) => {
  const lottieRefs = useRef(
    Array.from({ length: lottieAnimations.length }, () => createRef<LottieRefCurrentProps>())
  );

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  //Tween duration
  const tweenDuration = 2;

  // Use useGSAP hook for timeline setup
  useEffect(() => {
    const count = lottieAnimations.length;
    if (count === 0) return;

    if (lottieRefs.current.some(ref => !ref.current)) {
      return;
    }

    if(timelineRef.current !== null) {
      return; // Timeline already exists, no need to recreate
    }
    
    timelineRef.current = gsap.timeline({ paused: true });

    lottieAnimations.forEach((_animationData, idx) => {
      const lottieRef = lottieRefs.current[idx];
      if (!lottieRef.current) return;
      const duration = lottieRef.current.getDuration(true);

      if (duration === undefined || !timelineRef.current) return;

      // Determine if first or last
      const startFrame = 0;
      const endFrame = duration;
      timelineRef.current.add(
        gsap.fromTo(
          { frame: startFrame },
          { frame: startFrame },
          {
            frame: endFrame,
            duration: tweenDuration,
            ease: "none",
            onUpdate() {
              lottieRef.current?.goToAndStop(this.targets()[0].frame, true);
            }
          }
        )
      );
    });
    timelineRef.current.eventCallback("onUpdate", onTimelineUpdate);
    // Optionally return cleanup function
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [lottieRefs, lottieAnimations]);
  
  function getTweeningIndexByTime() {
    if (!timelineRef.current) return null;
    const time = timelineRef.current.time();
    const children = timelineRef.current.getChildren(false, true, false);
    for (let i = 0; i < children.length; i++) {
      const tween = children[i];
      if (time >= tween.startTime() && time < tween.endTime()) {
        return i;
      }
    }
    return null;
  }

  //Define a callback for when the timeline updates
  const onTimelineUpdate = useCallback(() => {
    if (!timelineRef.current) return;
    const tweeningIndex = getTweeningIndexByTime();
    lottieRefs.current.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.animationContainerRef.current.style.display = idx === tweeningIndex ? "block" : "none";
      }
    });
  }, []);

  //Create a ref in each of the lottieRef based on the number of animations
  useEffect(() => {

    //Seek the timeline based on contentScrollPercentage
    if (timelineRef.current) {

      // Get duration of last tween
      const totalDuration = timelineRef.current.duration();
      const seekTime = tweenDuration/2 + ((totalDuration - tweenDuration) * contentScrollPercentage);
      timelineRef.current.tweenTo(seekTime, {
        ease: "none",
        duration: 0.5,
      });

    }
    
  }, [contentScrollPercentage]);

  return (
    <div className="full-view-animation">
      <div style={{position: "relative", width: "200px", height: "200px"}}>
        {lottieAnimations.map((animationData, idx) => (
          <Lottie
            key={idx}
            lottieRef={lottieRefs.current[idx]}
            animationData={animationData}
            loop={false}
            autoplay={false}
            style={{ width: 200, height: 200, position: "absolute", top: 0, left: 0 }}
          />
        ))}
      </div>
    </div>
  );
};

export default LottieAnimationTimeline;
