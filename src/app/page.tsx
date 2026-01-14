"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-black text-zinc-900 dark:text-white min-h-screen font-inter transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Design Concepts
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">SwaggerFC Website</h1>
          <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Three unique design directions for your football club website. Click on any design to view the full interactive preview.
          </p>
        </div>

        {/* Tech Stack Info */}
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm dark:shadow-none transition-colors duration-300">
          <h3 className="font-semibold text-lg mb-3">Technology Stack</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">Next.js 15 (Latest)</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">Tailwind CSS 4</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">shadcn/ui Components</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">Strapi CMS</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">Embla Carousel (Auto-scroll)</span>
          </div>
        </div>

        {/* Features Included */}
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm dark:shadow-none transition-colors duration-300">
          <h3 className="font-semibold text-lg mb-3">All Designs Include</h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <Feature title="Hero Section" description="Full-screen hero with club branding" />
            <Feature title="News Section" description="Card-based news managed via Strapi" />
            <Feature title="Auto-Scroll Achievements Carousel" description="Showcase trophies and milestones" />
            <Feature title="Shop with WhatsApp Orders" description="Jerseys, hoodies, polo shirts" />
            <Feature title="Strapi CMS Integration" description="Easy content management" />
            <Feature title="Fully Responsive" description="Mobile, tablet, desktop optimized" />
          </div>
        </div>

        {/* Design Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Design A */}
          <Link href="/design-a" className="group block h-full">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/50 transition-all hover:shadow-xl dark:hover:shadow-2xl hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/10 h-full flex flex-col">
              <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-zinc-100 dark:from-zinc-900 to-zinc-200 dark:to-black relative overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1560969961-bc5368188cb9?w=600&q=80"
                  alt="Stadium"
                  fill
                  className="object-cover opacity-40 dark:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                    <span className="font-bold text-black">SF</span>
                  </div>
                  <span className="text-yellow-600 dark:text-yellow-400 text-xs uppercase tracking-wider">Preview</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded">DESIGN 1</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Classic Club</h3>
                <p className="text-zinc-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  Traditional football club aesthetic with dark tones, yellow accents, and bold typography. Timeless and professional.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Black Theme</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Yellow Accents</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Bold Typography</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Design B */}
          <Link href="/design-b" className="group block h-full">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/50 transition-all hover:shadow-xl dark:hover:shadow-2xl hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/10 h-full flex flex-col">
              <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-zinc-100 dark:from-zinc-900 to-zinc-200 dark:to-black relative overflow-hidden flex-shrink-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-2">
                    <span className="font-bold text-black">S</span>
                  </div>
                  <span className="text-yellow-600 dark:text-yellow-400 text-xs uppercase tracking-wider">Preview</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded">DESIGN 2</span>
                  <span className="bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 text-xs px-2 py-1 rounded">RECOMMENDED</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Modern Energy</h3>
                <p className="text-zinc-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  Dynamic design with gradient accents, glassmorphism effects, and vibrant colors. Contemporary and engaging.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Gradients</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Glass Effects</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Modern UI</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Design C */}
          <Link href="/design-c" className="group block h-full">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/50 transition-all hover:shadow-xl dark:hover:shadow-2xl hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/10 h-full flex flex-col">
              <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-yellow-50 to-yellow-100 relative overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1629977007371-0ba395424741?w=600&q=80"
                  alt="Football"
                  fill
                  className="object-cover opacity-20"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-2">
                    <span className="font-bold text-yellow-400 text-sm">SF</span>
                  </div>
                  <span className="text-black text-xs uppercase tracking-wider font-medium">Preview</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded">DESIGN 3</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Community Focus</h3>
                <p className="text-zinc-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  Warm, welcoming design with light tones, organic shapes, and clean typography. Approachable and inviting.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Light Theme</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Warm Colors</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded">Friendly Feel</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 sm:mt-12 text-center text-zinc-500 dark:text-gray-500 text-sm">
          <p>Design concepts by Kevin | Images from Unsplash</p>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-zinc-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
