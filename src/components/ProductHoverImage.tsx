import { useEffect, useState } from "react";

import { getProductImages } from "../lib/productMedia";
import type { Product } from "../types/shop";

interface ProductHoverImageProps {
  product: Product;
  className?: string;
}

export default function ProductHoverImage({
  product,
  className = "w-full h-full object-contain transition-transform duration-700",
}: ProductHoverImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const images = getProductImages(product);
  const currentImage = images[imageIndex] ?? images[0];

  useEffect(() => {
    if (!isHovering || images.length < 2) {
      setImageIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 900);

    return () => window.clearInterval(timer);
  }, [images.length, isHovering]);

  return (
    <img
      src={currentImage}
      alt={product.name}
      className={className}
      referrerPolicy="no-referrer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    />
  );
}
