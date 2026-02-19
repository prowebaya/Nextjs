/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
/*};

export default nextConfig;

*/

/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",     // 👈 IMPORTANT
  images: {
    unoptimized: true, // 👈 static export ke liye
  },
};

export default nextConfig;
*/

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",     // 👈 IMPORTANT
  images: {
    unoptimized: true, // 👈 static export ke liye
  },
};

export default nextConfig;    
