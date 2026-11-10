import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop';

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-[#25151c] to-obsidian animate-pulse" />
      )}

      <img
        src={imgSrc}
        alt={alt || 'Wedding romance photography'}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};

