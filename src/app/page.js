

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const templates = [
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Clean and professional design suitable for corporate roles',
      image: '/templates-previews/professional.png'
    },
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Contemporary layout with creative touches',
      image: '/templates-previews/modern.png'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique design for creative industries and roles',
      image: '/templates-previews/creative.png'
    },
    { 
      id: 'elegant', 
      name: 'Elegant', 
      description: 'Sophisticated design with elegant typography',
      image: '/templates-previews/elegant.png'
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Timeless design with a traditional layout',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'best', 
      name: 'Best', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'traditional', 
      name: 'Traditional', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'formal', 
      name: 'Formal', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'toronto', 
      name: 'Toronto', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'functional', 
      name: 'Functional', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'simple', 
      name: 'Simple', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'stylish', 
      name: 'Stylish', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'iconic', 
      name: 'Iconic', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'revelent', 
      name: 'Revelent', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'composit', 
      name: 'Composit', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'chronological', 
      name: 'Chronological', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'federal', 
      name: 'Federal', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'pheonix', 
      name: 'Pheonix', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'cool', 
      name: 'Cool', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
    { 
      id: 'horizon', 
      name: 'Horizon', 
      description: 'Best design for all industries',
      image: '/templates-previews/classic.png'
    },
  ];
  
  const startBuilding = () => {
    if (selectedTemplate) {
      router.push(`/builder?template=${selectedTemplate}`);
    } else {
      alert('Please select a template to get started');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ResumeBuilder</h1>
          </div>
          <div>
            <Link 
              href="/builder" 
              className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Builder
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Create a professional resume in minutes
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Choose from our professionally designed templates and get personalized AI suggestions to make your resume stand out.
        </p>
      </section>

      {/* Template Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Choose a Template</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`
                border rounded-lg overflow-hidden cursor-pointer transition-all duration-200
                ${selectedTemplate === template.id 
                  ? 'ring-4 ring-blue-500 border-transparent transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="relative h-96 bg-gray-100">
                <Image 
                  src={template.image} 
                  alt={template.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{template.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{template.description}</p>
                
                {selectedTemplate === template.id && (
                  <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Selected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button
            onClick={startBuilding}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue with Selected Template
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Why Choose Our Resume Builder?
          </h2>
          
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Professional Templates</h3>
              <p className="mt-2 text-base text-gray-500">
                Choose from multiple professionally designed templates suitable for any industry or career stage.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">AI-Powered Suggestions</h3>
              <p className="mt-2 text-base text-gray-500">
                Get personalized suggestions from our AI to improve your resume content and make it stand out.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Easy Download</h3>
              <p className="mt-2 text-base text-gray-500">
                Download your resume as a PDF with one click, ready to share with potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}