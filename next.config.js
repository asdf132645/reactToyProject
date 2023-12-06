// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['component']);
const BASE_PATH = process.env.BASE_PATH

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: BASE_PATH,
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/upload/result', //  destination
            },
            {
                source: '/health',
                destination: `http://localhost:3000${BASE_PATH}/api/health`, //  destination
                basePath: false,
            },
            {
                source: '/api/proxy/:path*',
                destination: `${process.env.NEXT_PRIVATE_API_PROXY_URL}/:path*`,
            },
        ];
    }

};

module.exports = withTM(nextConfig);
