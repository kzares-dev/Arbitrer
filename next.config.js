/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost", "bookish-bassoon-5gqq4xvvvw6wcv5g4-3000.app.github.dev"],
      allowedOrigins: ["https://bookish-bassoon-5gqq4xvvvw6wcv5g4-3000.app.github.dev", "localhost:3000"]
    }
  }
}

module.exports = nextConfig

