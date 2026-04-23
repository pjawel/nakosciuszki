/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Facebook, MapPin, X, ChevronRight, Info, Users, Menu } from 'lucide-react';

const IMAGES = [
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/617942089_122158404176913798_5305752284160035483_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=3_hw14-5TqYQ7kNvwFw9odN&_nc_oc=AdqaFuRbx83dS0IQmw__tsMLcPBQ_Xec4BU4yr50G9s0pe-cMoViIWO1AJddDUWqdcI&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=NQ_IzejMQ9Uc-eb1CWlpnQ&_nc_ss=7b3a8&oh=00_Af1kAP5Fo_7I9A6jYFv6YSj3EvfGXE-heUYyyCncaMkkfQ&oe=69EEEDCA",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/618539223_122158403660913798_2062612256902205486_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=sqD6hdHnw8EQ7kNvwHG7VEN&_nc_oc=AdohbJ6UKF-_nP6ZKJ5KCRIrXK5CBH7MRTxYa1N6aBf6G4vUcm-Sdd4qjsisVkllKo4&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=Q7izV9fhwex_SWfeblrZLg&_nc_ss=7b2a8&oh=00_Af09DUSDEe_wgOvszLAm-OmybbooiW_-tXw9JtBiNyBjbQ&oe=69EF1489",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/622243181_122158403468913798_704406558169895705_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=bZZi1WgSs6IQ7kNvwHbtcUB&_nc_oc=AdrlbRIvOdobp3kWw5o-yMKQKCb8OL_zcr1ljLUMH09DrwGa1RIEqIuRUa9n9arolEU&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=RhEs3osWEXsVZP4xzc37Sw&_nc_ss=7a3a8&oh=00_Af1h-_L8m2o9RReAnG3cntkqoC2Bh2c_Ah24nwUyFx0x9A&oe=69EF10C9",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/619314932_122158403366913798_875823285238555178_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=N-GFfhVb8aYQ7kNvwGXTVZM&_nc_oc=Adqpf0f8CXDqROkipcjwWQf6YbV7yU-tP95FYGsL31FHVoAbVPyHjyjxU0UYyylCP24&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=ywlKNdjam9DFLj-UhVVkVA&_nc_ss=7b2a8&oh=00_Af0U1uKvTb06zJbCnzNydR2o4Zo5OsCL3yukyDmfSv-aPg&oe=69EF0B6F",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/594434558_122149429130913798_2996274228361189353_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=-ahILkmxjMQQ7kNvwF5gGhn&_nc_oc=Adqt_qVmx43di3nRib0IBQC_74BvHp61NYeXX8RYL32b9lU5aF0QM52B1aby9DU0Cjc&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=CORK27Q28OIvFkW-gIlj3w&_nc_ss=7a2a8&oh=00_Af15fGocj3-lP7DntI-xkOAVdGRRlNr7cXFpAeTcq6z0kA&oe=69EF0771",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/596489678_122149429142913798_3471364397698014423_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=V7Xsmz4oBYEQ7kNvwGZoZbQ&_nc_oc=AdoklPr2kbGX20TtK8qalZr8RV58ZWZ4r3EPO1LwrvSUeu21aEbXE1KmSNvr6GVlO9E&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=wfY3Ga3vxGDuVZl46mQLQQ&_nc_ss=7b2a8&oh=00_Af0yKr0UaWS7xgnnKQ2eLoxQmy6sNw66RHjPxdjwiU0Szg&oe=69EF042D",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/532298657_122123877338913798_3904894277331428085_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=aGzHYCPjI2YQ7kNvwERanYs&_nc_oc=Adq-QSvXcOX9bqZkqlbjSYTyibe2Yi8wHQhh9jOePqeNvxuV8i3IzFLs1FK-j4jUvhA&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=-lBAGCGQuKV_pvI4Fg627A&_nc_ss=7a2a8&oh=00_Af2n-IISwEYT97cy2IzoYf1WKb9oRpUygouIiRJoy-rD3A&oe=69EF1AE6",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/532247183_122123876876913798_1166168006466440025_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=hYivSJtIc04Q7kNvwGsbCvz&_nc_oc=AdqhomtjqazkmetCbZIIBKmSJLlAaQIB1zlC-c3Xy0M3od7tdNN0JF4ohF8BTsBCx88&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=0Aof8SbuIgEHJrEyutAkDA&_nc_ss=7a2a8&oh=00_Af2NpR_0FJkWmdt3QhSdzQjto8zubtmjTLNxii405eX4CA&oe=69EEF768",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/514350173_122106763844913798_796873879853283276_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_ohc=up4lHjZUYhYQ7kNvwF2Y4nC&_nc_oc=AdqJfZYidcdckaP71zvoJZOH8PEnvV4fzTju984ENJW60wgxEZdFWWRzf1nfIgnlGPs&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=UgIP1JO7SQGBjpVUKTk7GQ&_nc_ss=7a2a8&oh=00_Af1DqlriXkzgUM5K-pc0fo2tn4DoP2HXTUkeQW42gVG7jQ&oe=69EF1E26",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/513976388_122106759002913798_7554716221410850976_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=6vIJDYZzg3AQ7kNvwGIGam_&_nc_oc=AdoI9Sc5wUduhdPCerORWaUiNkbxwhcEDDHd173RyGIhUaN32WdCW1TAsoKLarftG38&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=EvhE_AlFwl0-bVZNQ6U60A&_nc_ss=7b2a8&oh=00_Af1bw8ZKq28QffkMJOeeJMzMuoxowQQrgFe4aCz0e5Eb0g&oe=69EEF0D6"
];

const FB_URL = "https://www.facebook.com/profile.php?id=61577413965523";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c2c2c] font-sans selection:bg-[#d4af37] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold tracking-tight text-[#1a1a1a]">
            Sala na <span className="text-[#a67c00] italic font-medium">Kościuszki</span>
          </h1>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-[0.2em]">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#d4af37] transition-colors cursor-pointer">Start</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#d4af37] transition-colors cursor-pointer">O nas</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-[#d4af37] transition-colors cursor-pointer">Galeria</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#a67c00] transition-colors cursor-pointer text-[#ffcc33] font-extrabold shadow-sm">Kontakt</button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#1877f2] text-white hover:scale-110 transition-transform shadow-lg hidden sm:block"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-[#1a1a1a] hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Otwórz menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <h1 className="text-2xl font-display font-bold tracking-tight text-[#1a1a1a]">
                Sala na <span className="text-[#a67c00] italic font-medium">Kościuszki</span>
              </h1>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#1a1a1a] hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Zamknij menu"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-8 items-center text-center">
              {['hero', 'about', 'gallery', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-2xl font-display font-semibold tracking-tight text-[#1a1a1a] hover:text-[#d4af37] transition-colors py-2 uppercase"
                >
                  {id === 'hero' ? 'Start' : id === 'about' ? 'O nas' : id === 'gallery' ? 'Galeria' : 'Kontakt'}
                </button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-6 items-center">
              <div className="flex gap-4">
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-[#1877f2] text-white shadow-xl"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <p className="text-sm text-gray-500 font-medium tracking-widest uppercase">
                Marki, ul. Kościuszki
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={IMAGES[0]} 
            alt="Sala Bankietowa" 
            className="w-full h-full object-cover brightness-50 contrast-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-white text-center md:text-left">
          <div className="overflow-hidden mb-6">
            <motion.h2 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-display font-bold tracking-tight leading-tight"
            >
              Twoje Wyjątkowe <br /> Wydarzenie w <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[#d4af37] italic font-medium inline-block"
              >Markach</motion.span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl leading-relaxed font-light tracking-wide"
          >
            Zapraszamy do wynajęcia profesjonalnej sali bankietowej na imprezy okolicznościowe. 
            Elegancja, przestrzeń i niezapomniane wspomnienia.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center"
          >
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-[#d4af37] text-white rounded-full font-semibold hover:bg-[#c19b2e] transition-all flex items-center justify-center gap-2 group shadow-xl uppercase text-xs tracking-widest relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
              />
              <span className="relative z-10">Wynajmij Teraz</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
            >
              <Phone size={18} className="text-[#d4af37]" />
              <div className="text-left">
                <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold">Infolinia</p>
                <p className="font-semibold tracking-wider italic">509 171 737</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
          <div className="absolute top-20 right-20 text-[20vw] font-display font-bold text-[#d4af37] rotate-12">NA KOŚCIUSZKI</div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-[#d4af37] font-bold uppercase tracking-[0.3em] mb-6 text-xs border-b border-[#d4af37]/30 pb-2 overflow-hidden"
              >
                <Info size={14} />
                <span>O nas</span>
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tight leading-tight text-[#1a1a1a]">
                Miejsce stworzone na <span className="italic font-medium">wielkie chwile</span>
              </h3>
              <div className="space-y-8 text-gray-600 leading-loose text-lg font-light tracking-wide">
                <motion.p
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                >
                  Sali bankietowa na Kościuszki w Markach to przestrzeń, w której każda uroczystość nabiera blasku. 
                  Specjalizujemy się w wynajmie sali na wesela, chrzciny, komunie, urodziny oraz spotkania firmowe.
                </motion.p>
                <motion.p
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                >
                  Nasza sala łączy w sobie nowoczesne udogodnienia z klasyczną elegancją. Zapewniamy pełne wsparcie 
                  w organizacji, dbając o każdy, nawet najmniejszy detal Twojego wydarzenia.
                </motion.p>
                <div className="grid grid-cols-2 gap-12 pt-8">
                  <motion.div 
                    whileInView={{ scale: [0.9, 1.1, 1] }} 
                    viewport={{ once: true }}
                    className="p-6 bg-gray-50 rounded-3xl"
                  >
                    <p className="text-5xl font-display font-bold text-[#d4af37] mb-2 italic">100%</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight">Gwarancja Satysfakcji</p>
                  </motion.div>
                  <motion.div 
                    whileInView={{ scale: [0.9, 1.1, 1] }} 
                    viewport={{ once: true }}
                    className="p-6 bg-gray-50 rounded-3xl"
                  >
                    <div className="flex items-center gap-2 text-5xl font-display font-bold text-[#1a1a1a] mb-2 italic">
                      <Users size={32} className="text-[#d4af37]" />
                      <span>Top</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight">Profesjonalna Obsługa</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-4 md:gap-6 mt-12 md:mt-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "backOut" }}
            >
              <motion.img 
                whileHover={{ scale: 1.05, rotate: 0 }}
                src={IMAGES[5]} 
                alt="Wnętrze" 
                className="w-full h-48 sm:h-64 md:h-[450px] object-cover rounded-[20px] md:rounded-[40px] shadow-xl mt-6 md:mt-12 rotate-[-2deg] transition-all duration-500" 
                referrerPolicy="no-referrer" 
              />
              <motion.img 
                whileHover={{ scale: 1.05, rotate: 0 }}
                src={IMAGES[9]} 
                alt="Wnętrze 2" 
                className="w-full h-48 sm:h-64 md:h-[450px] object-cover rounded-[20px] md:rounded-[40px] shadow-xl rotate-[2deg] transition-all duration-500" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 bg-[#f8f7f3] relative overflow-hidden">
         {/* Decorative circle */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -right-20 w-64 h-64 border border-[#d4af37]/20 rounded-full"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 italic text-[#1a1a1a]">Nasza Galeria</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              className="h-0.5 bg-[#d4af37] mx-auto opacity-30"
            />
          </motion.div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {IMAGES.map((src, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group cursor-zoom-in overflow-hidden rounded-[30px] shadow-lg border border-white/50"
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={src} 
                  alt={`Galeria ${idx + 1}`} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Elegancja w zasięgu ręki</h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light tracking-widest text-sm uppercase">Skontaktuj się z nami, aby zarezerwować termin</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-12 rounded-[40px] bg-white/[0.03] border border-white/5 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all text-center">
              <Phone size={32} className="mx-auto mb-8 text-[#d4af37]" />
              <h4 className="text-xl font-display italic mb-6">Konsultacje</h4>
              <div className="space-y-2">
                <a href="tel:509171737" className="block text-2xl font-semibold hover:text-[#d4af37] transition-colors tracking-tighter">509 171 737</a>
                <a href="tel:797863134" className="block text-2xl font-semibold hover:text-[#d4af37] transition-colors tracking-tighter">797 863 134</a>
              </div>
            </div>
            <div className="p-12 rounded-[40px] bg-white/[0.03] border border-white/5 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all text-center">
              <MapPin size={32} className="mx-auto mb-8 text-[#d4af37]" />
              <h4 className="text-xl font-display italic mb-6">Lokalizacja</h4>
              <p className="text-gray-400 leading-loose tracking-wide">ul. Kościuszki<br />05-270 Marki, Polska</p>
            </div>
            <div className="p-12 rounded-[40px] bg-white/[0.03] border border-white/5 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all text-center">
              <Facebook size={32} className="mx-auto mb-8 text-[#d4af37]" />
              <h4 className="text-xl font-display italic mb-6">Social Media</h4>
              <a 
                href={FB_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#1877f2] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-600/20"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1a1a1a] border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center text-gray-500 text-sm gap-6">
          <p>© 2026 Sala Bankietowa na Kościuszki. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>

      {/* Lightbox / Expanded Gallery */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1a1a1a]/95 flex flex-col items-center justify-center p-4 md:p-10 touch-none"
            onClick={() => {
              setSelectedImage(null);
              setIsZoomed(false);
            }}
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.7, y: 0 }}
                className="text-white text-[10px] uppercase tracking-[0.2em] font-bold bg-black/40 px-4 py-2 rounded-full border border-white/10"
              >
                {isZoomed ? 'Przeciągnij by oglądać • Kliknij by pomniejszyć' : 'Kliknij by przybliżyć'}
              </motion.p>
            </div>

            <button 
              className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-50"
              onClick={() => {
                setSelectedImage(null);
                setIsZoomed(false);
              }}
              aria-label="Zamknij"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <motion.img
                key={selectedImage}
                drag={isZoomed}
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.1}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: isZoomed ? 2.5 : 1, 
                  opacity: 1,
                  x: isZoomed ? undefined : 0,
                  y: isZoomed ? undefined : 0
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedImage}
                alt="Powiększone zdjęcie"
                className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-shadow duration-300 ${isZoomed ? 'cursor-zoom-out shadow-black/60' : 'cursor-zoom-in'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
