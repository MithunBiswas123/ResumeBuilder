// // components/ResumeCard.jsx
// import Image from "next/image";
// import ScrollReveal from "@/components/ScrollReveal";

// const ResumeCard = ({ image, heading, description, groupIndex }) => {
//   // Calculate direction based on group (every 3 cards)
//   const group = Math.floor(groupIndex / 3);
//   const direction = group % 2 === 0 ? 'slideLeft' : 'slideRight';
  
//   // Base delay for each group (0.3s = 300ms)
//   const groupDelay = group * 300;
//   // Additional delay within group (0.15s = 150ms)
//   const itemDelay = (groupIndex % 3) * 150;
  
//   return (
//     <ScrollReveal
//       animation={direction}
//       delay={groupDelay + itemDelay}
//       duration={800}
//       easing="smooth"
//     >
    
      
// <div className="flex flex-col gap-4 items-center justify-around p-4 text-center w-full h-full bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300">
//   {/* This centers the icon */}
//   <div className="w-[3.5rem] h-[3.5rem] flex items-center justify-center bg-gray-700 rounded-full p-2 mb-2">
//     <Image
//       src={image}
//       alt={`Icon representing ${heading}`}
//       width={48}
//       height={48}
//       className="w-full h-full object-contain"
//       loading="eager"
//     />
//   </div>
//   {/* Center the heading */}
//   <h3 className="text-neutral-200 font-poppins font-semibold text-xl md:text-2xl text-center">
//     {heading}
//   </h3>
//   {/* Center the description */}
//   <p className="text-slate-300 font-inter text-sm md:text-base font-light text-center">
//     {description}
//   </p>
// </div>
//     </ScrollReveal>
//   );
// };

// export default ResumeCard;


import { memo } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const ResumeCard = memo(({ image, heading, description, groupIndex }) => {
  // Calculate direction based on group (every 3 cards)
  const group = Math.floor(groupIndex / 3);
  const direction = group % 2 === 0 ? 'slideLeft' : 'slideRight';
  
  // Calculate staggered animation delays
  const groupDelay = group * 300; // Base delay for each group (0.3s = 300ms)
  const itemDelay = (groupIndex % 3) * 150; // Additional delay within group (0.15s = 150ms)
  
  return (
    <ScrollReveal
      animation={direction}
      delay={groupDelay + itemDelay}
      duration={800}
      easing="smooth"
    >
      <div className="flex flex-col gap-4 items-center justify-around p-4 text-center w-full h-full bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:transform hover:scale-[1.02]">
        {/* Icon container */}
        <div className="w-[3.5rem] h-[3.5rem] flex items-center justify-center bg-gray-700 rounded-full p-2 mb-2">
          <Image
            src={image}
            alt={`Icon representing ${heading}`}
            width={48}
            height={48}
            className="w-full h-full object-contain"
            loading="eager"
            priority={groupIndex < 3} // Only prioritize loading for the first visible cards
          />
        </div>
        
        {/* Heading */}
        <h3 className="text-neutral-200 font-poppins font-semibold text-xl md:text-2xl text-center">
          {heading}
        </h3>
        
        {/* Description */}
        <p className="text-slate-300 font-inter text-sm md:text-base font-light text-center">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
});

// Display name for React DevTools
ResumeCard.displayName = "ResumeCard";

export default ResumeCard;