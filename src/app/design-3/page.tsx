"use client";

import Image from "next/image";
import Link from "next/link";

export default function DesignC() {
  return (
    <div className="bg-[#faf8f5] text-[#2d2926] font-dm-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1d4d2c] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">SF</span>
            </div>
            <div>
              <span className="font-dm-serif text-xl">Swagger FC</span>
              <p className="text-xs text-[#6b6560]">Est. 2018</p>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#news" className="text-[#6b6560] hover:text-[#1d4d2c] transition-colors">News</a>
            <a href="#achievements" className="text-[#6b6560] hover:text-[#1d4d2c] transition-colors">Gallery</a>
            <a href="#about" className="text-[#6b6560] hover:text-[#1d4d2c] transition-colors">About</a>
            <a href="#shop" className="bg-[#1d4d2c] text-white px-6 py-2.5 rounded-full hover:bg-[#164023] transition-colors">Shop</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="order-2 lg:order-1">
              <span className="inline-block bg-[#1d4d2c]/10 text-[#1d4d2c] px-4 py-2 rounded-full text-sm font-medium mb-6">
                Welcome to our family
              </span>
              <h1 className="font-dm-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                More Than<br/>
                <span className="text-[#1d4d2c]">Just Football</span>
              </h1>
              <p className="text-[#6b6560] text-lg mb-8 max-w-md leading-relaxed">
                A community united by passion for the beautiful game. Where every supporter is family and every match day is a celebration.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#news" className="bg-[#1d4d2c] text-white px-8 py-4 rounded-full font-medium hover:bg-[#164023] transition-colors">
                  Read Our Story
                </a>
                <a href="#shop" className="border-2 border-[#2d2926]/20 text-[#2d2926] px-8 py-4 rounded-full font-medium hover:border-[#1d4d2c] hover:text-[#1d4d2c] transition-colors">
                  Visit Shop
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10">
                  <Image
                    src="https://images.unsplash.com/photo-1629977007371-0ba395424741?w=800&q=80"
                    alt="Football Action"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[250px]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#1d4d2c]/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#1d4d2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-dm-serif text-2xl text-[#1d4d2c]">5,000+</p>
                      <p className="text-sm text-[#6b6560]">Supporters</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6b6560]">Growing stronger every matchday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#1d4d2c] text-sm font-medium uppercase tracking-wider">What&apos;s Happening</span>
              <h2 className="font-dm-serif text-4xl md:text-5xl mt-2">Club News</h2>
            </div>
            <a href="#" className="text-[#1d4d2c] font-medium hover:underline mt-4 md:mt-0 flex items-center gap-2">
              All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Featured News */}
            <div className="md:col-span-2 md:row-span-2 group">
              <article className="h-full">
                <div className="relative h-[400px] md:h-full rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=1000&q=80"
                    alt="Championship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="bg-white text-[#1d4d2c] px-4 py-1.5 rounded-full text-sm font-medium">Match Day</span>
                    <h3 className="font-dm-serif text-2xl md:text-3xl text-white mt-4 group-hover:text-[#9ce2b0] transition-colors">
                      A Night to Remember: Championship Glory
                    </h3>
                    <p className="text-white/70 mt-3 line-clamp-2">
                      Our supporters made their voices heard as we lifted the trophy under the lights.
                    </p>
                    <p className="text-white/50 text-sm mt-4">January 10, 2026</p>
                  </div>
                </div>
              </article>
            </div>

            {/* News Card */}
            <article className="group">
              <div className="bg-[#f5f0e8] rounded-2xl overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1757031299944-5028e556613d?w=500&q=80"
                    alt="Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#1d4d2c] text-sm font-medium">Training</span>
                  <h4 className="font-dm-serif text-xl mt-2 group-hover:text-[#1d4d2c] transition-colors">
                    Youth Academy Open Day Success
                  </h4>
                  <p className="text-[#6b6560] text-sm mt-2 line-clamp-2">
                    Over 200 young players attended our talent identification program.
                  </p>
                  <p className="text-[#6b6560]/60 text-sm mt-4">January 8, 2026</p>
                </div>
              </div>
            </article>

            {/* News Card */}
            <article className="group">
              <div className="bg-[#f5f0e8] rounded-2xl overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1629977007398-a17feb6ddf14?w=500&q=80"
                    alt="Community"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#1d4d2c] text-sm font-medium">Community</span>
                  <h4 className="font-dm-serif text-xl mt-2 group-hover:text-[#1d4d2c] transition-colors">
                    Season Ticket Renewals Now Open
                  </h4>
                  <p className="text-[#6b6560] text-sm mt-2 line-clamp-2">
                    Secure your seat for another season of unforgettable moments.
                  </p>
                  <p className="text-[#6b6560]/60 text-sm mt-4">January 5, 2026</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Achievements Gallery */}
      <section id="achievements" className="py-20 bg-[#1d4d2c] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center text-white">
            <span className="text-[#9ce2b0] text-sm font-medium uppercase tracking-wider">Our Journey</span>
            <h2 className="font-dm-serif text-4xl md:text-5xl mt-2">Moments of Glory</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Every trophy tells a story of dedication, teamwork, and the unwavering support of our community.
            </p>
          </div>
        </div>

        {/* Auto-scrolling Gallery */}
        <div className="relative overflow-hidden">
          <div className="carousel-auto flex gap-4">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                <GalleryCard
                  image="https://images.unsplash.com/photo-1560003991-545650ee5f07?w=700&q=80"
                  year="2025"
                  title="League Champions"
                  description="Our first ever league title - a historic achievement"
                />
                <GalleryCard
                  image="https://images.unsplash.com/photo-1620567253244-6f340f675bca?w=700&q=80"
                  year="2024"
                  title="Cup Final Victory"
                  description="A thrilling win that brought the whole town together"
                />
                <GalleryCard
                  image="https://images.unsplash.com/photo-1718246425786-894821186deb?w=700&q=80"
                  year="2023"
                  title="Record Attendance"
                  description="15,000 fans packed into our new home stadium"
                />
                <GalleryCard
                  image="https://images.unsplash.com/photo-1647101678383-9f179e1dd2c0?w=700&q=80"
                  year="2022"
                  title="Youth Award"
                  description="Best youth development program in the region"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#1d4d2c] text-sm font-medium uppercase tracking-wider">Show Your Colors</span>
            <h2 className="font-dm-serif text-4xl md:text-5xl mt-2">Club Shop</h2>
            <p className="text-[#6b6560] mt-4 max-w-md mx-auto">
              Wear your support. Order easily through WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ShopCard
              image="https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80"
              title="Home Jersey 25/26"
              description="Official match jersey with breathable fabric"
              price="3,500"
              isNew
              whatsappText="Hi! I'd like to order the Home Jersey 25/26"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1759447946445-397b1c034768?w=600&q=80"
              title="Supporters Hoodie"
              description="Cozy hoodie with embroidered club crest"
              price="2,800"
              whatsappText="Hi! I'd like to order the Supporters Hoodie"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=600&q=80"
              title="Classic Polo Shirt"
              description="Smart casual polo with woven badge"
              price="2,200"
              whatsappText="Hi! I'd like to order the Classic Polo Shirt"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1d4d2c] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#1d4d2c] font-bold text-xl">SF</span>
                </div>
                <div>
                  <span className="font-dm-serif text-xl">Swagger FC</span>
                  <p className="text-white/50 text-sm">Est. 2018</p>
                </div>
              </div>
              <p className="text-white/60 max-w-sm">
                More than a club. We&apos;re a family united by our love for football and community.
              </p>
            </div>
            <div>
              <h4 className="font-dm-serif text-lg mb-4">Club</h4>
              <ul className="space-y-3 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fixtures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-dm-serif text-lg mb-4">Follow Us</h4>
              <div className="flex gap-3">
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
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
            <p>&copy; 2026 Swagger FC. Built with passion.</p>
          </div>
        </div>
      </footer>

      {/* Back to designs link */}
      <Link href="/" className="fixed bottom-6 left-6 bg-[#1d4d2c] text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#164023] transition-colors z-50">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Designs
      </Link>

      <style jsx>{`
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * 4 - 4rem)); }
        }
        .carousel-auto {
          animation: scrollRight 30s linear infinite;
          width: calc(380px * 8 + 7rem);
        }
        .carousel-auto:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function GalleryCard({ image, year, title, description }: { image: string; year: string; title: string; description: string }) {
  return (
    <div className="flex-shrink-0 w-[380px] group">
      <div className="relative h-[480px] rounded-2xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-[#9ce2b0] text-sm font-medium">{year}</span>
          <h3 className="text-white font-dm-serif text-xl mt-1">{title}</h3>
          <p className="text-white/60 text-sm mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ShopCard({ image, title, description, price, isNew, whatsappText }: { image: string; title: string; description: string; price: string; isNew?: boolean; whatsappText: string }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative h-80 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#1d4d2c] text-white px-3 py-1 rounded-full text-sm font-medium">New</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-dm-serif text-xl">{title}</h3>
        <p className="text-[#6b6560] text-sm mt-2">{description}</p>
        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-sm text-[#6b6560]">Price</span>
            <p className="font-dm-serif text-2xl text-[#1d4d2c]">KES {price}</p>
          </div>
          <a
            href={`https://wa.me/254700000000?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-5 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#1fbd5a] transition-colors"
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
    <a href={href} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
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
