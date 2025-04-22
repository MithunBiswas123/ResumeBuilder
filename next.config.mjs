// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['via.placeholder.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
        },
      ],
    },
  };
  
  export default nextConfig;