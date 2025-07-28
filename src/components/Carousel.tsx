import React, { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{ width: 400, height: 250, position: "relative" }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`slide-${i}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            pointerEvents: i === index ? "auto" : "none",
          }}
        />
      ))}

      <div style={{ position: "absolute", bottom: 10, right: 10 }}>
        {images.map((_, i) => (
          <button
            key={i}
            style={{
              margin: "0 4px",
              padding: "4px 8px",
              backgroundColor: i === index ? "#333" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => setIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
