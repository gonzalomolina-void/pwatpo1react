import { useState, useEffect } from 'react';
import './PosterImage.css';

const PosterImage = ({ blob, alt, className = "poster-miniatura" }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!blob || !(blob instanceof Blob)) {
      setUrl(null);
      return;
    }
    const newUrl = URL.createObjectURL(blob);
    setUrl(newUrl);
    return () => URL.revokeObjectURL(newUrl);
  }, [blob]);

  if (!url) return <div className={`sin-poster ${className === 'poster-miniatura' ? '' : className}`}>N/A</div>;
  return <img src={url} alt={alt} className={className} />;
};

export default PosterImage;
