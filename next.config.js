const {withAxiom} = require("next-axiom")

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["geist"],
    modularizeImports: {
        "@mui/material": {
            transform: "@mui/material/{{member}}",
        },
    },
    experimental: {
        esmExternals: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
}

module.exports = withAxiom(nextConfig)