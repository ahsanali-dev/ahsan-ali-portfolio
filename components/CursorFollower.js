"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Lerp for outer circle (follower)
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) / 10;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) / 10;

      // Lerp for inner dot
      innerPos.current.x += (mousePos.current.x - innerPos.current.x) / 5;
      innerPos.current.y += (mousePos.current.y - innerPos.current.y) / 5;

      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`;
        outerRef.current.style.top = `${outerPos.current.y}px`;
      }

      if (innerRef.current) {
        innerRef.current.style.left = `${innerPos.current.x}px`;
        innerRef.current.style.top = `${innerPos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    const animReq = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animReq);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursorFollower" />
      <div ref={innerRef} className="cursorFollowerDot" />
    </>
  );
}
