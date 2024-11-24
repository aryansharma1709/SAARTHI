import React, { useState, useEffect } from 'react';
const BannerSlider = () => {
const banners = [
    { image: "/api/placeholder/1200/400", title: "Empowering Education" },
    { image: "/api/placeholder/1200/400", title: "Connect with Alumni" },
    { image: "/api/placeholder/1200/400", title: "Learn from Experts" }
  ];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div 
          key={index} 
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={banner.image} 
            alt={banner.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
            {banner.title}
          </div>
        </div>
      ))}
    </div>
  );
};
