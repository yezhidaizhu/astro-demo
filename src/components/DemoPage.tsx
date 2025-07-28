import React, { useState } from "react";
import Carousel from "./Carousel";

export default function DemoPage1() {
  const images = [
    "https://picsum.photos/id/1015/400/250",
    "https://picsum.photos/id/1016/400/250",
    "https://picsum.photos/id/1018/400/250",
  ];

  const handleCTA = () => {
    // 这里跳转到你想去的页面
    window.location.href = "/about";
  };

  const [count, setCount] = useState(1);
  const onAdd = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1 className=" text-red-400 ">Welcome to the Demo Page</h1>
      <Carousel images={images} />

      <button
        onClick={handleCTA}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          fontSize: 16,
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Call To Action
      </button>

      {count}
      <button onClick={onAdd}>add</button>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
    </div>
  );
}
