"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DesignB() {
  return (
    <div className="bg-zinc-950 dark:bg-black text-white font-inter min-h-screen transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 dark:bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#d4af37] flex items-center justify-center">
              <span className="font-bold text-white text-lg">S</span>
            </div>
            <span className="text-xl font-bold">Swagger<span className="text-[#c9a227]">FC</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#news" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">News</a>
            <a href="#achievements" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Achievements</a>
            <a href="#team" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Team</a>
            <a href="#shop" className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">Shop</a>
            <ThemeToggle className="text-zinc-400 hover:text-white hover:bg-white/10" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a227]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#c9a227]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#c9a227] rounded-full animate-pulse"></span>
                <span className="text-sm text-zinc-300">Season 2025/26 Now Live</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                Where <span className="gradient-text">Passion</span> Meets Performance
              </h1>
              <p className="text-xl text-zinc-400 mb-8 max-w-lg">
                Join the movement. Experience football like never before with Swagger FC.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#news" className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                  Latest Updates
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
                <a href="#shop" className="glass text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
                  Get Merch
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(201,162,39,0.3)]">
                <Image
                  src="https://images.unsplash.com/photo-1677119966332-8c6e9fb0efab?w=800&q=80"
                  alt="Football Player"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Stats Floating Cards */}
              <div className="absolute -left-8 top-1/4 glass rounded-2xl p-4">
                <div className="text-3xl font-bold text-[#c9a227]">24</div>
                <div className="text-sm text-zinc-400">Matches Won</div>
              </div>
              <div className="absolute -right-4 bottom-1/4 glass rounded-2xl p-4">
                <div className="text-3xl font-bold text-[#d4af37]">87</div>
                <div className="text-sm text-zinc-400">Goals Scored</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#c9a227] text-sm font-semibold tracking-wider uppercase">Stay Updated</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">Latest News</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Featured Article */}
            <div className="md:col-span-7 group cursor-pointer">
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=1200&q=80"
                  alt="Championship Victory"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                    <span className="text-zinc-400 text-sm">Jan 10, 2026</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#c9a227] transition-colors">
                    Championship Glory: Our Road to Victory
                  </h3>
                  <p className="text-zinc-400 mt-3 line-clamp-2">
                    Relive the incredible journey that led to our historic championship win this season.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Articles */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <NewsCard
                image="https://images.unsplash.com/photo-1629977007371-0ba395424741?w=300&q=80"
                category="TRAINING"
                categoryColor="text-[#c9a227]"
                title="Pre-Season Camp Dates Announced"
                date="Jan 8, 2026"
              />
              <NewsCard
                image="https://images.unsplash.com/photo-1757031299944-5028e556613d?w=300&q=80"
                category="MATCH REPORT"
                categoryColor="text-[#d4af37]"
                title="Dominant Display in Local Derby"
                date="Jan 5, 2026"
              />
              <NewsCard
                image="https://images.unsplash.com/photo-1629977007398-a17feb6ddf14?w=300&q=80"
                category="ACADEMY"
                categoryColor="text-[#c9a227]"
                title="Youth Academy Trials Open"
                date="Jan 3, 2026"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Carousel Section */}
      <section id="achievements" className="py-24 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="text-center">
            <span className="text-[#c9a227] text-sm font-semibold tracking-wider uppercase">Hall of Fame</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Our Achievements</h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
              Celebrating the milestones that define our journey
            </p>
          </div>
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="relative overflow-hidden">
          <div className="carousel-track flex gap-6 px-6">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6">
                <AchievementCard
                  image="https://images.unsplash.com/photo-1560003991-545650ee5f07?w=800&q=80"
                  year="2025"
                  yearColor="bg-gradient-to-r from-[#c9a227] to-[#d4af37]"
                  title="League Champions"
                  description="First ever league title with an unbeaten run of 18 matches."
                />
                <AchievementCard
                  image="https://images.unsplash.com/photo-1620567253244-6f340f675bca?w=800&q=80"
                  year="2024"
                  yearColor="bg-[#d4af37]"
                  title="Cup Winners"
                  description="Thrilling 2-1 victory in the cup final against defending champions."
                />
                <AchievementCard
                  image="https://images.unsplash.com/photo-1718246425786-894821186deb?w=800&q=80"
                  year="2023"
                  yearColor="bg-[#c9a227]"
                  title="New Home Ground"
                  description="Opened our state-of-the-art 15,000 seat stadium."
                />
                <AchievementCard
                  image="https://images.unsplash.com/photo-1647101678383-9f179e1dd2c0?w=800&q=80"
                  year="2022"
                  yearColor="bg-[#d4af37]"
                  title="Community Award"
                  description="Recognized for excellence in youth development and community outreach."
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#c9a227] text-sm font-semibold tracking-wider uppercase">Official Store</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Get the Gear</h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
              Premium club merchandise. Select your size and order via WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ShopPreviewCard
              image="https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80"
              title="Home Jersey 25/26"
              price="3,500"
              isNew
            />
            <ShopPreviewCard
              image="https://images.unsplash.com/photo-1759447946445-397b1c034768?w=600&q=80"
              title="Premium Hoodie"
              price="2,800"
            />
            <ShopPreviewCard
              image="https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=600&q=80"
              title="Classic Polo"
              price="2,200"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/design-2/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#d4af37] flex items-center justify-center">
                  <span className="font-bold text-white text-lg">S</span>
                </div>
                <span className="text-xl font-bold">Swagger<span className="text-[#c9a227]">FC</span></span>
              </div>
              <p className="text-zinc-500 max-w-md">
                Building champions on and off the pitch. Join our community of passionate supporters.
              </p>
              <div className="flex gap-4 mt-6">
                <SocialIcon href="#">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </SocialIcon>
                <SocialIcon href="#">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </SocialIcon>
                <SocialIcon href="#">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </SocialIcon>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Club</h4>
              <ul className="space-y-3 text-zinc-500">
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Fixtures</a></li>
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Academy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-zinc-500">
                <li>Stadium Address</li>
                <li>info@swaggerfc.com</li>
                <li>+254 700 000 000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 text-center text-zinc-600 text-sm">
            <p>&copy; 2026 SwaggerFC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to designs link */}
      <Link href="/" className="fixed bottom-6 left-6 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity z-50">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Designs
      </Link>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-420px * 4 - 6rem)); }
        }
        .carousel-track {
          animation: scroll 25s linear infinite;
          width: calc(420px * 8 + 12rem);
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function NewsCard({ image, category, categoryColor, title, date }: { image: string; category: string; categoryColor: string; title: string; date: string }) {
  return (
    <div className="group cursor-pointer glass rounded-2xl overflow-hidden flex">
      <div className="w-32 h-32 flex-shrink-0 relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col justify-center">
        <span className={`${categoryColor} text-xs font-semibold`}>{category}</span>
        <h4 className={`font-semibold mt-1 group-hover:${categoryColor} transition-colors line-clamp-2`}>
          {title}
        </h4>
        <span className="text-zinc-500 text-sm mt-2">{date}</span>
      </div>
    </div>
  );
}

function AchievementCard({ image, year, yearColor, title, description }: { image: string; year: string; yearColor: string; title: string; description: string }) {
  return (
    <div className="flex-shrink-0 w-[420px] group">
      <div className="relative h-[550px] rounded-3xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className={`inline-block ${yearColor} text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>{year}</div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-zinc-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ShopPreviewCard({ image, title, price, isNew }: { image: string; title: string; price: string; isNew?: boolean }) {
  return (
    <Link href="/design-2/shop" className="group block cursor-pointer">
      <div className="glass rounded-3xl overflow-hidden">
        <div className="relative h-80 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          {isNew && (
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white text-xs font-semibold px-3 py-1 rounded-full">NEW SEASON</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-zinc-400 text-sm mt-2">Available in S, M, L, XL, XXL</p>
          <div className="flex items-center justify-between mt-6">
            <div>
              <span className="text-sm text-zinc-500">From</span>
              <span className="text-2xl font-bold text-[#c9a227] ml-2">KES {price}</span>
            </div>
            <span className="text-[#c9a227] text-sm font-medium">View in Shop →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
      <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">{children}</svg>
    </a>
  );
}

