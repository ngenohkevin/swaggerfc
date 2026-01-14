import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-inter">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Design Concepts
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SwaggerFC Website</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Three unique design directions for your football club website. Click on any design to view the full interactive preview.
          </p>
        </div>

        {/* Tech Stack Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
          <h3 className="font-semibold text-lg mb-3">Technology Stack</h3>
          <div className="flex flex-wrap gap-3">
            <span className="bg-slate-700 px-4 py-2 rounded-lg text-sm">Next.js 15 (Latest)</span>
            <span className="bg-slate-700 px-4 py-2 rounded-lg text-sm">Tailwind CSS 4</span>
            <span className="bg-slate-700 px-4 py-2 rounded-lg text-sm">shadcn/ui Components</span>
            <span className="bg-slate-700 px-4 py-2 rounded-lg text-sm">Strapi CMS</span>
            <span className="bg-slate-700 px-4 py-2 rounded-lg text-sm">Embla Carousel (Auto-scroll)</span>
          </div>
        </div>

        {/* Features Included */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
          <h3 className="font-semibold text-lg mb-3">All Designs Include</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Feature title="Hero Section" description="Full-screen hero with club branding" />
            <Feature title="News Section" description="Card-based news managed via Strapi" />
            <Feature title="Auto-Scroll Achievements Carousel" description="Showcase trophies and milestones" />
            <Feature title="Shop with WhatsApp Orders" description="Jerseys, hoodies, polo shirts" />
            <Feature title="Strapi CMS Integration" description="Easy content management" />
            <Feature title="Fully Responsive" description="Mobile, tablet, desktop optimized" />
          </div>
        </div>

        {/* Design Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Design A */}
          <Link href="/design-a" className="group block h-full">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10 h-full flex flex-col">
              <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1560969961-bc5368188cb9?w=600&q=80"
                  alt="Stadium"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mb-2">
                    <span className="font-bold text-[#1a1f2e]">SF</span>
                  </div>
                  <span className="text-amber-400 text-xs uppercase tracking-wider">Preview</span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded">OPTION A</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">Classic Club</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  Traditional football club aesthetic with dark tones, gold accents, and bold typography. Timeless and professional.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Dark Theme</span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Gold Accents</span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Bold Typography</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Design B */}
          <Link href="/design-b" className="group block h-full">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 h-full flex flex-col">
              <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden flex-shrink-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-2">
                    <span className="font-bold text-white">S</span>
                  </div>
                  <span className="text-emerald-400 text-xs uppercase tracking-wider">Preview</span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">OPTION B</span>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">RECOMMENDED</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Modern Energy</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  Dynamic design with gradient accents, glassmorphism effects, and vibrant colors. Contemporary and engaging.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Gradients</span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Glass Effects</span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Modern UI</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Design C */}
          <Link href="/design-c" className="group block h-full">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-green-600/50 transition-all hover:shadow-2xl hover:shadow-green-600/10 h-full flex flex-col">
              <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] relative overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1629977007371-0ba395424741?w=600&q=80"
                  alt="Football"
                  fill
                  className="object-cover opacity-20"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 bg-[#1d4d2c] rounded-full flex items-center justify-center mb-2">
                    <span className="font-bold text-white text-sm">SF</span>
                  </div>
                  <span className="text-[#1d4d2c] text-xs uppercase tracking-wider font-medium">Preview</span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-700/20 text-green-500 text-xs px-2 py-1 rounded">OPTION C</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">Community Focus</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  Warm, welcoming design with cream tones, organic shapes, and serif typography. Approachable and inviting.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Light Theme</span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Warm Colors</span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded">Friendly Feel</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Design concepts by Kevin | Images from Unsplash</p>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
