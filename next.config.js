/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    
    // Security: Headers configuration
    // Additional security headers (complementary to middleware)
    async headers() {
        return [
            {
                // Apply security headers to all routes
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Download-Options',
                        value: 'noopen'
                    },
                ],
            },
        ];
    },
    
    // Security: Environment variable validation
    env: {
        // Ensure sensitive keys are not exposed
        // NEXT_PUBLIC_ variables are intentionally exposed (Supabase anon key is safe)
        // Never expose service role keys or secrets
    },
}

module.exports = nextConfig
