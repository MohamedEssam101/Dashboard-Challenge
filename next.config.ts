import type { NextConfig } from "next";

// Next.js configuration for framework-level behavior.
const nextConfig: NextConfig = {
	images: {
		// Allow next/image to optimize GitHub avatar URLs.
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
};

export default nextConfig;
