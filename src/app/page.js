

// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';


// export default function HomePage() {
//   const router = useRouter();
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const templates = [
//     { 
//       id: 'professional', 
//       name: 'Professional', 
//       description: 'Clean and professional design suitable for corporate roles',
//       image: '/templates-previews/professional.png'
//     },
//     { 
//       id: 'modern', 
//       name: 'Modern', 
//       description: 'Contemporary layout with creative touches',
//       image: '/templates-previews/modern.png'
//     },
//     { 
//       id: 'creative', 
//       name: 'Creative', 
//       description: 'Unique design for creative industries and roles',
//       image: '/templates-previews/creative.png'
//     },
//     { 
//       id: 'elegant', 
//       name: 'Elegant', 
//       description: 'Sophisticated design with elegant typography',
//       image: '/templates-previews/elegant.png'
//     },
//     { 
//       id: 'classic', 
//       name: 'Classic', 
//       description: 'Timeless design with a traditional layout',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'best', 
//       name: 'Best', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'traditional', 
//       name: 'Traditional', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'formal', 
//       name: 'Formal', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'toronto', 
//       name: 'Toronto', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'functional', 
//       name: 'Functional', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'simple', 
//       name: 'Simple', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'stylish', 
//       name: 'Stylish', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'iconic', 
//       name: 'Iconic', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'revelent', 
//       name: 'Revelent', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'composit', 
//       name: 'Composit', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'chronological', 
//       name: 'Chronological', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'federal', 
//       name: 'Federal', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'pheonix', 
//       name: 'Pheonix', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'cool', 
//       name: 'Cool', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     // { 
//     //   id: 'horizon', 
//     //   name: 'Horizon', 
//     //   description: 'Best design for all industries',
//     //   image: '/templates-previews/classic.png'
//     // },
//     { 
//       id: 'gullible', 
//       name: 'Gullible', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'deligant', 
//       name: 'Deligant', 
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'executive',
//       name: 'Executive', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'premium',
//       name: 'Premium', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'everest',
//       name: 'Everest', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'chronic',
//       name: 'Chronic', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'chronicles',
//       name: 'Chronicles', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'tokyo',
//       name: 'Tokyo', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'stockholm',
//       name: 'Stockholm', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'milano',
//       name: 'Milano', 

//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'vienna',
//       name: 'Vienna',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'kyoto',
//       name: 'Kyoto',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'berlin',
//       name: 'Berlin',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'facncy',
//       name: 'Fancy',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'mountfuji',
//       name: 'MountFuji',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'asthetic',
//       name: 'Asthetic',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'minimal',
//       name: 'Minimal',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'phoen',
//       name: 'Phoen',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'philips',
//       name: 'Philips',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'crisp',
//       name: 'Crisp',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'clean',
//       name: 'Clean',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'parallel',
//       name: 'Parallel',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'zinc',
//       name: 'Zinc',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'nexus',
//       name: 'Nexus',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'star',
//       name: 'Star',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'nova',
//       name: 'Nova',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'santino',
//       name: 'Santino',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'twocolumn',
//       name: 'TwoColumn',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'timeline',
//       name: 'Timeline',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'tempo',
//       name: 'Timeline',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },
//     { 
//       id: 'sample',
//       name: 'Sample',
//       description: 'Best design for all industries',
//       image: '/templates-previews/classic.png'
//     },

//   ];

//   const startBuilding = () => {
//     if (selectedTemplate) {
//       router.push(`/builder?template=${selectedTemplate}`);
//     } else {
//       alert('Please select a template to get started');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-gray-900">ResumeBuilder</h1>
//           </div>
//           <div>
//             <Link 
//               href="/builder" 
//               className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Go to Builder
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
//         <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
//           Create a professional resume in minutes
//         </h1>
//         <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
//           Choose from our professionally designed templates and get personalized AI suggestions to make your resume stand out.
//         </p>
//       </section>

//       {/* Template Selection */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         <h2 className="text-2xl font-bold text-gray-900 mb-8">Choose a Template</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {templates.map((template) => (
//             <div 
//               key={template.id}
//               onClick={() => setSelectedTemplate(template.id)}
//               className={`
//                 border rounded-lg overflow-hidden cursor-pointer transition-all duration-200
//                 ${selectedTemplate === template.id 
//                   ? 'ring-4 ring-blue-500 border-transparent transform scale-105' 
//                   : 'border-gray-200 hover:border-gray-300'
//                 }
//               `}
//             >
//               <div className="relative h-96 bg-gray-100">
//                 <Image 
//                   src={template.image} 
//                   alt={template.name}
//                   fill
//                   style={{ objectFit: 'contain' }}
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-medium text-lg">{template.name}</h3>
//                 <p className="text-gray-500 text-sm mt-1">{template.description}</p>

//                 {selectedTemplate === template.id && (
//                   <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     Selected
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <button
//             onClick={startBuilding}
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//           >
//             Continue with Selected Template
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-center text-gray-900">
//             Why Choose Our Resume Builder?
//           </h2>

//           <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
//             {/* Feature 1 */}
//             <div className="text-center">
//               <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="mt-4 text-xl font-medium text-gray-900">Professional Templates</h3>
//               <p className="mt-2 text-base text-gray-500">
//                 Choose from multiple professionally designed templates suitable for any industry or career stage.
//               </p>
//             </div>

//             {/* Feature 2 */}
//             <div className="text-center">
//               <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="mt-4 text-xl font-medium text-gray-900">AI-Powered Suggestions</h3>
//               <p className="mt-2 text-base text-gray-500">
//                 Get personalized suggestions from our AI to improve your resume content and make it stand out.
//               </p>
//             </div>

//             {/* Feature 3 */}
//             <div className="text-center">
//               <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
//                 </svg>
//               </div>
//               <h3 className="mt-4 text-xl font-medium text-gray-900">Easy Download</h3>
//               <p className="mt-2 text-base text-gray-500">
//                 Download your resume as a PDF with one click, ready to share with potential employers.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import React from "react";
import TrustedBy from "@/components/TrustedBy";
import ResumeHero from "@/components/ResumeHero";
import ResumeCard from "@/components/ResumeCard";
import LandingPageCarousel from "@/components/LandingPageCarousel";
import ResumeButtons from "@/components/ResumeButtons";
import Image from "next/image";
import IconHover from "@/components/IconHover";

import { FileText, PenTool, Download } from "react-feather";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
// import AtsChecker from "@/ATS/Page";
const ResumeAccordion = dynamic(
  () => import("@/components/ResumeAccordion"),
  {
    loading: () => <p>Loading...</p>,
  }
);

function page() {
  // Define a features array for the icon sections
  const features = [
    {
      Icon: "/page2Card1.svg",
      title: "Choose your template",
      description: "Our professional resume templates are designed strictly following all industry guidelines and best practices that employers look for.",
      delay: 0,
    },
    {
      Icon: "/page2Card2.svg",
      title: "Fill your information",
      description: "Not finding the right words to showcase yourself? We&apos;ve added thousands of pre-written examples and resume samples. As easy as clicking.",
      delay: 0.2,
    },
    {
      Icon: "/page2Card3.svg",
      title: "Download your resume",
      description: "Start impressing employers. Download your awesome resume and land the job you are looking for, effortlessly.",
      delay: 0.4,
    },
  ];

  const featuresData = [
    {
      heading: "Build with Confidence",
      title: "Powerful resume builder",
      description:
        "Use our potent creation tools and expert guidance to create the perfect resume for your next job application.",
      icon: "./page2Card1.svg",
    },
    {
      heading: "Stand Out",
      title: "Professional templates",
      description:
        "Choose from 25+ applicant tracking systems (ATS)-friendly modern and professional templates.",
      icon: "/page2Card2.png",
    },
    {
      heading: "Personalize Your Resume",
      title: "Customize fonts and colors",
      description: "Select custom fonts and colors on any resume template.",
      icon: "./page2Card3.svg",
    },
    {
      heading: "Learn from the Best",
      title: "Free resume examples",
      description:
        "Use our more than 500 resume examples and templates to see what a great resume looks like in your field.",
      icon: "./page2Card4.svg",
    },
    {
      heading: "Beat the Bots",
      title: "ATS-friendly templates",
      description:
        "Sail through applicant tracking systems with resume templates that appeal to both machines and humans.",
      icon: "./page2Card5.svg",
    },
    {
      heading: "Expert Guidance",
      title: "Expert tips and guidance",
      description:
        "Get help every step of the way as you build your resume with expert tips and suggested phrases.",
      icon: "./page2Card6.svg",
    },
    {
      heading: "AI-Powered Assistance",
      title: "Easy with AI",
      description:
        "Quickly generate formal phrases and summaries. Sound professional, faster.",
      icon: "./page2Card7.svg",
    },
    {
      heading: "Get Noticed",
      title: "Beat the competition",
      description:
        "Our tested resume templates are designed to make you more attractive to recruiters.",
      icon: "./page2Card8.svg",
    },
    {
      heading: "Save Time",
      title: "Pre-written content",
      description:
        "Stop worrying about words. Save time by adding pre-approved, tested content from certified writers.",
      icon: "./page2Card9.svg",
    },
  ];


  return (
    <>
      <div className="bg-black overflow-x-clip">
        <div className="bg-black pt-6 px-5 md:max-w-6xl lg:max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col gap-36">
            <div>
              <TrustedBy />
              <ResumeHero />
            </div>
            <div className="mb-20">
              <div className="flex items-center justify-center h-auto mb-20">
                <Image
                  alt="HeaderPage2"
                  className="w-4/5 md:w-[52.77%]"
                  src="/page2Header.svg"
                  width={500}
                  height={300}
                  priority
                />
              </div>

              {/* Feature Cards - Simple Grid Implementation */}
              <div className="mt-10 mb-20">
                <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
                  Why Choose Our Resume Builder
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                  {featuresData.map((feature, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gray-700 rounded-full p-3 mb-4 flex items-center justify-center">
                        <Image
                          src={feature.icon}
                          alt={feature.heading}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>


                      <h3 className="text-lg font-bold text-white mb-2">{feature.heading}</h3>


                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      {/* 3 EASY STEPS section with optimized grid layout and performance */}

      <div className="bg-slate-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16">

          <div className="flex flex-col items-center gap-8 sm:gap-12">
            <ScrollReveal
              animation="slideDown"
              duration={1000}
              easing="bouncy"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 pt-64">
                3 EASY STEPS TO CREATE YOUR PERFECT RESUME
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full mt-[-150px]">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <div className="mb-6 p-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                    <IconHover
                      icon={feature.Icon}
                    />
                  </div>
                  <h3 className="mb-3 text-xl sm:text-2xl font-bold text-gray-800 pt-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template selection section with carousel */}



      <div className="bg-[url(/page3Bg.svg)] pt-16 pb-16 sm:pt-64 sm:pb-64 px-4 sm:px-5 bg-cover bg-center h-auto w-full flex flex-col items-center justify-center">
        <div className="w-full  flex flex-col items-center justify-center">
          <ScrollReveal
            animation="slideRight"
            duration={500}
            easing="smooth"
            className="mb-10 sm:mb-12 w-full"
          >
            <h2 className="text-white text-center text-2xl md:text-3xl font-semibold mb-16 sm:mb-16 ">
              Pick one of many world-class templates <br className="hidden sm:block" /> and build your resume
              in minutes
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="slideRight" duration={500} easing="smooth">
            <LandingPageCarousel />
          </ScrollReveal>
        </div>
      </div>

      {/* FAQ section with optimized layout and accessibility */}
      <div className="bg-slate-50 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="bg-slate-50 py-16 sm:py-20 px-4 sm:px-5 md:max-w-6xl lg:max-w-7xl mx-auto flex flex-col">
          <ScrollReveal
            animation="slideRight"
            duration={500}
            easing="smooth"
            className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-8 items-center sm:items-stretch mb-12 sm:mb-16"
          >
            <div className="h-auto w-20 sm:w-24">
              <Image
                alt="Resume FAQ icon"
                width={500}
                height={500}
                src="/page4Img1.svg"
                className="w-full h-full object-contain"
                priority={false}
              />
            </div>
            <div className="flex flex-col justify-between items-center sm:items-start py-1 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-medium font-inter mb-2 sm:mb-0">
                Have Questions About Writing A Great Resume?
              </h3>
              <p className="text-xl sm:text-2xl font-extralight font-inter">
                Expert answers to all your resume inquiries
              </p>
            </div>
          </ScrollReveal>
          <ResumeAccordion />
          {/* <AtsChecker /> */}
        </div>
        </div>
      </div>
    </>
  );
}
export default page;
