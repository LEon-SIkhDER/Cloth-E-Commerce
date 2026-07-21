/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // allowedDevOrigins: ['192.168.0.101', '192.168.0.101:3000'],
  // https://res.cloudinary.com

  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
