import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import logo from "@/assets/logo.png";
import { Linkedin, Facebook, Instagram, Youtube, Share2 } from "lucide-react";

type Infographic = {
  id: string;
  title: string;
  image_url: string;
};

const Infographic = () => {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [selectedImage, setSelectedImage] = useState<Infographic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfographics();
  }, []);

  const fetchInfographics = async () => {
    try {
      const { data, error } = await supabase
        .from("infographics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInfographics(data || []);
    } catch (error) {
      console.error("Error fetching infographics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Banner Section */}
      <section className="px-6 md:px-12 lg:px-24 py-8">
        <div className="bg-[#C62828] rounded-r-lg py-6 px-8 inline-flex items-center gap-6">
          <h1 className="text-white text-4xl font-bold lowercase">Infographic</h1>
          <Share2 className="text-white w-10 h-10" strokeWidth={2.5} />
        </div>
      </section>

      <main className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-4">
              {infographics.map((infographic, index) => {
                const position = index % 5;
                
                // Pattern: landscape (0), then 4 squares (1-4), then landscape (5), etc.
                if (position === 0) {
                  // Landscape image (full width)
                  return (
                    <div
                      key={infographic.id}
                      className="w-full group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedImage(infographic)}
                    >
                      <div className="overflow-hidden bg-gray-50">
                        <img
                          src={infographic.image_url}
                          alt={infographic.title}
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                } else if (position === 1) {
                  // Start of 2x2 grid - render grid container with this and next 3 items
                  const gridItems = infographics.slice(index, index + 4);
                  return (
                    <div key={`grid-${infographic.id}`} className="grid grid-cols-2 gap-4">
                      {gridItems.map((item) => (
                        <div
                          key={item.id}
                          className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                          onClick={() => setSelectedImage(item)}
                        >
                          <div className="overflow-hidden bg-gray-50">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                // Skip positions 2, 3, 4 as they're rendered in the grid above
                return null;
              })}
            </div>
          )}

          {!loading && infographics.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No infographics available yet.
            </div>
          )}
        </div>
      </main>

      <CTASection />

      <footer className="bg-white pt-12 pb-0 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
            <div className="space-y-4">
              <img src={logo} alt="Annual Reports" className="h-10" />
              <p className="text-sm text-gray-700 leading-relaxed">
                The Annual Reports, Bespoke data analysis and visual reports for Gulf area governments and corporations since 2010.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <a href="#" className="hover:text-[hsl(var(--accent))]">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-[hsl(var(--accent))]">Terms & Conditions</a>
              </div>
            </div>

            <div>
              <ul className="space-y-4 text-base">
                <li><a href="/" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Home</a></li>
                <li><a href="/reports" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Work</a></li>
                <li><a href="/statistics" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Statistics</a></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-900">+971856784543</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-900">info@annualreport.net</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-900">JLT, Dubai, 123 adress street</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-6">
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Facebook">
                  <Facebook className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Instagram">
                  <Instagram className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="YouTube">
                  <Youtube className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 py-6 text-center">
            <p className="text-sm text-gray-700">@theannualreports - all rights reserved 2025</p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-semibold text-gray-900">{selectedImage.title}</h2>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Infographic;
