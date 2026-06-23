'use client';

import Image from 'next/image';
import { useState } from 'react';

// Tiny neutral blur placeholder (1x1 slate) to avoid layout-shift flashes.
const BLUR =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#1e293b"/></svg>',
  ).toString('base64');

const FALLBACK =
  'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80';

/**
 * Drop-in replacement for <img> backed by next/image: lazy-loaded, responsive,
 * AVIF/WebP, with blur-up and graceful fallback. Use `fill` for cover layouts.
 */
export default function OptimizedImage({
  src,
  alt = '',
  fill = false,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, 33vw',
  className = '',
  priority = false,
}) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);
  const common = {
    alt,
    src: imgSrc,
    sizes,
    className,
    placeholder: 'blur',
    blurDataURL: BLUR,
    priority,
    loading: priority ? undefined : 'lazy',
    onError: () => setImgSrc(FALLBACK),
  };

  if (fill) return <Image fill {...common} />;
  return <Image width={width || 800} height={height || 600} {...common} />;
}
