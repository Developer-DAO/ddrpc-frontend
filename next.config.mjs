/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ethereum.org',
                port: '',
                pathname: '/_next/static/**',
            },
        ],
    },
};

export default nextConfig;
