import React, { useRef, useState, useEffect } from "react";
import BeforeImage from "../../assets/naval-snap.png";
import AfterImage from "../../assets/naval-download.png"; 

const BeforeAfterSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(50); // percent
  const [dragging, setDragging] = useState<boolean>(false);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPosition(percent);
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => onDrag(e);
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move as any);
      window.removeEventListener("touchend", up);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden select-none bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{ touchAction: "none" }}
    >
      {/* AFTER layer (always full size). Replace bg with an image if you have one */}
      <div style={{borderRadius:'15px'}}>
        <img src={AfterImage} alt="After" style={{borderRadius:'15px'}} className="absolute inset-0 w-[90%] h-[80%] self-center mx-auto object-cover pointer-events-none"/>
      </div>
      {/* <div className="absolute inset-0 bg-yellow-800" /> */}

      {/* BEFORE layer clipped by position. Image remains full size; only its visible area changes */}
      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* Optional red backdrop to visualize the before area while testing */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400" />
        <img
          src={BeforeImage}
          alt="Before"
          className="absolute inset-0 w-[95%] h-[95%] self-center mx-auto object-contain pointer-events-none"
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 h-full w-0.5 bg-white z-10"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-20"
        style={{ left: `calc(${position}% - 20px)`, transform: "translateY(-50%)" }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow border-2 border-gray-300 cursor-ew-resize">
          <span className="text-xl">↔️</span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
