import { useState } from "react";
import type { ImageReference } from "../types/patrimonio";

const FALLBACK_IMAGE = "/not_found.png";

interface RecordImagePreviewProps {
  name: string;
  images?: ImageReference[];
}

export default function RecordImagePreview({ name, images = [] }: RecordImagePreviewProps) {
  const firstImage = images.find((image) => image.url.trim())?.url.trim();
  const [src, setSrc] = useState(firstImage || FALLBACK_IMAGE);
  const [isFallback, setIsFallback] = useState(!firstImage);

  function handleImageError(): void {
    if (isFallback) return;
    setSrc(FALLBACK_IMAGE);
    setIsFallback(true);
  }

  return (
    <div className={isFallback ? "record-image-wrap record-image-fallback" : "record-image-wrap"}>
      <img
        className="record-image"
        src={src}
        alt={isFallback ? "Imagen no disponible para " + name : "Imagen de " + name}
        loading="lazy"
        decoding="async"
        onError={handleImageError}
      />
      {isFallback && <span className="record-image-label">Imagen de referencia no disponible</span>}
    </div>
  );
}
