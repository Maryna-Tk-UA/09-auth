"use client";

import { createPortal } from "react-dom";
import css from "./OverlayLoader.module.css";
import { useEffect, useState } from "react";

function OverlayLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div data-overlayloader="" />;
  }

  return createPortal(
    <div className={css.backdrop} role="status" aria-live="polite">
      <div className={css.box}>
        <div className={css.spinner} />
        <span className={css.text}>Loading...</span>
      </div>
    </div>,
    document.body
  );
}

export default OverlayLoader;
