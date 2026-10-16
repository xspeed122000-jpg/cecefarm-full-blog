
"use client";

import { useEffect, useRef, useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + images.length) % images.length
        );
      }

      if (event.key === "Tab") {
        const controls = document.querySelectorAll<HTMLButtonElement>(
          ".gallery-lightbox button"
        );
        const first = controls[0];
        const last = controls[controls.length - 1];

        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <div className="gallery-container">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            className="gallery-button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`画像 ${index + 1} を拡大`}
          >
            <img
              src={src}
              alt={`Plant gallery ${index + 1}`}
              className="gallery-item"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="画像ギャラリー"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;

            const diff =
              e.changedTouches[0].clientX - touchStartX.current;

            if (Math.abs(diff) > 50) {
              if (diff < 0) nextImage();
              else prevImage();
            }

            touchStartX.current = null;
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="gallery-close"
            aria-label="閉じる"
            onClick={() => setSelectedIndex(null)}
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="gallery-arrow gallery-prev"
              aria-label="前の画像"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              ‹
            </button>
          )}

          <img
            src={images[selectedIndex]}
            alt={`Plant gallery ${selectedIndex + 1}`}
            className="gallery-expanded-image"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              className="gallery-arrow gallery-next"
              aria-label="次の画像"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              ›
            </button>
          )}

          <div className="gallery-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 30px 0;
          width: 100%;
        }

        .gallery-button {
          padding: 0;
          border: none;
          background: transparent;
          cursor: zoom-in;
          border-radius: 12px;
          overflow: hidden;
        }

        .gallery-item {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
        }

        .gallery-expanded-image {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
        }

        .gallery-close {
          position: absolute;
          top: 15px;
          right: 20px;
          color: white;
          background: transparent;
          border: none;
          font-size: 38px;
          cursor: pointer;
          z-index: 2;
        }

        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          font-size: 32px;
          cursor: pointer;
          z-index: 2;
        }

        .gallery-prev {
          left: 15px;
        }

        .gallery-next {
          right: 15px;
        }

        .gallery-counter {
          position: absolute;
          bottom: 20px;
          color: white;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .gallery-item {
            aspect-ratio: auto;
          }

          .gallery-expanded-image {
            max-width: 100vw;
            max-height: 80vh;
          }

          .gallery-arrow {
            width: 36px;
            height: 36px;
            font-size: 26px;
          }
        }
      `}</style>
    </>
  );
}
