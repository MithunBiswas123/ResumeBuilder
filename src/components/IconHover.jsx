// import Image from 'next/image';
// import React from 'react';

// function IconHover({ icon, className }) {
//     // Check if icon is a React component or string path
//     const isReactComponent = typeof icon === 'function';
//     const Icon = isReactComponent ? icon : null;
    
//     return (
//       <div className={`w-auto h-auto group transform transition-transform duration-500 hover:scale-105 ${className || ''}`}>
//         <div className="relative w-[100px] h-[100px] rounded-full bg-slate-50 transition-all duration-700 delay-300 ease-in-out group-hover:bg-blue-50 sm:w-[120px] sm:h-[120px]">
//           <div className="absolute w-[90px] h-[90px] rounded-full bg-slate-100 transition-all duration-500 ease-in-out group-hover:bg-blue-100 top-1/2 left-1/2 delay-200 transform -translate-x-1/2 -translate-y-1/2 sm:w-[108px] sm:h-[108px]">
//             <div className="absolute w-[80px] h-[80px] rounded-full bg-slate-200 top-1/2 left-1/2 delay-100 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:bg-red-600 sm:w-[96px] sm:h-[96px]">
//               <div className="absolute w-[70px] h-[70px] rounded-full bg-slate-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:bg-red-600  sm:w-[84px] sm:h-[84px]">
//                 <div className="absolute w-[60px] h-[60px] rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-in-out group-hover:bg-red-600  shadow-lg sm:w-[72px] sm:h-[72px]">
//                   <div className="absolute w-[35px] h-[35px] rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:bg-red-600  flex items-center justify-center">
//                     {isReactComponent ? (
//                       <Icon size={20} className="stroke-blue-600 group-hover:stroke-white transition-all duration-200 ease-in-out" />
//                     ) : (
//                       <Image 
//                         src={icon} 
//                         alt="Feature icon" 
//                         width={24}
//                         height={24}
//                         className="w-[20px] h-[20px] object-contain transition-all duration-200 ease-in-out"
//                         loading="eager"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default IconHover;


import Image from 'next/image';
import React from 'react';

function IconHover({ icon, className }) {
    // Check if icon is a React component or string path
    const isReactComponent = typeof icon === 'function';
    
    return (
      <div className={`w-auto h-auto group ${className || ''}`}>
        <div className="relative w-[157px] h-[157px] rounded-full bg-slate-50 transition-all duration-700 delay-300 ease-in-out group-hover:bg-red-100">
          <div className="absolute w-[145px] h-[145px] rounded-full bg-slate-50 transition-all duration-500 ease-in-out group-hover:bg-red-200 top-1/2 left-1/2 delay-200 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-[133px] h-[133px] rounded-full bg-gray-100 top-1/2 left-1/2 delay-100 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:bg-red-300">
              <div className="absolute w-[120px] h-[120px] rounded-full bg-gray-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:bg-red-400">
                <div className="absolute w-[103px] h-[103px] rounded-full bg-gray-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-in-out group-hover:bg-red-500">
                  <div className="shadow-md absolute w-[89px] h-[89px] rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:bg-red-600">
                    <div className="absolute w-[35px] h-[35px] rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:bg-red-600 flex items-center justify-center">
                      {isReactComponent ? (
                        <icon className="w-full h-full stroke-red-600 group-hover:stroke-white group-hover:fill-red-600 transition-all duration-200 ease-in-out" />
                      ) : (
                        <Image 
                          src={icon} 
                          alt="Feature icon" 
                          width={24}
                          height={24}
                          className="w-[20px] h-[20px] object-contain transition-all duration-200 ease-in-out"
                          loading="eager"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default IconHover;