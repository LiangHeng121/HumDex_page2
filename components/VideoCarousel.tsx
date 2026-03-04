import React, { useState } from 'react';
import { CarouselItem } from '../types';

interface VideoCarouselProps {
  items: CarouselItem[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Main Content Area */}
      <div className="relative overflow-hidden rounded-xl aspect-video bg-black shadow-lg border border-white/10 group">
        
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Render YouTube or Local Video */}
            {item.youtubeId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${item.youtubeId}?enablejsapi=1&rel=0`}
                title={item.title || 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : item.videoUrl ? (
               <video
                 controls
                 className="w-full h-full object-cover"
                 poster={item.posterUrl}
                 src={item.videoUrl}
               >
                  Your browser does not support the video tag.
               </video>
            ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                    No Video Source
                </div>
            )}

            {/* Optional Caption Overlay */}
            {item.description && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white text-sm md:text-base">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-300 text-xs">{item.description}</p>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-cyan/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-cyan/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Dots/Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-brand-cyan'
                : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;