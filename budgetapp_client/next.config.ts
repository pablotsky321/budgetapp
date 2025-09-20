import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
          {
            source: "/:path*", 
            destination: "https://8080-firebase-budgetapp-1750868233866.cluster-joak5ukfbnbyqspg4tewa33d24.cloudworkstations.dev/:path*"
          },
        ]
      },

      allowedDevOrigins: [
        "https://3000-firebase-budgetapp-1750868233866.cluster-joak5ukfbnbyqspg4tewa33d24.cloudworkstations.dev",
      ],
};

export default nextConfig;
