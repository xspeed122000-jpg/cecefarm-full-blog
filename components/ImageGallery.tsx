// components/ImageGallery.tsx
'use client';
import React from 'react';

interface ImageGalleryProps {
  images: string[]; // 画像URLの配列
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="gallery-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* PCは3列 */
          gap: 15px;
          margin: 30px 0;
          width: 100%;
        }
        .gallery-item {
          width: 100%;
          aspect-ratio: 3 / 4; /* 縦長で統一。横長写真も自動で綺麗に収まります */
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: 1fr; /* スマホは1列（縦並び） */
            gap: 20px;
          }
          .gallery-item {
            aspect-ratio: auto; /* スマホでは元の写真の比率を活かす */
          }
        }
      `}} />
      
      {images.map((src, index) => (
        <img 
          key={index} 
          src={src} 
          alt={`Plant gallery ${index + 1}`} 
          className="gallery-item" 
        />
      ))}
    </div>
  );
}