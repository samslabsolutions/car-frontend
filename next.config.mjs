/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'auto-deal-rho.vercel.app',
            'picsum.photos',
            'via.placeholder.com',
            'sample-videos.com',
            'localhost', // Add localhost to allow local development images
        ],
        // Optionally, use remotePatterns for more granular control (recommended)
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/images/**',
            },
        ],
    },
};

export default nextConfig;