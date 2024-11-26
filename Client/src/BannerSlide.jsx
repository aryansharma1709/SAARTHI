import { useState, useEffect } from 'react';
import banner1 from './assets/Website_banner_1.png';
import banner2 from './assets/Website_store_banner.png';
import banner3 from './assets/Website_News_feed.png';
  export default function BannerSlide() {
const banners = [
    { image: banner1, title: "Empowering Education" },
    { image: banner2, title: "Saarthi store" },
    { image: banner3, title: "Market News" }
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
}
