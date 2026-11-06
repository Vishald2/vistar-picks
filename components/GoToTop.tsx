
"use client";

import { useEffect, useState } from "react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="go-to-top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "auto",
        })
      }
      aria-label="Go to top"
      title="Go to top"
    >
      ↑
    </button>
  );
}
