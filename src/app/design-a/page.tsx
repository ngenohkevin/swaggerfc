"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DesignA() {
  return (
    <div className="bg-[#1a1f2e] text-white font-source">
      <ThemeToggle />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1a1f2e]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
              <span className="font-oswald font-bold text-[#1a1f2e] text-xl">SF</span>
            </div>
            <span className="font-oswald text-2xl font-bold tracking-wide">SWAGGER FC</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#news" className="text-white/80 hover:text-[#c9a227] transition-colors font-medium">News</a>
            <a href="#achievements" className="text-white/80 hover:text-[#c9a227] transition-colors font-medium">Achievements</a>
            <a href="#team" className="text-white/80 hover:text-[#c9a227] transition-colors font-medium">Team</a>
            <a href="#shop" className="bg-[#c9a227] text-[#1a1f2e] px-6 py-2 font-oswald font-semibold hover:bg-[#d4af37] transition-colors">SHOP</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560969961-bc5368188cb9?w=1920&q=80"
            alt="Stadium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e]/30 to-[#1a1f2e]/95"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <div className="w-24 h-24 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
            <span className="font-oswald font-bold text-[#1a1f2e] text-4xl">SF</span>
          </div>
          <h1 className="font-oswald text-6xl md:text-8xl font-bold tracking-tight mb-4">
            SWAGGER FC
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mb-8">
            Passion. Pride. Excellence. Since 2018.
          </p>
          <div className="flex gap-4">
            <a href="#news" className="bg-[#c9a227] text-[#1a1f2e] px-8 py-3 font-oswald font-semibold text-lg hover:bg-[#d4af37] transition-colors">
              LATEST NEWS
            </a>
            <a href="#shop" className="border-2 border-white/30 text-white px-8 py-3 font-oswald font-semibold text-lg hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
              SHOP NOW
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-[#0f1219]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[#c9a227] font-oswald text-sm tracking-widest uppercase">Latest Updates</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2">CLUB NEWS</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#c9a227] font-medium hover:underline">
              View All News
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured News Card */}
            <div className="lg:col-span-2 lg:row-span-2 group cursor-pointer">
              <div className="relative h-full min-h-[400px] overflow-hidden bg-[#2d3548]">
                <Image
                  src="https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=1200&q=80"
                  alt="Match Day"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="bg-[#c9a227] text-[#1a1f2e] px-3 py-1 text-sm font-oswald font-semibold">FEATURED</span>
                  <h3 className="font-oswald text-2xl md:text-3xl font-bold mt-4 group-hover:text-[#c9a227] transition-colors">
                    Historic Victory Against City Rivals in Championship Final
                  </h3>
                  <p className="text-white/60 mt-3 line-clamp-2">
                    A memorable night at the stadium as Swagger FC secured a 3-1 victory, clinching the league title for the first time in club history.
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-white/50">
                    <span>January 10, 2026</span>
                    <span>|</span>
                    <span>Match Report</span>
                  </div>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="group cursor-pointer">
              <div className="bg-[#2d3548] overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1629977007371-0ba395424741?w=600&q=80"
                    alt="Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#c9a227] text-sm font-oswald tracking-wide">TRAINING</span>
                  <h3 className="font-oswald text-xl font-bold mt-2 group-hover:text-[#c9a227] transition-colors">
                    Pre-Season Training Camp Announced for February
                  </h3>
                  <p className="text-white/50 text-sm mt-2">January 8, 2026</p>
                </div>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="group cursor-pointer">
              <div className="bg-[#2d3548] overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1757031299944-5028e556613d?w=600&q=80"
                    alt="Youth Academy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#c9a227] text-sm font-oswald tracking-wide">ACADEMY</span>
                  <h3 className="font-oswald text-xl font-bold mt-2 group-hover:text-[#c9a227] transition-colors">
                    Youth Academy Tryouts Open for New Season
                  </h3>
                  <p className="text-white/50 text-sm mt-2">January 5, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Carousel Section */}
      <section id="achievements" className="py-20 bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#c9a227] font-oswald text-sm tracking-widest uppercase">Our Glory</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2">ACHIEVEMENTS</h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Celebrating the moments that define our club&apos;s legacy
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              {/* Achievement cards - duplicated for infinite scroll */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6">
                  <AchievementCard
                    image="https://images.unsplash.com/photo-1560003991-545650ee5f07?w=800&q=80"
                    year="2025"
                    title="League Champions"
                    description="First league title in club history after an unbeaten season run."
                  />
                  <AchievementCard
                    image="https://images.unsplash.com/photo-1620567253244-6f340f675bca?w=800&q=80"
                    year="2024"
                    title="Cup Winners"
                    description="Dramatic penalty shootout victory in the regional cup final."
                  />
                  <AchievementCard
                    image="https://images.unsplash.com/photo-1718246425786-894821186deb?w=800&q=80"
                    year="2023"
                    title="New Stadium"
                    description="Inauguration of our new 15,000 capacity home ground."
                  />
                  <AchievementCard
                    image="https://images.unsplash.com/photo-1647101678383-9f179e1dd2c0?w=800&q=80"
                    year="2022"
                    title="Community Award"
                    description="Recognized for outstanding youth development program."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-[#0f1219]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#c9a227] font-oswald text-sm tracking-widest uppercase">Official Merchandise</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2">CLUB SHOP</h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Wear your colors with pride. Order via WhatsApp for easy delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ShopCard
              image="https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80"
              title="Home Jersey 2025/26"
              description="Official match-day jersey with club crest"
              price="3,500"
              isNew
              whatsappText="Hi! I want to order a Home Jersey 2025/26"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1759447946445-397b1c034768?w=600&q=80"
              title="Club Hoodie"
              description="Premium cotton blend with embroidered crest"
              price="2,800"
              whatsappText="Hi! I want to order a Club Hoodie"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=600&q=80"
              title="Club Polo Shirt"
              description="Classic polo with woven club badge"
              price="2,200"
              whatsappText="Hi! I want to order a Club Polo Shirt"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                  <span className="font-oswald font-bold text-[#1a1f2e] text-xl">SF</span>
                </div>
                <span className="font-oswald text-2xl font-bold">SWAGGER FC</span>
              </div>
              <p className="text-white/50 max-w-md">
                A community football club dedicated to developing talent and bringing people together through the beautiful game.
              </p>
            </div>
            <div>
              <h4 className="font-oswald font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/50">
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Fixtures</a></li>
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-[#c9a227] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-oswald font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <SocialIcon href="#">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </SocialIcon>
                <SocialIcon href="#">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </SocialIcon>
                <SocialIcon href="#">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </SocialIcon>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            <p>&copy; 2026 Swagger FC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to designs link */}
      <Link href="/" className="fixed bottom-6 left-6 bg-[#c9a227] text-[#1a1f2e] px-4 py-2 rounded-lg font-oswald font-semibold flex items-center gap-2 hover:bg-[#d4af37] transition-colors z-50">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Designs
      </Link>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-400px * 4 - 6rem)); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          width: calc(400px * 8 + 12rem);
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function AchievementCard({ image, year, title, description }: { image: string; year: string; title: string; description: string }) {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] group">
      <div className="relative h-[500px] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-[#1a1f2e]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[#c9a227] font-oswald text-sm">{year}</span>
          <h3 className="font-oswald text-2xl font-bold mt-1">{title}</h3>
          <p className="text-white/60 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ShopCard({ image, title, description, price, isNew, whatsappText }: { image: string; title: string; description: string; price: string; isNew?: boolean; whatsappText: string }) {
  return (
    <div className="group bg-[#2d3548] overflow-hidden">
      <div className="relative h-80 overflow-hidden bg-[#1a1f2e]">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {isNew && (
          <div className="absolute top-4 right-4 bg-[#c9a227] text-[#1a1f2e] px-3 py-1 font-oswald text-sm font-semibold">
            NEW
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-oswald text-xl font-bold">{title}</h3>
        <p className="text-white/50 mt-2">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-oswald text-2xl font-bold text-[#c9a227]">KES {price}</span>
          <a
            href={`https://wa.me/254700000000?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-4 py-2 font-medium flex items-center gap-2 hover:bg-[#22c55e] transition-colors"
          >
            <WhatsAppIcon />
            Order
          </a>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{children}</svg>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
