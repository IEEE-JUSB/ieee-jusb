import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MLAS4_IMG = "/events/mlas4.webp";

export default function MLAS4Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("mlas4_popup_seen");
    if (!seen) {
      // Small delay so the page renders first
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (dontShow) {
      sessionStorage.setItem("mlas4_popup_seen", "true");
    }
    setIsOpen(false);
    // Always mark as seen for the session on close
    sessionStorage.setItem("mlas4_popup_seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mlas4-popup-overlay"
          className="mlas4-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            className="mlas4-modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mlas4-popup-title"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="mlas4-close-btn"
              aria-label="Close MLAS 4.0 popup"
            >
              ✕
            </button>

            {/* Graphic header zone */}
            <div className="mlas4-graphic-zone">
              {!imgError ? (
                <img
                  src={MLAS4_IMG}
                  alt="MLAS 4.0 Event Graphic"
                  className="mlas4-graphic-img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="mlas4-graphic-placeholder">
                  <div className="mlas4-placeholder-inner">
                    <span className="mlas4-placeholder-label">MACHINE LEARNING ACCELERATOR SUMMIT</span>
                    <span className="mlas4-placeholder-version">4.0</span>
                    <span className="mlas4-placeholder-hint">
                      📂 Add graphic: <code>src/assets/events/mlas4.webp</code>
                    </span>
                  </div>
                </div>
              )}

              {/* Upcoming badge overlay on graphic */}
              <div className="mlas4-upcoming-badge">
                UPCOMING EVENT
              </div>
            </div>

            {/* Content body */}
            <div className="mlas4-body">
              <div className="mlas4-body-top">
                <h2 id="mlas4-popup-title" className="mlas4-title">
                  MLAS 4.0
                </h2>
                <p className="mlas4-subtitle">Machine Learning Accelerator Summit</p>

                <div className="mlas4-date-chip">
                  Dates: 12–13th September, 2026
                </div>

                <p className="mlas4-description">
                  MLAS is back! Join us for an immersive 2-day dive into ML fundamentals, guided by experts and packed with hands-on workshops, exclusive goodies, and networking opportunities. Whether you&apos;re just getting curious about Machine Learning or looking to go deeper, MLAS 4.0 is your starting point. Registration details dropping soon — keep your eyes peeled!
                </p>
              </div>

              <div className="mlas4-footer">
                <a
                  href="https://mlas.ieee-jaduniv.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mlas4-cta-btn"
                  onClick={handleClose}
                >
                  Visit Website →
                </a>

                <label className="mlas4-dont-show">
                  <input
                    type="checkbox"
                    checked={dontShow}
                    onChange={(e) => setDontShow(e.target.checked)}
                  />
                  <span>Don&apos;t show again this session</span>
                </label>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
