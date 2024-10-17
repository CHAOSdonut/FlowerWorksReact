/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '5032',
                pathname: '/public/img/',
            },
        ],
    },
};

export default nextConfig;
