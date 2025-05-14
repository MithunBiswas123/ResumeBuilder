"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TemplateCarousel from './TemplateCarousel';
import Slider from 'react-slick';

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import useSwipe from '../hooks/useSwipe';

const LandingPageCarousel = () => {
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const router = useRouter();
  
  // Simulate loading of templates
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // Template data with categories
  const templates = [
    { id: 'professional', name: 'Professional', image: '/templates-previews/professional.png' },
    { id: 'modern', name: 'Modern', image: '/templates-previews/modern.png',  },
    { id: 'creative', name: 'Creative', image: '/templates-previews/creative.png',  },
    { id: 'elegant', name: 'Elegant', image: '/templates-previews/elegant.png',  },
    { id: 'classic', name: 'Classic', image: '/templates-previews/classic.png', },
    { id: 'corporate', name: 'Corporate', image: '/templates-previews/corporate.png' },
    { id: 'minimal', name: 'Minimal', image: '/templates-previews/classic.png',  },
    { id: 'executive', name: 'Executive', image: '/templates-previews/classic.png',  },
    { id: 'tokyo', name: 'Tokyo', image: '/templates-previews/classic.png',  },
    { id: 'berlin', name: 'Berlin', image: '/templates-previews/classic.png',  },
  ];

  // Handle template selection
  const handleTemplateClick = (templateId) => {
    setSelectedTemplate(templateId);
    // Optional: Uncomment the line below if you want to redirect immediately on click
    // router.push(`/builder?template=${templateId}`);
  };
  
  // Handle continue to builder
  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/builder?template=${selectedTemplate}`);
    }
  };

  // Open full template carousel
  const handleShowAllTemplates = () => {
    setShowAllTemplates(true);
  };  // Custom arrow components
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "rgba(255, 255, 255, 0.2)" }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mx-auto mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "rgba(255, 255, 255, 0.2)" }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mx-auto mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0',
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: false,
    lazyLoad: 'progressive',
    swipe: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: false
        }
      }
    ]
  };  // Setup swipe handlers for mobile when component mounts
  useEffect(() => {
    if (carouselRef.current) {
      const handleSwipeLeft = () => {
        const nextButton = document.querySelector('.slick-next');
        if (nextButton) nextButton.click();
      };
      
      const handleSwipeRight = () => {
        const prevButton = document.querySelector('.slick-prev');
        if (prevButton) prevButton.click();
      };
      
      const minSwipeDistance = 70;
      let touchStart = 0;
      let touchEnd = 0;
      
      const onTouchStart = (e) => {
        touchStart = e.targetTouches[0].clientX;
      };
      
      const onTouchMove = (e) => {
        touchEnd = e.targetTouches[0].clientX;
      };
      
      const onTouchEnd = () => {
        if (touchStart && touchEnd) {
          const distance = touchStart - touchEnd;
          if (distance > minSwipeDistance) {
            handleSwipeLeft();
          }
          if (distance < -minSwipeDistance) {
            handleSwipeRight();
          }
        }
      };
      
      const element = carouselRef.current;
      element.addEventListener('touchstart', onTouchStart);
      element.addEventListener('touchmove', onTouchMove);
      element.addEventListener('touchend', onTouchEnd);
      
      return () => {
        element.removeEventListener('touchstart', onTouchStart);
        element.removeEventListener('touchmove', onTouchMove);
        element.removeEventListener('touchend', onTouchEnd);
      };
    }
  }, [carouselRef]);
    // Loading skeleton component with better visual fidelity
  const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden animate-pulse" style={{ animationDelay: `${(item - 1) * 0.15}s` }}>
            <div className="h-64 bg-gray-700 relative">
              {/* Simulated image placeholder with shimmer effect */}
        
             
            </div>
            <div className="p-4">
              <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="mt-2 flex justify-between items-center">
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-24 ">
      {/* Heading for featured templates */}
   
        {/* Carousel templates section */}      <div ref={carouselRef} className="mb-10 pb-5 template-carousel">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Slider {...carouselSettings}>
          {templates.map((template) => (            <div key={template.id} className="px-2">
              <div 
                onClick={() => handleTemplateClick(template.id)}                
                style={{ '--index': templates.indexOf(template) }}
                className={`
                  template-item bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all duration-300
                  ${selectedTemplate === template.id 
                    ? 'ring-4 ring-red-600 border-transparent transform scale-[1.02]' 
                    : 'hover:border-gray-600 hover:transform hover:scale-[1.01]'
                  }
                `}
              >
                <div className="relative h-72 bg-gray-900">
                  <Image
                    src={template.image} 
                    alt={template.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-2"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <span className="absolute top-2 left-2 px-2 py-1 bg-gray-800 bg-opacity-90 text-xs font-medium text-gray-300 rounded-full">
                    {template.category}
                  </span>
                  
                  {/* Selection overlay */}
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-red-600 bg-opacity-20 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>                <div className="p-4">
                  <h3 className="font-medium text-lg text-white">{template.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{template.category}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateClick(template.id);
                      }}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 mb-12">        <button
          onClick={handleShowAllTemplates}
          className="group w-full md:w-auto px-6 py-3 border border-gray-300 rounded-md font-medium bg-white hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden hover:shadow-lg"
        >
          <span className="relative z-10">Show All Templates</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="relative z-10 transition-transform duration-300 group-hover:translate-y-1"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          {/* Animated background for the button */}
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 bg-red-600 group-hover:h-full opacity-10"></span>
        </button>
          <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`
            group w-full md:w-auto px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden
            ${selectedTemplate 
              ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <span className="relative z-10">Continue with Selected Template</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`relative z-10 transition-transform duration-300 ${selectedTemplate ? 'group-hover:translate-x-1' : ''}`}
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          {/* Animated background for the button */}
          {selectedTemplate && (
            <span className="absolute bottom-0 right-full w-full h-full transition-all duration-500 bg-red-700 group-hover:right-0"></span>
          )}
        </button>
      </div>

      {/* Full template carousel modal */}
      <TemplateCarousel 
        isOpen={showAllTemplates}
        onClose={() => setShowAllTemplates(false)}
        onTemplateSelect={setSelectedTemplate}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
};

export default LandingPageCarousel;
